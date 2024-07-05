'use client'

import Menubar from "@/components/home/Navigation/Menubar";
import Toolbar from "@/components/home/Navigation/Toolbar";
import {useAppContext} from "@/components/AppContext";
import ChatList from "@/components/home/Navigation/ChatList";

export default function Navigation() {
    const {state: {displayNavigation}} = useAppContext()
    return (
        <nav className={`flex flex-col relative h-full w-[260px] bg-gray-900 text-gray-300 p-2 ${displayNavigation ? "" : "hidden"}`}>
            <Menubar></Menubar>
            <ChatList></ChatList>
            <Toolbar></Toolbar>
        </nav>
    )
}