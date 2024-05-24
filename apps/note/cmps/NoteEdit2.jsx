const { useState, useEffect } = React

const { useNavigate } = ReactRouter


import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx";
import { NoteForm } from "./NoteForm.jsx";
import { NotePin } from "./NotePin.jsx";

export function NoteEdit2({ noteToEdit, onClose, onEdit }){

    
    const navigate = useNavigate()
    const [ note, setNote ] = useState(noteToEdit)

    
    function onSave(ev) {
        ev.preventDefault()
        if((!note.info.title)&&(!note.info.txt)){ //if note is empty
            console.log('note is empty')
            onClose()
            // navigate(`/note`)
            return 
        }
        
        else{
            noteService.save(note)
            .then((editedNote) => {
                onEdit(editedNote)
                onClose()
                // setNote(emptyNote)
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
    

    return (
        <section className="note-edit" >

            <div className="screen"></div>
            <article style={{backgroundColor: note.style.backgroundColor}}>
                <NotePin />
        
                <NoteForm  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave}/> 
                <ActionBtns />       

            </article>
            
            
        </section>
    )


    
}



    
