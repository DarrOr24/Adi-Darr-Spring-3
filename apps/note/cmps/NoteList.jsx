const { useState } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { ActionBtns } from "./ActionBtns.jsx"
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onEdit }) {

    const [ selectedNote, setSelectedNote ] = useState(null)
    const navigate = useNavigate()

    function onClickNote(note){
        
        navigate(`/note/edit/${note.id}`)
        
    }

    

 

    return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li  key={note.id }  onClick = {()=>onClickNote(note)} style={{backgroundColor: note.style.backgroundColor}}>
                <NotePreview note={note} />
                <ActionBtns note={note} onRemove={onRemove} />
               
            </li>)}
        </ul>

        
    </section>
}
