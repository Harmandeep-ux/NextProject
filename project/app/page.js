'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const page = () => {
  
const [todo, settodo] = useState([])
const [title, settitle] = useState('')

useEffect(()=>{
  getTodo()
},[])

async function getTodo() {
  try{
   const res = await axios.get('/api/todos')
   settodo(res.data)
  }catch(err){
    console.error('error while getting todo')
  }
}

async function addTodo() {
const res =  await axios.post('/api/todos',{title})
settodo([...todo , res.data])
settitle("")
console.log(todo)
}

async function deleteTodo(id) {
  await axios.delete(`/api/todos/${id}`)
 settodo(todo.filter((t)=>t.id != id ))
 alert("todo delted")
}

async function updateTodo(id){
  const res = await axios.put(`/api/todos/${id}`,{title})
  settodo(todo.map((t)=>t.id == id ? res.data : t))
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
 
     <div>
      <h2>SHOW ALL TODOS</h2>
     {todo.length == 0 ? "no todos here" : (
      <ul>{todo.map((t)=>(
        <div key={t.id}>
          {t.title}
          <button onClick={()=>deleteTodo(t.id)}>delete</button>
          <button onClick={()=>updateTodo(t.id)}>update</button>
          </div>
       
      ))}</ul>
     )}
     </div>
    </div>
  )
}

export default page