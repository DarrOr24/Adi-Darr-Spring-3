import { noteService } from "../services/note.service.js"
import { youtubeService } from "../services/youtube.service.js"
import { VideoList } from "./VideoList.jsx"

const { useState } = React

export function NoteVideoAdd({note: noteToEdit, onChangeVideo, onReturn}){

    const [ note, setNote ] = useState(noteToEdit)
    const [ isReady, setIsReady ] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [finalValue, setFinalValue] = useState('')

    function onSave(ev){
        console.log('second step - submitted')
        ev.preventDefault()
        noteService.save(note)
        .then(onChangeVideo)
    }

    function handleChange({ target }) {
        
        let { value } = target
        setSearchValue(prevSearchValue => prevSearchValue = value)

    }

    function onSearch(ev){
        ev.stopPropagation()
        setFinalValue(searchValue)
        setIsReady(true)
        
        
    }
    
  
    return <section className = "note-video-add">
            {/* <form onSubmit = {onSearch}> */}
           
           <input
               onChange={handleChange} 
               id="title" 
               name="title"
               type="text" 
               placeholder="Search..."
                />

           <button onClick={onSearch}>Search</button>
           <button type="button" onClick={onReturn}>Return</button>
       {/* </form>   */}

       {(isReady)&& <VideoList searchValue={finalValue} />}  

    </section >
    
}
  
