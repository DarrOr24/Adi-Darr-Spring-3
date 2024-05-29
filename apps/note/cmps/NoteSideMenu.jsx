const { useState } = React

export function NoteSideMenu({onMainDisplay}){

    const [ isClosed, setIsClosed ] = useState(true)
    const [ isNoteSelected, setIsNoteSelected ] = useState('selected')
    const [ isRemindersSelected, setIsRemindersSelected ] = useState('')
    const [ isLabelsSelected, setIsLabelsSelected ] = useState('')
    const [ isArchiveSelected, setIsArchiveSelected ] = useState('')
    const [ isTrashSelected, setIsTrashSelected ] = useState('')

    function toggleSideMenu(){
        setIsClosed(prevIsClosed => !prevIsClosed)
    }

    function onNotesClicked(){
        unselectAll()
        setIsNoteSelected('selected')
        onMainDisplay('notes')

    }
    
    function onRemindersClicked(){
        unselectAll()
        setIsRemindersSelected('selected')
        onMainDisplay('reminders')
    }

    function onLabelsClicked(){
        unselectAll()
        setIsLabelsSelected('selected')
        onMainDisplay('labels')
    }

    function onArchiveClicked(){
        unselectAll()
        setIsArchiveSelected('selected')
        onMainDisplay('archive')
    }

    function onTrashClicked(){
        unselectAll()
        setIsTrashSelected('selected')
        onMainDisplay('trash')
    }

    function unselectAll(){
        setIsNoteSelected('')
        setIsRemindersSelected('')
        setIsLabelsSelected('')
        setIsArchiveSelected('')
        setIsTrashSelected('')
    }
    
    return <ul className = "side-menu">
        <li onClick={toggleSideMenu} className="hamburger"><img height="20" src="assets\img\hamburger.svg" alt="" /> </li>
        <li className={isNoteSelected} onClick={onNotesClicked}>
            <img src="assets\img\notes.svg" alt="" />
            {!isClosed && <p>Notes</p>}
        </li>
        <li className={isRemindersSelected} onClick={onRemindersClicked}>
            <img src="assets\img\reminders.svg" alt="" />
            {!isClosed && <p>Reminders</p>}
        </li>
        <li className={isLabelsSelected} onClick={onLabelsClicked}>
            <img src="assets\img\edit_labels.svg" alt="" />
            {!isClosed && <p>Edit labels</p>}
        </li>
        <li className={isArchiveSelected} onClick={onArchiveClicked}>
            <img src="assets\img\archive.svg" alt="" />
            {!isClosed && <p>Archive</p>}
        </li>
        <li className={isTrashSelected} onClick={onTrashClicked}>
            <img src="assets\img\trash.svg" alt="" />
            {!isClosed && <p>Trash</p>}
        </li>
    </ul>
}