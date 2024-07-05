'use client'

import Menubar from "@/components/home/Navigation/Menubar";
import Toolbar from "@/components/home/Navigation/Toolbar";
import {useAppContext} from "@/components/AppContext";

export default function Navigation() {
    const {state: {displayNavigation}} = useAppContext()
    return (
        <nav className={`relative h-full w-[260px] bg-gray-900 text-gray-300 p-2 ${displayNavigation ? "" : "hidden"}`}>
            <Menubar></Menubar>
            <Toolbar></Toolbar>
        </nav>
    )
}