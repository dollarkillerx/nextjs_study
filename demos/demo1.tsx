"use client"

import Navigation from "@/components/home/Navigation";
import Main from "@/components/home/Main";
import {useState} from "react";

export default function Home() {
    // 默认值, 更新函数
    // const [counter,setCounter] = useState(0)
    const [counter,setCounter] = useState({value: 0})
    let list: { id: number; name: string }[] = [];
    for (let i = 0; i < 10; i++) {
        list.push({
            id: i,
            name: `name${i}`,
        });
    }

    const onClick1 = () => {
        counter.value ++
        // setCounter(counter)

        // 如果 useState为一个对象 必须传入新的对象才会更新页面
        setCounter(prevCounter => ({ value: prevCounter.value + 1 }));
        // setCounter((c)=>c+1) // c 为当前状态的counter
        console.log(counter) // counter 不会被修改,只有页面再次更新时才会修改
    }

    return (
        <div className='bg-amber-50'>
            {/*<button onClick={() =>  setCounter(counter + 1)}>this is button 1 </button>*/}
            <button onClick={onClick1}>this is button 2</button>

            <Navigation></Navigation>
            <Main counter={counter.value}></Main>
            <div>counter: {counter.value}</div>

            <ul>
                {
                    list.map((item) => {
                        return <li key={item.id}>{item.name}</li>
                    })
                }
            </ul>
        </div>
    );
}
