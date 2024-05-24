const { useState, useEffect } = React

const { useNavigate } = ReactRouter


import { noteService } from "../services/note.service.js";
import { ActionBtnsNewNote } from "./ActionBtnsNewNote.jsx";
import { AddNoteSideMenu } from "./AddNoteSideMenu.jsx";

export function AddNote({onAdd}){
    
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

    

    function onSave(ev) {
        ev.preventDefault()
        console.log(note)

        if((!note.info.title)&&(!note.info.text)){ //if note is empty
            setOpenNote(false)
            navigate(`/note`)
            return 
        }
        
        else{
            noteService.save(note)
            .then((newNote) => {
                onAdd(newNote)
                setOpenNote(false)
            })
            
            .catch(() => {
                console.log('error')
                // showErrorMsg('Couldnt save')
            })
            .finally(() => navigate('/note'))
        }
        
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
            
            {openNote && <PinIcon />}
            
            {!openNote && 
                <div className="take-a-note">
                    <p  onClick={onClickNote}>Take a note...</p>
                    <AddNoteSideMenu />
                </div> }

            {openNote && <NewNoteForm note={note} handleChangeInfo={handleChangeInfo} onSave={onSave} /> }

            {openNote && <ActionBtnsNewNote  />} 
      
    </section>
}

function NewNoteForm({note, handleChangeInfo, onSave}){
    return <section className = "new-note">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} value={note.info.title}
                id="title" name="title"
                type="text" placeholder="Title" />

            
            <input
                onChange={handleChangeInfo} value={note.info.txt}
                id="txt" name="txt"
                type="txt" placeholder="Take a note..." />

            <button>Close</button>
        </form>    
    </section >

}



function PinIcon(){
    return <div className="action-icon pin">
                <img src="assets\img\pin.svg" alt="" />
                <span className="action-name">Pin Note</span>
        </div>
    
}

