const { useState } = React
const { Link } = ReactRouterDOM

export function MailSideMenu({ unreadCount, onSetStatus }){
    const [selectedFolder, setSelectedFolder] = useState('inbox')
    
    function handleFolderClick(folder) {
        setSelectedFolder(folder)
        onSetStatus(folder)
    }
    return (
        <section className = "mail-side-menu">
            <Link to="/mail/new">
                <button className='mail-compose'>
                    <img src="assets\img\edit_labels.svg" alt="" />
                    Compose
                </button>
            </Link>
            <ul className = "menu">
                <li className={selectedFolder === 'inbox' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('inbox')} >
                        <Link to="/mail">
                            <i className="fa-solid fa-inbox"></i>
                            <span>Inbox</span>
                            <span>{unreadCount}</span>
                        </Link>
                </li>
                    
                <li className={selectedFolder === 'sent' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('sent')}>
                        <Link to="/mail/sent">
                            <i className="fa-solid fa-paper-plane"></i>
                            <p>Sent</p>
                        </Link>
                </li>
                {/* <li className={selectedFolder === 'trash' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('trash')}>
                        <img src="assets\img\trash.svg" alt="" />
                        <p>Trash</p>
                </li> */}
                <li className={selectedFolder === 'trash' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('trash')}>
                    <Link to="/mail/trash">
                        <img src="assets/img/trash.svg" alt="" />
                        <p>Trash</p>
                    </Link>
                </li>
            </ul>
        </section>
    )
}