export interface Chat {
    id: string
    title: string
    updateTime: number
}

export interface Message {
    id: string
    role: "user" | "assistant" // user or server message
    content: string // message
}

export interface MessageRequestPayload {
    messages: Message[]
    model: string
}

export interface ChatApiPayload {
    role: string
    content: ChatApiPayloadItem[]
}

export interface ChatApiPayloadItem {
    type: string
    text: string
    source?: Source
}

export interface Source {
    type: string
    media_type: string
    data: string
}

// {
//     "type": "image",
//     "source": {
//     "type": "base64",
//         "media_type": "image/jpeg",
//         "data": "<base64_encoded_image>"
// }
// }