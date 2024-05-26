export function ActionBtnsMail({ mail, removeMail, toggleReadStatus}) {
    
    function handleToggleReadStatus() {
        toggleReadStatus(mail.id)
    }

    return (
        <section className="mail-action-btn">
            <div className="action-icon" onClick={() => removeMail(mail.id)}>
                <img src="assets/img/trash.svg" alt="Trash" />
                <span className="action-name">Delete</span>
            </div>
            <div className="action-icon" onClick={handleToggleReadStatus}>
                {mail.isRead ? <img src="assets/img/unread.svg" alt="Unread" /> : <i className="fa-regular fa-envelope-open"></i>}
                <span className="action-name">Mark as {mail.isRead ? 'unread' : 'read'}</span>
            </div>
        </section>
    )
}