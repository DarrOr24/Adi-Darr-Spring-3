const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteDetails(){
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNote()
    }, [params.noteId])


    function loadNote() {
        setIsLoading(true)
        noteService.get(params.noteId)
            .then(note => {
                setNote(note)
            })
            .catch(() => {
                // showErrorMsg('Couldnt get note...')
                navigate('/note')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    if (isLoading) return <h3>Loading...</h3>
    return (
        <section className="note-details" >
            <article style={{backgroundColor: note.style.backgroundColor}}>
                <h3>{note.info.title}</h3>
                <p>{note.info.txt}</p>
            
                <Link to="/note"><button>x</button></Link>
            </article>
            
            
        </section>
    )

    
}