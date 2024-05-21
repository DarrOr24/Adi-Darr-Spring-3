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
        <header>
            <h1>Keep</h1>
            <NoteFilter />
        </header>
        <NoteList notes={notes} onRemove={removeNote} />
    </section>
}
