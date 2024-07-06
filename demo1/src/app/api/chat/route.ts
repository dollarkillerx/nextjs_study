import {sleep} from "@/common/util";
import {NextRequest} from "next/server";
import { nanoid } from 'nanoid'
import {MessageRequestPayload} from "@/types/chat";

client = anthropic.Anthropic(
api_key="my_api_key"
)

export async function POST(request: NextRequest) {
    const {messages} = (await request.json()) as MessageRequestPayload

    const messageID = nanoid()

    // 编码为数据流
    const encoder = new TextEncoder()

    // 创建数据流
    const stream = new ReadableStream({
        async start(controller) {
            const msg = messages[messages.length-1]
            for (let i = 0; i < msg.content.length; i++) {
                await sleep(100)
                controller.enqueue(encoder.encode(msg.content[i]))
            }
            controller.close()
        }
    })

    return new Response(stream)
}