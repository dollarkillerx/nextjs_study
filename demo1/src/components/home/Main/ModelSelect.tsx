import {PiLightningFill, PiShootingStarFill} from "react-icons/pi";
import {useAppContext} from "@/components/AppContext";
import {ActionType} from "@/components/reducers/AppReducer";

export default function ModelSelect() {
    const models = [
        {
            id: "Claude3.5 Sonnet",
            name: "Claude3.5 Sonnet",
            icon: PiLightningFill
        },
        {
            id: "Claude3.5 Haiku",
            name: "Claude3.5 Haiku",
            icon: PiShootingStarFill
        }
    ]

    const {state: {currentModel}, dispatch} = useAppContext()

    return (
        <div className={'flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl'}>
            {
                models.map((item) => {
                    const selected = item.id === currentModel
                    return (
                        <button
                            key={item.id}
                            className={`${
                                selected ? "border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" :
                                    "border-transparent text-gray-500"
                            } group hover:text-gray-900 hover:dark:text-gray-100  flex justify-center items-center space-x-2 p-2.5 min-w-[148px] text-sm font-medium border rounded-lg`}
                            onClick={()=>{
                                dispatch({type: ActionType.UPDATE, field: "currentModel", value: item.id})
                            }}
                        >
                            <span className={`${
                                selected?"text-[#26cf8e]":""
                            } group-hover:text-[#26cf8e] transition-colors duration-500`}>
                                <item.icon/>
                            </span>
                            <span className={` transition-colors duration-500`}>{item.name}</span>
                        </button>
                    )
                })
            }
        </div>
    )
}