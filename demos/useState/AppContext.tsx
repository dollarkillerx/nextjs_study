"use client"

import {Dispatch, SetStateAction,createContext, useContext, useMemo, useState} from "react";

type State = {
    displayNavigation: boolean
    themeMode: "dark" | "light"
}

type AppContextProps = {
    state: State
    setState: Dispatch<SetStateAction<State>>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
    return useContext(AppContext)
}

export default function AppContextProvider({children}: { children: React.ReactNode }) {
    const [state, setState] = useState<State>({themeMode: 'dark', displayNavigation: true})

    const contextValue = useMemo(()=>{
        return {state, setState}
    },[state, setState])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}