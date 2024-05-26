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

    function pinNote(noteToEdit){
        //First update the notes without rendering from the storage
        const notesCopy = notes.slice()
        
        if(noteToEdit.isPinned){
            var newNotes = notesCopy.filter(note => note.id !== noteToEdit.id)
            newNotes.unshift(noteToEdit)
            noteService.saveAll(newNotes)
            setNotes(newNotes)
        }
        //Here I first take out of the notes (not updated yet) the note that is unpinned
        //then I filter out all the unpinned notes (from notesCopy) from the array and add the recentely unpinned note
        //then I sort the unpinned notes array according to the timestamp
        //I filter all the pinned notes from (notesCopy)
        //Make a new array by spreading first the pinned notes then the unpinned notes
        if(!noteToEdit.isPinned){
            //Not updated on the notes
            var newNotes = notesCopy.filter(note => note.id !== noteToEdit.id) //get the note out of the array
            const unpinnedNotes = newNotes.filter(note => note.isPinned === false)
            unpinnedNotes.push(noteToEdit) //add the note to the unpinned notes
            unpinnedNotes.sort((note1, note2) => note1.time - note2.time)
            const pinnedNotes = newNotes.filter(note => note.isPinned === true)
            newNotes =[...pinnedNotes, ...unpinnedNotes]
            noteService.saveAll(newNotes)
            setNotes(newNotes)
        }     
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
            <AddNote notes={notes} onAdd={addNewNote} onPinNote ={pinNote} />
            {isNotes && <NoteList notes={notes} onRemove={removeNote} onEdit={addEditNote} onPinNote={pinNote} onDuplicate={duplicateNote} />}
            {!isNotes && <h2>No notes!!  Done with the chores for today...</h2>} 
        </main>
        
    </section>
}
