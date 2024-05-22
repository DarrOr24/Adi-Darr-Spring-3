export function MailSideMenu(){
    
    return <ul className = "side-menu">
        <li className="selected">
            <p>Inbox</p>
        </li>
        <li>
            <p>Sent</p>
        </li>
        <li>
            <img src="assets\img\trash.svg" alt="" />
            <p>Trash</p>
        </li>
    </ul>
}