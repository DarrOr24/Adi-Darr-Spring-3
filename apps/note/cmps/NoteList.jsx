import { ActionBtns } from "./ActionBtns.jsx"
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove }) {

      return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li key={note.id } style={{backgroundColor: note.style.backgroundColor}}>
                <NotePreview note={note} />
                <ActionBtns note={note} />
                
            </li>)}
        </ul>
    </section>
}
