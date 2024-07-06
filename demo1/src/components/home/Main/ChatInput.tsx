import Button from "@/components/common/Button";
import {MdRefresh} from "react-icons/md";
import {PiLightningFill} from "react-icons/pi";
import TextareaAutoSize from 'react-textarea-autosize';
import {FiSend} from "react-icons/fi";
import {useState} from "react";
import {nanoid} from 'nanoid'
import {Message, MessageRequestPayload} from "@/types/chat";
import {useAppContext} from "@/components/AppContext";
import {ActionType} from "@/components/reducers/AppReducer";

export default function ChatInput() {
    const [message, setMessage] = useState('')
    const {state:{messageList, currentModel}, dispatch} = useAppContext()
    const sendMessage = async() => {
        if (message.trim() === '') {
            return
        }

        const sendMessage: Message = {
            id: nanoid(),
            role: 'user',
            content: message.trim()
        }

        const sendMessageList = [...messageList, sendMessage]
        const requestPayload: MessageRequestPayload = {
            messages: sendMessageList,
            model: currentModel
        }

        // 更新当前消息到消息列表中
        dispatch({type: ActionType.ADD_MESSAGE, message: sendMessage})
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        })

        if (!response.ok) {
            console.log(response.statusText)
            return
        }

        if (!response.body) {
            console.log('response.body is null')
            return
        }

        const responseMessage: Message = {
            id: nanoid(),
            role: 'assistant',
            content: ''
        }
        dispatch({type: ActionType.ADD_MESSAGE, message: responseMessage})
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let content = ""
        while (!done) {
            const {value, done: doneReading} = await reader.read()
            done = doneReading
            if (value != undefined) {
                const chunkValue = decoder.decode(value)
                content += chunkValue
                dispatch({type: ActionType.UPDATE_MESSAGE, message: {...responseMessage, content: content}})
            }
        }

        setMessage('')
    }
    return (
        <div
            className='absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]'>
            <div className={`w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4`}>
                <Button icon={MdRefresh} variant='primary' className={`font-medium`}>重新生成</Button>
                <div className={`flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4`}>
                    <div className={`mx-3 mb-2.5`}><PiLightningFill/></div>
                    <TextareaAutoSize className={`flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none bottom-0 outline-none`} placeholder='请输入...' rows={1}
                        value={message} onChange={(e)=>{setMessage(e.target.value)}}
                    />
                    <Button icon={FiSend} className={`mx-3 !rounded-lg`} variant='primary' onClick={sendMessage}></Button>
                </div>
                <footer className={`text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6`}>
                    ©{new Date().getFullYear()}&nbsp; <a className={`font-medium px-[1px] border-b border-dotted border-black/60 hover:cursor-pointer hover:border-black/0 dark:border-gray-200 dark:hidden:border-gray-200`} href="https://github.com/dollarkillerx" target="_blank">由 Github Dollarkillerx 提供动力</a>
                </footer>
            </div>
        </div>
    )
}