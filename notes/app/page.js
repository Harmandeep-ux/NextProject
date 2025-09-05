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

        </div>
      ))
      )}
    </div>
    </>
  )
}

export default page