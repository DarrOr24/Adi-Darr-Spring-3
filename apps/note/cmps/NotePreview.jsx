const { useState } = React
const { useNavigate } = ReactRouter

import { utilService } from "../../../services/util.service.js";
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
        // console.log(color)
        setUpdatedNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))
        //Need to spread when saving because setting the updated note take long
        noteService.save({...updatedNote, style: { ...updatedNote.style, backgroundColor: color }})
        .then((item) => {
            // console.log(item.style.backgroundColor)
            onEdit(item)
        })
           
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



