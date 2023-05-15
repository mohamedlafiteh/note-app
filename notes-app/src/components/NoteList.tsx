import { useMemo, useState } from "react"
import {Form, Stack,Col,Row,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import ReactSelect from "react-select"
import { Note, Tag } from "../App"

type NoteListProps={
    availableTags:Tag[],
    notes:SimplifiedNote[]
}
type SimplifiedNote={
    tags:Tag[],
    title:string
    id:string
}
function NoteList({availableTags,notes}:NoteListProps) {
    const [selectedTags, setSelectedTags]=useState<Tag[]>([])
    const [title, setTitle]=useState("")

    const filteredNotes=useMemo(()=>{
         return notes.filter(note=>{
            return (title===""||note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())&&
             (selectedTags.length===0||selectedTags.every(tag=>note.tags.some(noteTag=>noteTag.id===tag.id))))
         })
    },[title,selectedTags,notes])
  return (
 <>
 <Row className="align-items-center mb-4">
    <Col><h1>Notes</h1></Col>
    <Col>
    <Stack gap={2} direction="horizontal">
    <Link to="/new">  
            <Button variant="primary" type="button">Create</Button>
            </Link>
            <Button variant="outline-secondary" type="button">Edit tags</Button>
    </Stack>
    </Col>
 </Row>
 <Form>
    <Row className="mb-4">
    <Col>
           <Form.Group controlId='title'>
             <Form.Label>Title</Form.Label>
             <Form.Control type="text" onChange={e=>setTitle(e.target.value)} value={title} required/>

           </Form.Group>
           </Col> 
           <Col>
           <Form.Group controlId='tags'>
             <Form.Label>Tags</Form.Label>
             <ReactSelect value={selectedTags.map(tag=>{
                return {label:tag.label,value:tag.id}
             })} 
             options={availableTags.map(tag=>{
                return {label:tag.label,value:tag.id}
             })}
             onChange={tags=>{
                setSelectedTags(tags.map(tag=>{
                    return  {label:tag.label,id:tag.value}
                }))
             }}
             isMulti/>

           </Form.Group>
           </Col>
    </Row>
 </Form>
 <Row xs={1} lg={3} xl={4} className="g-3">
{filteredNotes.map(note=>{
    return (
        <Col key={note.id}>
         <NoteCard id={note.id} title={note.title} tags={note.tags}/>
        </Col>
    )
})}
 </Row>
 </>
  )
}

const NoteCard=({id,title,tag}:SimplifiedNote)=>{
return <h1>test</h1>
}
export default NoteList