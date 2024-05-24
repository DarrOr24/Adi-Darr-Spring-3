const { useState } = React
const { useNavigate } = ReactRouter

import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx"
import { NoteEdit2 } from "./NoteEdit2.jsx"
import { NotePin } from "./NotePin.jsx"

export function NotePreview({ note, onRemove, onEdit}){
    
    const { info, style } = note
    const { title, txt } = info
    const { backgroundColor } = style

    const navigate = useNavigate()
    const [ openNote, setOpenNote ] = useState(false)
    const [ updatedNote, setUpdatedNote ] = useState(note)
    

    function openEdit(){  
        setOpenNote(true)
        navigate(`/note/edit/${note.id}`) 
    }

    function closeNoteEdit(){ 
        setOpenNote(false)
        navigate('/note')
        
    }

   

   function setNoteColor(color){
        setUpdatedNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))

        noteService.save(updatedNote)
   }

   
    return  <section>

                {!openNote && 
                    <article onClick = {openEdit} className="note-preview" style={{backgroundColor: updatedNote.style.backgroundColor}} >
                        <h2>{title}</h2>
                        <p >{txt}</p>
                        <NotePin />
                        <ActionBtns note={note} onRemove={onRemove} onSetNoteColor={setNoteColor} />
                    </article>}

                {openNote && <NoteEdit2 noteToEdit = {updatedNote} onClose={closeNoteEdit} onEdit={onEdit} onSetColorNote={setNoteColor} />}
                
    </section>
    
    
}



