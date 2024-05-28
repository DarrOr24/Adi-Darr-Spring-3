import { noteService } from "../services/note.service.js"
import { youtubeService } from "../services/youtube.service.js"
import { VideoList } from "./VideoList.jsx"

const { useState } = React

export function NoteVideoAdd({note: noteToEdit, onChangeVideo, onReturn}){

    const [ note, setNote ] = useState(noteToEdit)
    const [ videoList, setVideoList ] = useState([])

    function onSave(ev){
        console.log('second step - submitted')
        ev.preventDefault()
        noteService.save(note)
        .then(onChangeVideo)
    }

    function getVideos({ target }) {
        
        
        let { value } = target

        setVideoList(youtubeService.getVideos(value))        
  
    }
    
  
    return <section className = "note-video-add">
        <form onSubmit={onSave}>
            <input 
            onChange={getVideos}
            type="text" 
            placeholder="Search..."
            id="txt" 
            name="txt"
             />
 
            <button>Search</button>
        </form>   
            <button type="button" onClick={onReturn}>Return</button>

        <VideoList videos = {videoList} />

    </section >
    
}
  
