import {useState} from "react";
import {Chat} from "@/types/chat";
import {PiChatBold} from "react-icons/pi";

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

    return (
        <div className='flex-1 mt-2 flex flex-col'>
          <ul>
              {
                  chatList.map((chat)=>{
                      const selected = selectedChat?.id === chat.id

                      return (
                          <li onClick={()=>{
                              setSelectedChat(chat)
                          }} key={chat.id} className={`group flex items-center p-2 space-x-3 cursor-pointer rounded-md hover:bg-gray-800
                              ${selected ? "bg-gray-800" : "" }`}>
                              <div><PiChatBold></PiChatBold></div>
                              <div className='relative flex-1 whitespace-nowrap overflow-hidden'>
                                  {chat.title}
                                  <span className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${selected ? "" : "from-gray-800"}`}></span>
                              </div>
                          </li>
                      )
                  })
              }
          </ul>
        </div>
    )
}