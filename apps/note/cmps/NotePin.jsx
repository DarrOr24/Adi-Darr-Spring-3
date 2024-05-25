const { useState } = React

export function NotePin({note ,onPinNote}){

        const [ isPinned, setIsPinned ] = useState(note.isPinned)

        function togglePin(ev){
                ev.stopPropagation()
                onPinNote(note)
                setIsPinned(prevIsPinned => !prevIsPinned)
                

        }

        function isNotePinned(){
                return isPinned ? 'pinned' : ''

        }

        

        return <div onClick={togglePin} className={`action-icon note-pin ${isNotePinned()}`}>
                        <img src="assets\img\pin.svg" alt="" />
                        <span className="action-name">Pin Note</span>
                </div>

       
}