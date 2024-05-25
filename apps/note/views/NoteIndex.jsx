const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteSideMenu } from "../cmps/NoteSideMenu.jsx"
import { noteService } from "../services/note.service.js"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ filterBy, setFilterBy ] = useState({})
    

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
    }, [filterBy])

    function addNewNote(note){//Note already saved to service
        setNotes([...notes, note])
    }

    function addEditNote(noteToEdit){ //Note already saved to service
        noteService.save(noteToEdit)
        const idx =  notes.findIndex(note => note.id === noteToEdit.id)
        setNotes(notes.toSpliced(idx, 1, noteToEdit)) 
    }

    function removeNote(ev, noteId){
        ev.stopPropagation()
        console.log('oh yeah!!  triple callback!!')
        setIsLoading(true)
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
            .finally(() => setIsLoading(false))
        
    }

    function pinNote(noteToPin){
        console.log(noteToPin)
        
        
    }

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    const isNotes = notes.length > 0
    
    if (isLoading) return <div className="loader"></div>
    return <section className = "note-index main-layout">
        <header className="note-index-header">
            <img height="50" src="assets\img\keep-icon.png" alt="" />
            <h1>Keep</h1>
            <NoteFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </header>
        <main>
            <NoteSideMenu />
            <AddNote notes={notes} onAdd={addNewNote} />
            {isNotes && <NoteList notes={notes} onRemove={removeNote} onEdit={addEditNote} onPinNote={pinNote} />}
            {!isNotes && <h2>No notes!!  Done with the chores for today...</h2>} 
        </main>
        
    </section>
}
