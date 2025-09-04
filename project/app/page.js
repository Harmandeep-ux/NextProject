'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const page = () => {
  
const [todo, settodo] = useState([])
const [title, settitle] = useState('')

useEffect(()=>{
  axios.get('/api/todos').then((res)=>{
    settodo(res.data)
  })
},[])

async function addTodo() {
const res =  await axios.post('/api/todos',{title})
settodo([...todo , res.data])
settitle("")
}
  return (
    <div>
      <h1>TODOS</h1>
      <input 
      placeholder='enter title'
      value={title}
      onChange={(e)=>settitle(e.target.value)}
      />
      <button onClick={addTodo}>Add </button>
    </div>
  )
}

export default page