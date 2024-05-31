const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";
import { NoteSideMenu } from "../cmps/NoteSideMenu.jsx";
import { TrashNotePreview } from "../cmps/TrashNotePreview.jsx";
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { TrashNoteList } from "../cmps/TrashNoteList.jsx";


export function TrashNoteIndex (){
    const [trashNotes, setTrashNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ filterBy, setFilterBy ] = useState({})
    
    const mainDisplay = 'trash'
    
    useEffect(() => {
        noteService.loadFromTrash()
            .then(trashNotes => setTrashNotes(trashNotes))
    }, [])

    function onPermanentDelete(noteToDelete){
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

    function onRestoreTrash(noteToRestore){
        noteService.save({...noteToRestore, id:''})
            .then(onPermanentDelete(noteToRestore))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    if (isLoading) return <div className="loader"></div>

    return <section className="trash-note-index full" >

        <header className="note-index-header">
            <img height="50" src="assets\img\keep-icon.png" alt="" />
            <h1>Keep</h1>
            <NoteFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </header>

        <main className="trash-index-main">

            <NoteSideMenu mainDisplay={mainDisplay}/>

            <TrashNoteList trashNotes={trashNotes} onRestoreTrash={onRestoreTrash} onPermanentDelete={onPermanentDelete} />

        </main>
        
    </section>
}
