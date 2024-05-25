const { useState } = React
const { useNavigate } = ReactRouter

import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx"
import { NoteEdit2 } from "./NoteEdit2.jsx"
import { NoteImg } from "./NoteImg.js";
import { NotePin } from "./NotePin.jsx"
import { NoteTxt } from "./NoteTxt.jsx";

export function NotePreview({ note, onRemove, onEdit}){
    
    

    const navigate = useNavigate()
    const [ openNote, setOpenNote ] = useState(false)
    const [ updatedNote, setUpdatedNote ] = useState(note)
   


    const { info, style } = updatedNote
    const { title, txt } = info
    const { backgroundColor } = style

    const isNoteTxt = (note.type === 'NoteTxt')
    const isNoteImg = (note.type === 'NoteImg')

    function openEdit(){  
        setOpenNote(true)
        navigate(`/note/edit/${note.id}`) 
    }

    function closeNoteEdit(){ 
        setOpenNote(false)
        navigate('/note')
    }

    function editPreview(noteFromEditing){
        setUpdatedNote(noteFromEditing)
        onEdit(noteFromEditing)

    }


   function setNoteColor(color){
        setUpdatedNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))

        onEdit({...updatedNote, style: {...updatedNote.style, backgroundColor:color}}) 
   }

   
    return  <section>
                {!openNote && 
                    <article onClick = {openEdit} className="note-preview" style={{backgroundColor: backgroundColor}} >
                        {isNoteTxt && <NoteTxt note={note} /> } 
                        {isNoteImg && <NoteImg note={note}/> }
                        <NotePin />
                        <ActionBtns note={note} onRemove={onRemove} onSetNoteColor={setNoteColor} />
                    </article>}

                {openNote && <NoteEdit2 noteToEdit = {updatedNote} onClose={closeNoteEdit} onEdit={editPreview} onSetColorNote={setNoteColor} />}
                
    </section>
    
    
}



