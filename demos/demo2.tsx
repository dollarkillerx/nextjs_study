type Props = {
    counter: number
}

export default function Main({counter}: Props) {
    return (
        <main>
            <div className='bg-blue-300 m-10 p-10'>
                hello world {counter}

                {counter == 0 ? <div>counter == 0</div> : <div>counter != 0</div>}
            </div>
        </main>
    )
}


// 可以这样但是不好阅读
// export default function Main({counter}: { counter: number }) {
//     return (
//         <main>
//             <div className='bg-blue-300 m-10 p-10'>
//                 hello world {counter}
//             </div>
//         </main>
//     )
// }

// export default function Main(props: Props) {
//     return (
//         <main>
//             <div className='bg-blue-300 m-10 p-10'>
//                 hello world {props.counter}
//             </div>
//         </main>
//     )
// }