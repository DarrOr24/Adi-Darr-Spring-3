const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemove }) {
    return (
        <section className="mail-list">
        <ul>
            {mails.map(mail => 
            <li key={mail.id}>
                {/* <Link to={`/mail/${mail.id}`}><button>Details</button></Link> */}
                <Link to={`/mail/${mail.id}`}>
                    <MailPreview mail={mail} />
                </Link>
                {/* <MailPreview mail={mail} /> */}
                <button onClick={() => onRemove(mail.id)}>x</button>
            </li>)}
        </ul>
    </section>
    )
}
