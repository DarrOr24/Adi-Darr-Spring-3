const { useState } = React

export function MailSideMenu({ unreadCount, handleComposeClick , onSetStatus }){
    const [selectedFolder, setSelectedFolder] = useState('inbox')
    const [ isClosed, setIsClosed ] = useState(true)

    function toggleSideMenu(){
        console.log('isClosed:', isClosed)
        setIsClosed(prevIsClosed => !prevIsClosed)
    }
    
    function handleFolderClick(folder) {
        setSelectedFolder(folder)
        onSetStatus(folder)
    }


    return (
        <section className = "mail-side-menu">
            
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
                        
                            <i className="fa-solid fa-inbox"></i>
                            <p>Inbox</p>
                            <p>{unreadCount}</p>
                        
                </li>
                    
                <li className={selectedFolder === 'sent' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('sent')}>
                       
                            <i className="fa-solid fa-paper-plane"></i>
                            <p>Sent</p>
                            {/* <p></p> */}
                        
                </li>
                <li className={selectedFolder === 'trash' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('trash')}>
                   
                        <img src="assets/img/trash.svg" alt="" />
                        <p>Trash</p>
                        {/* <p></p> */}
                    
                </li>
                <li className={selectedFolder === 'starred' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('starred')}>
                   
                   <    i className="fa-regular fa-star"></i>
                        <p>starred</p>
                        {/* <p></p> */}
                    
                </li>
            </ul>
        </section>
    )
}