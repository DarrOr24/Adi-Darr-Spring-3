import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove }) {

      return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li key={note.id } style={{backgroundColor: note.style.backgroundColor}}>
                <NotePreview note={note} />
                <section className ="action-icons">
                    <button onClick={() => onRemove(note.id)}>x</button>
                </section>
            </li>)}
        </ul>
    </section>
}
