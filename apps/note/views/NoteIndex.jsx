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
        if (!note.isPinned) setNotes([...notes, note])
        else setNotes([note, ...notes])
    }

    function addEditNote(noteToEdit){ //Note already saved to service
        console.log(noteToEdit.isPinned)
        noteService.save(noteToEdit)
        .then (placeNote)

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

    function pinNote(noteFromPin){
        noteService.save({...noteFromPin, isPinned: noteFromPin.isPinned, pinTime: (noteFromPin.isPinned) ? Date.now() : ''})
        .then(placeNote)

    }

    
    
    function placeNote(noteToPlace){
        console.log('note reached index', noteToPlace.isPinned)
        //Note already saved in the service

        //First take her out and set her again with all the notes
        const restOfNotes = notes.filter(note => note.id !== noteToPlace.id)
        
        const unsortedNotes = [...restOfNotes, noteToPlace]
        
        // Now sort the array
        // const sortedNotes = sortNotes(unsortedNotes)
        const sortedNotes = noteService.sortNotes(unsortedNotes)

        setNotes(sortedNotes)
    }


    function duplicateNote(noteToDuplicate){
        const newNote = structuredClone(noteToDuplicate)
        console.log(newNote)
        newNote.id = ''
        newNote.time = Date.now()
        newNote.isPinned = false
        newNote.info.title += ' - copy'
        noteService.save(newNote)
        .then((note) => setNotes([...notes, note]))
        
        
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
            <AddNote notes={notes} onAdd={addNewNote} onPinNote ={placeNote} />
            {isNotes && <NoteList notes={notes} onRemove={removeNote} onEdit={addEditNote} onPinNote={pinNote} onDuplicate={duplicateNote} />}
            {!isNotes && <h2>No notes!!  Done with the chores for today...</h2>} 
        </main>
        
    </section>
}
