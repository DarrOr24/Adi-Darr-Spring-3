export function NoteSideMenu(){
    
        return <ul className = "side-menu">
            <li className="selected">
                <img src="assets\img\notes.svg" alt="" />
                <p>Notes</p>
            </li>
            <li>
                <img src="assets\img\reminders.svg" alt="" />
                <p>Reminders</p>
            </li>
            <li>
                <img src="assets\img\edit_labels.svg" alt="" />
                <p>Edit labels</p>
            </li>
            <li>
                <img src="assets\img\archive.svg" alt="" />
                <p>Archive</p>
            </li>
            <li>
                <img src="assets\img\trash.svg" alt="" />
                <p>Trash</p>
            </li>
        </ul>
}