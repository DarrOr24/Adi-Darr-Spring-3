const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteSideMenu } from "../cmps/NoteSideMenu.jsx"
import { noteService } from "../services/note.service.js"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { TrashNoteList } from "../cmps/TrashNoteList.jsx"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [trashNotes, setTrashNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ filterBy, setFilterBy ] = useState({})
    const [ mainDisplay, setMainDisplay ] = useState('notes')
    

    useEffect(() => {
        noteService.loadFromTrash()
            .then(trashNotes => setTrashNotes(trashNotes))
    }, [])

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

    function removeNote(ev, noteToTrash){
        ev.stopPropagation()
        const noteId = noteToTrash.id
        console.log('oh yeah!!  triple callback!!')
        setIsLoading(true)
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
        
        noteService.saveToTrash(noteToTrash)
        setTrashNotes(prevTrashNotes => [noteToTrash, ...prevTrashNotes ])
        console.log(trashNotes)

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
        
        const sortedNotes = noteService.sortNotes(unsortedNotes)

        setNotes(sortedNotes)
    }

    function duplicateNote(noteToDuplicate){
        const newNote = structuredClone(noteToDuplicate)
       
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

    function onMainDisplay(status){
        console.log(status)
        setMainDisplay(prevMainDisplay => prevMainDisplay = status)
    }

    function permanentDelete(noteToDelete){
        const noteId = noteToDelete.id
        
        setIsLoading(true)
        
        noteService.removeFromTrash(noteId)
            .then(() => {
                setTrashNotes(prevTrashNotes => prevTrashNotes.filter(note => note.id !== noteId))
                
            })
            .catch(err => {
                console.log('err:', err)
                
            })
            .finally(() => setIsLoading(false)) 
    }

    function restoreTrash(noteToRestore){
         

        setNotes(prevNotes => [...prevNotes, noteToRestore])
        noteService.save({...noteToRestore, id:''})
            .then(note => setNotes(prevNotes => [...prevNotes, note]))
            .finally(permanentDelete(noteToRestore))
    }

    
    if (isLoading) return <div className="loader"></div>
    return <section className = "note-index full">
        <header className="note-index-header">
            <img height="50" src="assets\img\keep-icon.png" alt="" />
            <h1>Keep</h1>
            <NoteFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </header>
        <main>
            <NoteSideMenu onMainDisplay={onMainDisplay} />
            
            {(mainDisplay==='notes')&& <AddNote notes={notes} onAdd={addNewNote} onPinNote ={placeNote} />}
                    
            <DynamicCmp onRestoreTrash={restoreTrash} onPermanentDelete={permanentDelete} trashNotes={trashNotes} status={mainDisplay} notes={notes} onRemove={removeNote} onEdit={addEditNote} onPinNote={pinNote} onDuplicate={duplicateNote} />
            
        </main>
        
    </section>
}

function DynamicCmp(props){
    switch (props.status) {
        case 'trash': 
            return <TrashNoteList {...props} />
            
            
        case 'notes':
            return  <NoteList {...props} />
                
        case 'reminders':
        case 'labels':
        case 'archive':
            return <h1>IN CONSTRUCTION</h1>
       
    }
}