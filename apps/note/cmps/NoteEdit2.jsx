import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

export function NoteEdit2({ note, onClose }){
    

    return (
        <section className="note-edit" >
            <div className="screen"></div>
            <article style={{backgroundColor: note.style.backgroundColor}}>
                <h3>{note.info.title}</h3>
                <p>{note.info.txt}</p>
            
                <button onClick={onClose}>Back</button>
            </article>
            
            
        </section>
    )


    
}