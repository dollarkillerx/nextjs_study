'use client'

import Button from "@/components/common/Button";
import {HiPlus} from "react-icons/hi";
import {useAppContext} from "@/components/AppContext";
import {MdLightMode,MdDarkMode,MdInfo} from "react-icons/md";

export default function ToolBar() {
    const {state,setState} = useAppContext()

    return (
        <div className='absolute bottom-0 left-0 right-0 bg-gray-800
         flex p-2 justify-between'>
            <Button icon={state.themeMode === 'dark' ? MdLightMode: MdDarkMode}
                    variant='text' onClick={()=>{
                        setState((state)=>({...state,themeMode: state.themeMode === 'dark' ? 'light' : 'dark'}))
            }}></Button>
            <Button icon={MdInfo}
                    variant='outline'>
            </Button>
        </div>
    )
}