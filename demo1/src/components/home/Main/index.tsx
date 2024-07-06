import Menu from "@/components/home/Main/Menu";
import Welcome from "@/components/home/Main/Welcome";
import ChatInput from "@/components/home/Main/ChatInput";
import MessageList from "@/components/home/Main/MessageList";

export default function Index() {
    return (
        <div className={`flex-1 relative`}>
            <main
                className='overflow-y-auto w-full h-full flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'>
                <Menu></Menu>
                {/*<Welcome></Welcome>*/}
                <MessageList></MessageList>
                <ChatInput></ChatInput>
            </main>
        </div>
    )
}

