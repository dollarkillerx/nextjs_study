import {Chat} from "@/types/chat";
import {PiChatBold, PiTrashBold} from "react-icons/pi";
import {AiOutlineEdit} from "react-icons/ai";
import {MdCabin, MdCheck, MdClose, MdDeleteOutline} from "react-icons/md";
import {useEffect, useState} from "react";

type Props = {
    item: Chat
    selected: boolean
    onSelected: (chat: Chat) => void
}

export default function ChatItem({item, selected, onSelected}: Props) {
    // 维护一个是否在编辑的状态
    const [editing,setEditing] = useState(false)
    // 维护一个删除状态
    const [deleting, setDeleting] = useState(false)
    // 监听selected 发生变换后  默认退出编辑模式
    useEffect(()=>{
        setEditing(false)
    },[selected])
    return (
        <li onClick={() => {
            onSelected(item)
        }} key={item.id} className={`relative group flex items-center p-2 space-x-3 cursor-pointer rounded-md hover:bg-gray-800
                                  ${selected ? "bg-gray-800 pr-[3.5em]" : ""}`}>
            <div>
                {
                    deleting? <PiTrashBold/> : <PiChatBold/>
                }
            </div>
            {
               editing ? (
                    <input autoFocus={true} className='flex-1 min-w-0 bg-transparent outline-none'
                           defaultValue={item.title}></input>
                ): (
                    <div className='relative flex-1 whitespace-nowrap overflow-hidden'>
                        {item.title}
                        <span
                            className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${selected ? "" : "from-gray-800"}`}></span>
                    </div>
                )
            }
            {
                selected && (
                    <div className='absolute right-1 flex'>
                        {
                            editing || deleting ? <>
                                <button className='p-1 hover:text-white' onClick={(e) => {
                                    setEditing(false)
                                    setDeleting(false)
                                    // 防止事件冒泡
                                    e.stopPropagation()
                                }}>
                                    <MdCheck></MdCheck>
                                </button>
                                <button className='p-1 hover:text-white' onClick={(e) => {
                                    setEditing(false)
                                    setDeleting(false)
                                    // 防止事件冒泡
                                    e.stopPropagation()
                                }}>
                                    <MdClose></MdClose>
                                </button>
                            </> : <>
                                <button className='p-1 hover:text-white' onClick={(e) => {
                                    setEditing(true)
                                    // 防止事件冒泡
                                    e.stopPropagation()
                                }}>
                                    <AiOutlineEdit></AiOutlineEdit>
                                </button>
                                <button className='p-1 hover:text-white' onClick={(e) => {
                                    setDeleting(true)
                                    // 防止事件冒泡
                                    e.stopPropagation()
                                }}>
                                    <MdDeleteOutline></MdDeleteOutline>
                                </button>
                            </>
                        }
                    </div>
                )
            }
        </li>
    )
}