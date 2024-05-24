const { useState } = React
const { useNavigate } = ReactRouter

import { ActionBtns } from "./ActionBtns.jsx"
import { NoteEdit2 } from "./NoteEdit2.jsx"
import { NotePin } from "./NotePin.jsx"

export function NotePreview({ note, onRemove, onEdit}){
    const { info, style } = note
    const { title, txt } = info
    const { backgroundColor } = style

    const navigate = useNavigate()
    const [ openNote, setOpenNote ] = useState(false)
    

    function openEdit(){  
        setOpenNote(true)
        navigate(`/note/edit/${note.id}`) 
    }

    function closeNoteEdit(){ 
        setOpenNote(false)
        navigate('/note')
        
    }

    

    return  <section>

                {!openNote && 
                    <article onClick = {openEdit} className="note-preview" style={{backgroundColor: note.style.backgroundColor}} >
                        <h2>{title}</h2>
                        <p >{txt}</p>
                        <NotePin />
                        <ActionBtns note={note} onRemove={onRemove} />
                    </article>}

                {openNote && <NoteEdit2 noteToEdit = {note} onClose={closeNoteEdit} onEdit={onEdit}/>}
                
    </section>
    
    
}



