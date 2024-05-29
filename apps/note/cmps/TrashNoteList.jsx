import { TrashNotePreview } from "./TrashNotePreview.jsx";

export function TrashNoteList ({trashNotes}){
   
    
    return <section className="note-list trash-note-list">
    
        {(trashNotes.length >0)&&<h2>TRASH</h2>}
        {(trashNotes.length === 0)&&<h2>TRASH IS EMPTY</h2>}
        <ul> 
            {trashNotes.map(note => 
            <li  key={note.id }   >
                    <TrashNotePreview note ={note} />
            </li>)}
        </ul>
    </section>
}
