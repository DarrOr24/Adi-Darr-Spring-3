const { useState } = React
const { useNavigate } = ReactRouter

import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx"
import { NoteEdit2 } from "./NoteEdit2.jsx"
import { NoteImg } from "./NoteImg.jsx";
import { NotePin } from "./NotePin.jsx"
import { NoteTxt } from "./NoteTxt.jsx";

export function NotePreview({ note, onRemove, onEdit, onPinNote, onDuplicate}){
    
    const navigate = useNavigate()
    const [ openNote, setOpenNote ] = useState(false)
    const [ updatedNote, setUpdatedNote ] = useState(note)
   
    const {  style } = updatedNote
    const { backgroundColor } = style

    function openEdit(){ 
        
        setOpenNote(true)
        navigate(`/note/edit/${note.id}`) 
    }

    function closeNoteEdit(){ 
        setOpenNote(false)
        navigate('/note')
    }

    function editPreview(noteFromEditing){ 
        console.log('note from editing:', noteFromEditing.isPinned)
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

   function pinNote(noteFromPin){
        console.log('note from preview', noteFromPin.isPinned)
        setUpdatedNote(noteFromPin)
        onPinNote(noteFromPin)
   }

   
    return  <section>
                {!openNote && 
                    <article onClick = {openEdit} className="note-preview" style={{backgroundColor: backgroundColor}} >
                        
                        <DynamicCmp note={note} />
                        <NotePin note={note} onPinNote ={pinNote}/>
                        <ActionBtns note={note} onRemove={onRemove} onSetNoteColor={setNoteColor} onDuplicate={onDuplicate} />
                    </article>}

                {openNote && <NoteEdit2 noteToEdit = {updatedNote} onClose={closeNoteEdit} onEdit={editPreview} onSetColorNote={setNoteColor} onPinNote={onPinNote} />}
                
    </section>
    
}

function DynamicCmp({note}){
    
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt note={note} />
        case 'NoteImg':
            return <NoteImg note={note}/>
    }
}



