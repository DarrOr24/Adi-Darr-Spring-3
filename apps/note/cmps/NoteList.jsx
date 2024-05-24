const { useState } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { NoteEdit2 } from "./NoteEdit2.jsx"
import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemove, onEdit }) {

    const [ selectedNote, setSelectedNote ] = useState(null)
    const navigate = useNavigate()

    function onClickNote(note){
        setSelectedNote(note)
        navigate(`/note/edit/${note.id}`) 
    }

    function closeNoteEdit(){ 
        setSelectedNote(null)
        
    }


    let isSelected = (selectedNote !== null)
    return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li  key={note.id }  onClick = {()=>onClickNote(note)} style={{backgroundColor: note.style.backgroundColor}}>
                <NotePreview note={note} onRemove = {onRemove} />
                
            </li>)}
            {isSelected && <NoteEdit2 noteToEdit = {selectedNote} onClose={closeNoteEdit} onEdit={onEdit}/>} 
        </ul>

        
    </section>
}


