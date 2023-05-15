import "bootstrap/dist/css/bootstrap.min.css"
import {Routes,Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import './App.css'
import NewNote from "./components/NewNote"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from 'uuid';
import NoteList from "./components/NoteList"


export type Note={
  id:string
}&NoteData

export type NoteData={
  title:string,
  markdown:string,
  tags:Tag[]
}
export type RawNote={
  id:string,
}&RowNoteData

export type RowNoteData={
  title:string,
  markdown:string,
  tagIds:string[]
}
export type Tag={
  id:string,
  label:string
}
function App() {
 const [notes,setNotes]=useLocalStorage<RawNote[]>("NOTES",[])
 const [tags,setTags]=useLocalStorage<Tag[]>("TAGS",[])


 
 const notesWithTags=useMemo(()=>{
  return notes.map(note=>{
    return {...note,tags:tags.filter(tag=>note.tagIds.includes(tag.id))}
  })
 },[notes,tags])

 const onCreateNote=({tags,...data}:NoteData)=>{
  setNotes((prevNotes)=>{
return [...prevNotes,{...data,id:uuidV4(),tagIds:tags.map((tag)=>tag.id)}]
  })
 }

 const addTag=(tag:Tag)=>{
setTags(prev=>[...prev,tag])
 }

  return (
 <Container className="my-4">
    <Routes>
    <Route path="/" element={<NoteList availableTags={tags}/>}/>
    <Route path="/new" element={<NewNote onSubmit={onCreateNote}
    availableTags={tags} onAddTag={addTag} /> }/>
    <Route path="/:id">
    <Route index element={<h1>show</h1>}/>
    <Route path="edit" element={<h1>edit</h1>}/>
    </Route>
    <Route path="*" element={<h1>Hi</h1>}/>
    </Routes>
    </Container>
  )
}

export default App
