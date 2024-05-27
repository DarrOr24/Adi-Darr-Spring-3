import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteImgAdd({note: noteToEdit, onReturn, onChangeImg}){

    console.log(noteToEdit)

    const [ note, setNote ] = useState(noteToEdit)

    function onSave(ev){
        ev.preventDefault()
        noteService.save(note)
        .then(onChangeImg)
        
        console.log('Submitted at NoteImg Add')
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
            type: 'NoteImg',
            updatedAt: Date.now(),
            info: { ...prevNote.info, [prop]: value }
        }))

       

        

        
    }
    
  
    return <section className = "note-img-add">
        <form onSubmit = {onSave}>
           
            <label htmlFor="url">Enter an https:// URL:</label>
           <input
                onChange={handleChangeInfo} 
                // value={noteToEdit.info.url}
                id="url" 
                name="url"
                type="url" 
                placeholder="https://example.com"
                pattern="https://.*" size="30" 
            /> 

            <button>Close</button>
            <button onClick={onReturn} type="button">Return</button>
            
        </form>    
    </section >
    
}
  
