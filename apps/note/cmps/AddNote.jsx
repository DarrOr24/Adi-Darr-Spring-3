const { useState } = React

const { useNavigate } = ReactRouter


import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx";
import { NoteForm } from "./NoteForm.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteImgAdd } from "./NoteImgAdd.jsx";
import { NotePin } from "./NotePin.jsx";
import { NoteToDos } from "./NoteToDos.jsx";

export function AddNote({onAdd}){

    const emptyNote = noteService.createNote('NoteTxt', false, {backgroundColor: 'white'}, {title: '', txt: '', url:'' }, Date.now())
    
    const navigate = useNavigate()
    const [ openNote, setOpenNote ] = useState(false)
    const [ note, setNote ] = useState(emptyNote)

   
    function onClickNote(){
         navigate(`/note/add`)
         console.log(note.type)
        if (!openNote)  setOpenNote(true)
    }

    function addTodosNote(){
        console.log('HI')
        navigate(`/note/add`)
        setNote({...note, type: 'NoteList'})
        setOpenNote(true)

    }

   

    function setNoteColor(color){
        setNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))
    }

    function isPinned(isPin){
        console.log(isPin) //the previous value is showing because it was not saved
        
        setNote(prevNote => ({
            ...prevNote,
            isPinned: isPin,
            pinTime: (isPin) ? Date.now() : ''
        }))
 
    }


    function onSave(ev) {
        ev.preventDefault()
        switch (note.type) {
            case 'NoteTxt':
                if ((!note.info.title)&&(!note.info.txt)){
                    setOpenNote(false)
                    setNote(emptyNote)
                    navigate(`/note`)
                    return 
                }
                
            case 'NoteImg':
            case 'NoteVideo':
                if ((!note.info.title)&&(!note.info.url)){
                    setOpenNote(false)
                    setNote(emptyNote)
                    navigate(`/note`)
                    return 
                }   
        }

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

    function addImg(noteFromAddImg){
        setOpenNote(true)
        setNote(noteFromAddImg)
    }

    

    function handleChangeInfo({ target }) {
        console.log(target)
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
                    <ActionBtns note={note}  onSetNoteColor={setNoteColor} onLoadImgOrVid={addImg} onAddTodos = {addTodosNote}  />
                </div> }

            {openNote && <NotePin note={note} onPinNote ={isPinned}/>}
        
            {openNote && <DynamicCmp  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave}   /> }
            {/* {openNote && <NoteForm  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave}   /> } */}
                    
            {openNote &&  <ActionBtns note={note}  onSetNoteColor={setNoteColor} onLoadImgOrVid={addImg}  />} 
           
        
    </section>
}


function DynamicCmp(props){
    
    switch (props.note.type) {
        case 'NoteVideo':
        case 'NoteImg':
        case 'NoteTxt':
            return <NoteForm  {...props}/>
        case 'NoteList':
            return <NoteToDos {...props}/>
               
            
    }
}





