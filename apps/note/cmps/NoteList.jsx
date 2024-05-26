import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemove, onEdit, onPinNote, onDuplicate }) {


    return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li  key={note.id }   >
                <NotePreview note={note} onRemove = {onRemove} onEdit={onEdit} onPinNote={onPinNote} onDuplicate={onDuplicate} />
                
            </li>)}
            
        </ul>

        
    </section>
}


