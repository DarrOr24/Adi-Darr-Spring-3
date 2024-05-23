const { Link } = ReactRouterDOM

export function MailSideMenu(){
    
    return (
        <section className = "mail-side-menu">
            <Link to="/mail/new">
                <button className='add-book'>
                    <img src="assets\img\edit_labels.svg" alt="" />
                    Compose
                </button>
            </Link>
            <ul className = "menu">
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
        </section>
    )
}