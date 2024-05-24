const { useState } = React

const { useNavigate } = ReactRouter


import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx";
import { AddNoteSideMenu } from "./AddNoteSideMenu.jsx";
import { NoteForm } from "./NoteForm.jsx";
import { NotePin } from "./NotePin.jsx";

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

   
    function onClickNote(){
         navigate(`/note/add`)
        if (!openNote)  setOpenNote(true)
    }

    function setNoteColor(color){
        console.log(color)
        setNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))
    }

    function onSave(ev) {
        ev.preventDefault()
        if((!note.info.title)&&(!note.info.txt)){ //if note is empty
            setOpenNote(false)
            navigate(`/note`)
            return 
        }
        
        else{
            noteService.save(note)
            .then((newNote) => {
                onAdd(newNote)
                setOpenNote(false)
                setNote(emptyNote)
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

    
    return <section className = "add-note" style={{backgroundColor: note.style.backgroundColor}}>
            
            {!openNote && 
                <div className="take-a-note">
                    <p  onClick={onClickNote}>Take a note...</p>
                    <AddNoteSideMenu />
                </div> }

            {openNote && <NotePin />}
        
            {openNote && <NoteForm  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave}/> }
                    
            {openNote &&  <ActionBtns note={note}  onSetNoteColor={setNoteColor} />} 
           
      
    </section>
}


