import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NotePin({note: noteToPin ,onPinNote}){

        const [ note, setNote ] =useState(noteToPin)
        const [isPin, setIsPin] = useState(note.isPinned)
        
        useEffect(() => {
                isNotePinned()
            }, [isPin])

        function togglePin(ev){
                ev.stopPropagation()
                setIsPin(prevIsPin => !prevIsPin)
                setNote(prevNote =>({...prevNote, isPinned: isPin}) )
                isNotePinned()
                // onPinNote(note)
                noteService.save(note)
                .then((updatedNote) => onPinNote(updatedNote))
               

        }

        function isNotePinned(){
                return isPin ? 'pinned' : ''

        }

        

        return <div onClick={togglePin} className={`action-icon note-pin ${isNotePinned()}`}>
                        <img src="assets\img\pin.svg" alt="" />
                        <span className="action-name">Pin Note</span>
                </div>

       
}