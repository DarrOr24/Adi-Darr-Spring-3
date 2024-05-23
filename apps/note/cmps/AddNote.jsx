const { useState, useEffect } = React

const { useNavigate } = ReactRouter

import { noteService } from "../services/note.service.js";
import { ActionBtnsNewNote } from "./ActionBtnsNewNote.jsx";
import { AddNoteSideMenu } from "./AddNoteSideMenu.jsx";

export function AddNote(){
    
    const emptyNote = {
        info: {title: '', txt: '' },
        isPinned: false,
        style: {backgroundColor: 'white'},
        type: 'NoteTxt'
    }

    const navigate = useNavigate()
    const [ openNote, setOpenNote ] = useState(false)
    const [ note, setNote ] = useState(emptyNote)

    useEffect(() => {
        

    }, [note])

    
    function onClickNote(){
         navigate(`/note/add`)
        if (!openNote)  setOpenNote(true)
    }

    function closeNote(){
        setOpenNote(false)
        navigate(`/note`)
    }

    function onSave(ev) {
        ev.preventDefault()
        console.log(note)
        
        noteService.save(note)
            .then(setOpenNote(false))
            .catch(() => {
                console.log('error')
                // showErrorMsg('Couldnt save')
            })
            .finally(() => navigate('/note'))
    }

    function handleChangeInfo({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        
        setNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [prop]: value }
        }))
    }

    
    return <section className = "add-note">
            
            {openNote && <AddNoteHeader />}
            {!openNote && <p className="take-a-note" onClick={onClickNote}>Take a note...</p>}

            {openNote && <NewNoteForm note={note} handleChangeInfo={handleChangeInfo} onSave={onSave} /> }

            {!openNote && <AddNoteSideMenu />}
            {openNote && <ActionBtnsNewNote onClose={closeNote} />} 
      
    </section>
}

function NewNoteForm({note, handleChangeInfo, onSave}){
    return <section className = "new-note">
    <form onSubmit = {onSave}>
       <label htmlFor="title">Title</label>
       <input
           onChange={handleChangeInfo} value={note.info.title}
           id="title" name="title"
           type="text" placeholder="Title" />

       <label htmlFor="txt">Subject</label>
       <input
           onChange={handleChangeInfo} value={note.info.txt}
           id="txt" name="txt"
           type="txt" placeholder="Take a note..." />

       <button>Save</button>
   </form>    
</section >

}



function AddNoteHeader(){
    return <header>
        <h4>Title</h4>
        <div className="action-icon">
            <img src="assets\img\pin.svg" alt="" />
            <span className="action-name">Pin Note</span>
        </div>
    </header>
}

