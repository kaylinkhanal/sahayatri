import React from 'react'
import {addTodo} from "../"
import {useSelector, useDispatch} from 'react-redux'
function index() {
    const [input, setInput] = useState('')
    const {tasks} = useSelector(state=>state.todo)
    const dispatch = useDispatch()
    return (
        <div>
            <input onChange={(e)=>setInput(e.target.value)} placeholder="enter you tasks"/>
            <button onClick={()=> dispatch(addTodo(input))}>add todo</button> 
            {tasks.map(((item,id)=>{
                return <li onClick={dispatch(delete(id))}>{item}</li>
            }))}
        </div>
    )
}

export default index
