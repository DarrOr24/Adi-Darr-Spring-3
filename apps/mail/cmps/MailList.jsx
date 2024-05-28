const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { ActionBtnsMail } from './ActionBtnsMail.jsx'

export function MailList({ mails, removeMail, toggleReadStatus }) {

   
    if (mails.length === 0) {
        return (
            <div className="no-mails">
                No conversations
            </div>
        )
    }

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`${mail.isRead ? '' : 'un-read'}`}> 
                        
                        <MailPreview mail={mail} />
                        
                        <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />

                    </li>))}
            </ul>
        </section>
    )
}
