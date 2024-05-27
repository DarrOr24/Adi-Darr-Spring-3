const { useState, useEffect } = React

const { useNavigate } = ReactRouter


import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx";
import { NoteForm } from "./NoteForm.jsx";
import { NoteImgAdd } from "./NoteImgAdd.jsx";
import { NotePin } from "./NotePin.jsx";

export function NoteEdit2({ noteToEdit, onClose, onEdit, onSetColorNote, onPinNote }){

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
            
            noteService.save({...note, updatedAt: Date.now(),})
            .then((note) => {
                console.log(note.isPinned)
                onEdit(note)
                onClose()
            })
            
            .catch(() => {
                console.log('error')
                // showErrorMsg('Couldnt save')
            })
            .finally(() => navigate('/note'))
        }
        
    }


    function setNoteColor(color){
        setNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))
        onSetColorNote(color) 
    }

    function isNotePinned(noteFromPin){
        setNote(prevNote => ({
            ...prevNote,
            isPinned: noteFromPin.isPinned,
            pinTime: noteFromPin.pinTime
        }))

    }

    function addImg(noteFromAddImg){
        console.log(noteFromAddImg)
        
        console.log('Reached add note img')

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
        <section className="note-edit video" >

            <div className="screen"></div>
            <article style={{backgroundColor: note.style.backgroundColor}}>
                <NotePin note={note} onPinNote ={isNotePinned}/>
        
                <NoteForm  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave}/> 
                {/* <DynamicCmp  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave}   />  */}
                <ActionBtns note={note} onSetNoteColor={setNoteColor} onChangeImg={addImg}  />       

            </article>
            
            
        </section>
    )
    
}


function DynamicCmp(props){
    
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteEditForm  {...props}/>
        case 'NoteImg':
            return <NoteImgAdd {...props}/>
        case 'NoteVideo':
            return <NoteImgAdd {...props}/>
           
    }
}



    
