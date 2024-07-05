'use client'

import Button from "@/components/common/Button";
import {LuPanelLeft} from "react-icons/lu";
import {useAppContext} from "@/components/AppContext";
import {ActionType} from "@/components/reducers/AppReducer";

export default function Menu() {
    const {state:{displayNavigation},dispatch} = useAppContext()

    return (
        <Button icon={LuPanelLeft}
                variant='outline'
                className={`${displayNavigation ? "hidden" : ""} fixed left-2 top-2`}
                onClick={()=>{
                    dispatch({type: ActionType.UPDATE, field: "displayNavigation", value: !displayNavigation})
                }}>
        </Button>
    )
}