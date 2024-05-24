import { ActionBtns } from "./ActionBtns.jsx"
import { NotePin } from "./NotePin.jsx"

const { useState } = React

export function NotePreview({ note, onRemove}){
    const { info, style } = note
    const { title, txt } = info
    const { backgroundColor } = style


    const [ openNote, setOpenNote ] = useState('')

    function openEdit(){
        setOpenNote('open')
    }
    
    return (
        <article onClick = {openEdit} className={`note-preview ${openNote}`} >
            <h2>{title}</h2>
            <p >{txt}</p>
            <NotePin />
            <ActionBtns note={note} onRemove={onRemove} />
            
        </article>
    ) 
}



