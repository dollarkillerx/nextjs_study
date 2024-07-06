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