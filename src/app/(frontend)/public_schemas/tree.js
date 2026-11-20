

let Subtree = ({input, output})=>{

    let input = useStore(input)
    return <>
            <p>{input}</p>
            <button onClick={()=>{output.set}}>Click</button>
            </>
}