
// 定义基础类型
import {Message} from "@/types/chat";

export type State = {
    displayNavigation: boolean
    themeMode: "dark" | "light"
    currentModel: string
    messageList: Message[]
}

export enum ActionType {
    UPDATE = "UPDATE",
    ADD_MESSAGE = "ADD_MESSAGE",
    UPDATE_MESSAGE = "UPDATE_MESSAGE"

}

// 定义更新操作
type UpdateAction = {
    type: ActionType.UPDATE
    field: string
    value: any
}

type MessageAction = {
    type: ActionType.ADD_MESSAGE | ActionType.UPDATE_MESSAGE
    message: Message
}

// 操作集合
export type Action = UpdateAction | MessageAction

// 默认的
export const initState: State = {
    displayNavigation: true,
    themeMode: "dark",
    currentModel: "Claude3.5 Sonnet",
    messageList: []
}

// 定义基础类型 end

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.UPDATE:
            return {
                ...state,
                [action.field]: action.value
            }
        case ActionType.ADD_MESSAGE:
            return {
                ...state,
                messageList: [...state.messageList, action.message]
            }
        case ActionType.UPDATE_MESSAGE:
            const messageList = state.messageList.map((message)=>{
                if (message.id === action.message.id) {
                    return action.message
                }
                return message
            })
            return { ...state, messageList }
        default:
            return state
    }
}
