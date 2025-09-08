'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [notes, setnotes] = useState([])
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')

  useEffect(()=>{
    getNotes()
  },[])
 
  const getNotes = async () => {
     const res =  await axios.get('/api/notes')
     setnotes(res.data)
       
  }

  const updateNotes = async (id) =>{
    const res = await axios.post(`/api/notes/${id}`,{title,content})
    setnotes(notes.map((t)=>t.id === id ? res.data : t))
  }

  const deleteNotes = async (id) =>{
    const res = await axios.delete(`/api/notes/${id}`)
    setnotes(notes.filter((t)=>t.id !== res.data.id))
  }

  const sendNotes = async () => {
     const res = await axios.post('/api/notes/',{title,content})
     setnotes([...notes, res.data])
     settitle('')
     setcontent('')
  }

  return (
    <>
    <h1> Notes</h1>
    <form onSubmit={(e) =>{
    e.preventDefault()
    sendNotes()
  }}>
      <input 
      placeholder='enter your title'
      value={title}
      onChange={(e) => settitle(e.target.value)}
      />
      <br />
     
      <br />
     <input 
     value={content}
     placeholder='enter content'
     onChange={(e) =>setcontent(e.target.value)}
     />

     <button type='submit'>send Note</button>
    </form>

    <div>
      <button onClick={getNotes}>check you Notes</button>
       <br/>
      {notes.length == 0 ? "no notes found Yet ": (
         notes.map((note,index)=>(
        <div key={note.id}>
          your Notes:
          <br/>
          title:{note.title}
          content:{note.content}
              <p><i>Created At:</i> {new Date(note.createdAt).toLocaleString()}</p>

            <br/>
            <button onClick={()=>deleteNotes(note.id)}>Delete Note</button>
            <button onClick={()=>updateNotes(note.id)}>update Note</button>
        </div>
      ))
      )}
    </div>
    </>
  )
}

export default page