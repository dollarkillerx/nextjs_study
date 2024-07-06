
// 定义基础类型
export type State = {
    displayNavigation: boolean
    themeMode: "dark" | "light"
    currentModel: string
}

export enum ActionType {
    UPDATE = "UPDATE"
}

// 定义更新操作
type UpdateAction = {
    type: ActionType.UPDATE
    field: string
    value: any
}

// 操作集合
export type Action = UpdateAction

// 默认的
export const initState: State = {
    displayNavigation: true,
    themeMode: "dark",
    currentModel: "Claude3.5 Sonnet"
}

// 定义基础类型 end

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.UPDATE:
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state
    }
}
