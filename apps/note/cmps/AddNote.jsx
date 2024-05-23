const { useState } = React

import { ActionBtnsNewNote } from "./ActionBtnsNewNote.jsx";
import { AddNoteSideMenu } from "./AddNoteSideMenu.jsx";

export function AddNote({notes}){

    const [ openNote, setOpenNote ] = useState(false)

    function onClickNote(){
        if (!openNote)  setOpenNote(true)
    }

    function closeNote(){
        setOpenNote(false)
    }

    
    return <section className = "add-note">

            {openNote && <AddNoteHeader />}
            <p onClick={onClickNote}>Take a note...</p>
            {!openNote && <AddNoteSideMenu />}
            {openNote && <ActionBtnsNewNote onClose={closeNote} />} 
      
    </section>
}

function AddNoteHeader(){
    return <header>
        <h4>Title</h4>
        <div className="action-icon">
            <img src="assets\img\pin.svg" alt="" />
            <span className="action-name">Pin Note</span>
        </div>
    </header>
}

