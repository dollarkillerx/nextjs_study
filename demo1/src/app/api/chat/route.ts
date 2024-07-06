import {sleep} from "@/common/util";
import {NextRequest} from "next/server";
import { nanoid } from 'nanoid'
import {ChatApiPayload, MessageRequestPayload} from "@/types/chat";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: "", // defaults to process.env["ANTHROPIC_API_KEY"]
});

export async function POST(request: NextRequest) {
    const {messages} = (await request.json()) as MessageRequestPayload

    const messageID = nanoid()

    let chats: ChatApiPayload[] = []
    messages.forEach((item)=>{
        chats.push({
            role: item.role,
            content: [
                {
                    type: "text",
                    text: item.content
                }
            ]
        })
    })

    const stream = await anthropic.messages.create({
        max_tokens: 1024,
        // @ts-ignore
        messages: chats,
        model: 'claude-3-opus-20240229',
        stream: true,
    });

    // 编码为数据流
    const encoder = new TextEncoder()

    // 创建数据流
    const streamResp = new ReadableStream({
        async start(controller) {
            for await (const messageStreamEvent of stream) {
                switch (messageStreamEvent.type) {
                    case 'message_start':
                        console.log('Message started');
                        break;
                    case 'content_block_start':
                        console.log('Content block started');
                        break;
                    case 'content_block_delta':
                        // @ts-ignore
                        if (messageStreamEvent.delta && messageStreamEvent.delta.text) {
                            // @ts-ignore
                            controller.enqueue(encoder.encode(messageStreamEvent.delta.text))
                        }
                        break;
                    case 'content_block_stop':
                        console.log('Content block finished');
                        break;
                    case 'message_delta':
                        // @ts-ignore
                        if (messageStreamEvent.delta && messageStreamEvent.delta.text) {
                            // @ts-ignore
                            controller.enqueue(encoder.encode(messageStreamEvent.delta.text))
                        }
                        break;
                    case 'message_stop':
                        console.log('Message completed');
                        break;
                    default:
                        break;
                }
            }
            controller.close()
        }
    })

    return new Response(streamResp)
}