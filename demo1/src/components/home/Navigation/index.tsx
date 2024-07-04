'use client'

import Menubar from "@/components/home/Navigation/Menubar";
import {useAppContext} from "@/components/AppContext";

export default function Navigation() {
    const {state: {displayNavigation}} = useAppContext()
    return (
        <nav className={`h-full w-[260px] bg-gray-900 text-gray-300 p-2 ${displayNavigation ? "" : "hidden"}`}>
            <Menubar></Menubar>
        </nav>
    )
}