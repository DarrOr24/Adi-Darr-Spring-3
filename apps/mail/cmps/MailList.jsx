const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { ActionBtnsMail } from './ActionBtnsMail.jsx'

export function MailList({ mails, removeMail, toggleReadStatus, status }) {
    if (mails.length === 0) {
        return (
            <div className="no-mails">
                No conversations in {status}.
            </div>
        )
    }

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`${mail.isRead ? '' : 'un-read'}`}> 
                        <Link to={`/mail/${status}/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                        <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />

                    </li>))}
            </ul>
        </section>
    )
}
