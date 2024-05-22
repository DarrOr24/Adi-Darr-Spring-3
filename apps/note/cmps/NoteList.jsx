import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove }) {

      return <section className="note-list">
        <ul>
            {notes.map(note => 
            <li key={note.id } style={{backgroundColor: note.style.backgroundColor}}>
                <NotePreview note={note} />
                <section className ="action-icons">
                    <div><img src="assets\img\check.svg" alt="" /></div>
                    <div><img src="assets\img\pin.svg" alt="" /></div>
                    <div><img src="assets\img\remind_me.svg" alt="" /></div>
                    <div><img src="assets\img\collaborator.svg" alt="" /></div>
                    <div><img src="assets\img\background_options.svg" alt="" /></div>
                    <div><img src="assets\img\add_image.svg" alt="" /></div>
                    <div><img src="assets\img\archive.svg" alt="" /></div>
                    <div><img src="assets\img\more.svg" alt="" /></div>
                    {/* <button onClick={() => onRemove(note.id)}>x</button> */}
                </section>
            </li>)}
        </ul>
    </section>
}
