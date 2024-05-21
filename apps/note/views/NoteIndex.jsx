const { useState, useEffect } = React

import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    

    useEffect(() => {
        noteService.query()
            .then(notes => setNotes(notes))
    }, [])

    function removeNote(noteId){
        console.log(noteId)
    }


    
    
    return <section className = "note-index main-layout">
        <header className="note-index-header">
            <img src="\assets\img\hamburger.svg" alt="" />
            <h1>Keep</h1>
            <NoteFilter />
        </header>
        <main>
            <section className="side-menu">Side Menu</section>
            <section className="add-note">New Note</section>
            <NoteList notes={notes} onRemove={removeNote} />
        </main>
        
    </section>
}
