const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { ActionBtnsMail } from './ActionBtnsMail.jsx'

export function MailList({ mails, removeMail, toggleReadStatus }) {

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`${mail.isRead ? '' : 'un-read'}`}> 
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                        <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />

                    </li>))}
            </ul>
        </section>
    )
}
