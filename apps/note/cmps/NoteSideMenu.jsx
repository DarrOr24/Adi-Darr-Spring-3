const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteSideMenu({mainDisplay}){

    const [ isClosed, setIsClosed ] = useState(true)
    const [ isNoteSelected, setIsNoteSelected ] = useState('')
    const [ isRemindersSelected, setIsRemindersSelected ] = useState('')
    const [ isLabelsSelected, setIsLabelsSelected ] = useState('')
    const [ isArchiveSelected, setIsArchiveSelected ] = useState('')
    const [ isTrashSelected, setIsTrashSelected ] = useState('')

    useEffect(() => {
        if (mainDisplay === 'notes') setIsNoteSelected('selected')
        if (mainDisplay === 'trash') setIsTrashSelected('selected')
    }, [])

    function toggleSideMenu(){
        setIsClosed(prevIsClosed => !prevIsClosed)
    }

  
    return <ul className = "side-menu">
            <li onClick={toggleSideMenu} className="hamburger">
                <img height="20" src="assets\img\hamburger.svg" alt="" /> 
            </li>

        <Link to="/note"> 
            <li className={isNoteSelected} >
                <img src="assets\img\notes.svg" alt="" />
                {!isClosed && <p>Notes</p>}
            </li>
        </Link>

            <li className={isRemindersSelected}>
                <img src="assets\img\reminders.svg" alt="" />
                {!isClosed && <p>Reminders</p>}
            </li>

            <li className={isLabelsSelected} >
                <img src="assets\img\edit_labels.svg" alt="" />
                {!isClosed && <p>Edit labels</p>}
            </li>

            <li className={isArchiveSelected} >
                <img src="assets\img\archive.svg" alt="" />
                {!isClosed && <p>Archive</p>}
            </li>

        <Link to="/note/trash" >
            <li className={isTrashSelected}>
                <img src="assets\img\trash.svg" alt="" />
                {!isClosed && <p>Trash</p>}
            </li>
        </Link>

    </ul>
}