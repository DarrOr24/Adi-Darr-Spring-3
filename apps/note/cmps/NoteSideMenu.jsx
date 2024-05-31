const { useState, useEffect } = React
const { Link} = ReactRouterDOM


export function NoteSideMenu({mainDisplay}){
    const [ isClosed, setIsClosed ] = useState(false)
    
    const [ isNoteSelected, setIsNoteSelected ] = useState('')
    const [ isRemindersSelected, setIsRemindersSelected ] = useState('')
    const [ isLabelsSelected, setIsLabelsSelected ] = useState('')
    const [ isArchiveSelected, setIsArchiveSelected ] = useState('')
    const [ isTrashSelected, setIsTrashSelected ] = useState('')

    useEffect(() => {
        console.log(mainDisplay)
        if (mainDisplay === 'notes') setIsNoteSelected('selected')
        if (mainDisplay === 'trash') setIsTrashSelected('selected')
    }, [])

    
    function toggleSideMenu(){
        setIsClosed(prevIsClosed => !prevIsClosed)
    }

  
    return <section className = "side-menu">

                <div onClick={toggleSideMenu} className="hamburger side-btn">
                    <img height="20" src="assets\img\hamburger.svg" alt="" /> 
                </div>

                <Link to="/note" className={`${isNoteSelected} side-btn`}> 
                    <img src="assets\img\notes.svg" alt="" />
                    {!isClosed && <p>Notes</p>}
                </Link>
            
                <Link to="/note/soon" className={`${isRemindersSelected} side-btn`}>
                    <img src="assets\img\reminders.svg" alt="" />
                    {!isClosed && <p>Reminders</p>}
                </Link>

                <Link to="/note/soon" className={`${isLabelsSelected} side-btn`} >
                    <img src="assets\img\edit_labels.svg" alt="" />
                    {!isClosed && <p>Edit labels</p>}
                </Link>

                <Link to="/note/soon" className={`${isArchiveSelected} side-btn`} >
                    <img src="assets\img\archive.svg" alt="" />
                    {!isClosed && <p>Archive</p>}
                </Link>

                <Link to="/note/trash" className={`${isTrashSelected} side-btn`}>
                    <img src="assets\img\trash.svg" alt="" />
                    {!isClosed && <p>Trash</p>}
                </Link>
    </section>
}