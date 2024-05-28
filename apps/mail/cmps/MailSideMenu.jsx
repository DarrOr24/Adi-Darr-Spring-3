const { useState } = React
const { Link, useNavigate, useSearchParams } = ReactRouterDOM

export function MailSideMenu({ unreadCount, onSetStatus }){
    const [selectedFolder, setSelectedFolder] = useState('inbox')
    const [searchParams, setSearchParams] = useSearchParams()
    const [ isClosed, setIsClosed ] = useState(true)

    function toggleSideMenu(){
        console.log('isClosed:', isClosed)
        setIsClosed(prevIsClosed => !prevIsClosed)
    }
    
    function handleFolderClick(folder) {
        setSelectedFolder(folder)
        onSetStatus(folder)
    }

    
    function handleComposeClick() {
        searchParams.set('compose', 'new')
        setSearchParams(searchParams)
    }

    return (
        <section className = "mail-side-menu">
            {/* <button className='mail-compose' onClick={handleComposeClick}>
                <img src="assets\img\edit_labels.svg" alt="" />
                Compose
            </button> */}
            <ul className = "menu">
                <li onClick={toggleSideMenu} className="hamburger">
                    <img src="assets\img\hamburger.svg" alt="" />
                    {/* <span className="action-name">Main Menu</span> */}
                </li>
                <li className='mail-compose' onClick={handleComposeClick}>
                    <img src="assets\img\edit_labels.svg" alt="" />
                    Compose
                </li>
                <li className={selectedFolder === 'inbox' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('inbox')} >
                        <Link to="/mail/inbox">
                            <i className="fa-solid fa-inbox"></i>
                            <p>Inbox</p>
                            <p>{unreadCount}</p>
                        </Link>
                </li>
                    
                <li className={selectedFolder === 'sent' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('sent')}>
                        <Link to="/mail/sent">
                            <i className="fa-solid fa-paper-plane"></i>
                            <p>Sent</p>
                            <p></p>
                        </Link>
                </li>
                <li className={selectedFolder === 'trash' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('trash')}>
                    <Link to="/mail/trash">
                        <img src="assets/img/trash.svg" alt="" />
                        <p>Trash</p>
                        <p></p>
                    </Link>
                </li>
            </ul>
        </section>
    )
}