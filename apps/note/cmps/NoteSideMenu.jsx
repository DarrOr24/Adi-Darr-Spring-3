const { useState } = React

export function NoteSideMenu(){

    const [ isClosed, setIsClosed ] = useState(true)

    function toggleSideMenu(){
        setIsClosed(prevIsClosed => !prevIsClosed)
    }
    
    return <ul className = "side-menu">
        <li onClick={toggleSideMenu} className="hamburger"><img height="20" src="assets\img\hamburger.svg" alt="" /> </li>
        <li className="selected">
            <img src="assets\img\notes.svg" alt="" />
            {!isClosed && <p>Notes</p>}
        </li>
        <li>
            <img src="assets\img\reminders.svg" alt="" />
            {!isClosed && <p>Reminders</p>}
        </li>
        <li>
            <img src="assets\img\edit_labels.svg" alt="" />
            {!isClosed && <p>Edit labels</p>}
        </li>
        <li>
            <img src="assets\img\archive.svg" alt="" />
            {!isClosed && <p>Archive</p>}
        </li>
        <li>
            <img src="assets\img\trash.svg" alt="" />
            {!isClosed && <p>Trash</p>}
        </li>
    </ul>
}