import React from 'react'

function index() {
    const arr = ['hari', 'ram', 'geeta', 'ram','shiv','ram','geeta']
  const colorArr = ['red','green','blue']
    const generateColor = (name)=>{
            const isRepeated = arr.indexOf(name) !== arr.lastIndexOf(name);
            if (isRepeated) {
            return "red";
            }
   }
    return (
        <div>
            {arr.map(item=>{
                return <li style={{color:generateColor(item)}}>{item}</li>
            })}
        </div>
    )
}

export default index
