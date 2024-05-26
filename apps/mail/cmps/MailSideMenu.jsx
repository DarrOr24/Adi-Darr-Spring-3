const { Link } = ReactRouterDOM

export function MailSideMenu({ unreadCount }){
    
    return (
        <section className = "mail-side-menu">
            <Link to="/mail/new">
                <button className='add-book'>
                    <img src="assets\img\edit_labels.svg" alt="" />
                    Compose
                </button>
            </Link>
            <ul className = "menu">
                <Link to="/mail">
                    <li className="selected">
                        <i class="fa-solid fa-inbox"></i>
                        <span>Inbox</span>
                        <span>{unreadCount()}</span>
                    </li>
                </Link>
                    
                <li>
                    <p>Sent</p>
                </li>
                <li>
                    <img src="assets\img\trash.svg" alt="" />
                    <p>Trash</p>
                </li>
            </ul>
        </section>
    )
}