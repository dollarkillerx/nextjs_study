"use client"

import {Dispatch, SetStateAction, createContext, useContext, useMemo, useState, useReducer} from "react";
import {Action, initState, reducer, State} from "@/components/reducers/AppReducer";


type AppContextProps = {
    state: State
    dispatch: Dispatch<Action>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
    return useContext(AppContext)
}

export default function AppContextProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initState)

    const contextValue = useMemo(()=>{
        return {state, dispatch}
    },[state, dispatch])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}