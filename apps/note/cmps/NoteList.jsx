const { useState } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { ActionBtns } from "./ActionBtns.jsx"

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove }) {

    const [ selectedNote, setSelectedNote ] = useState(null)
    const navigate = useNavigate()

    function onClickNote(note){
        navigate(`/note/details/${note.id}`)
        
    }

 

    return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li  key={note.id }  onClick = {()=>onClickNote(note)} style={{backgroundColor: note.style.backgroundColor}}>
                <NotePreview note={note} />
                <ActionBtns note={note} />
               
            </li>)}
        </ul>

        
    </section>
}
