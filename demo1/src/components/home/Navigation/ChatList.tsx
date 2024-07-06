import {useMemo, useState} from "react";
import {Chat} from "@/types/chat";
import {groupByDate} from "@/common/util";
import ChatItem from "@/components/home/Navigation/ChatItem";

export default function ChatList(){
    const [chatList,setChantList] = useState<Chat[]>([
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "3",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "4",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "5",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "6",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "7",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "8",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "9",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "10",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "11",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "12",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "13",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "14",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
    ])

    const [selectedChat,setSelectedChat] = useState<Chat>()

    // 计算分组 使用 useMemo 当分组数据有变动时才改变分组列表
    const groupList = useMemo(()=>{
        return groupByDate(chatList)
    },[chatList])
    return (
        <div className='flex-1 mt-2 flex flex-col overflow-y-auto mb-[48px]'>
            {
                groupList.map(([data,list])=>{
                    return (
                        <div key={data}>
                            <div className='sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500'>
                                {data}
                            </div>
                            <ul>
                                {
                                    list.map((chat)=>{
                                        const selected = selectedChat?.id === chat.id
                                        return (
                                            <ChatItem key={chat.id} item={chat} selected={selected} onSelected={(chat)=>{
                                                setSelectedChat(chat)
                                            }}/>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }

        </div>
    )
}