// const { Link } = ReactRouterDOM
const { Link, useOutletContext } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

// export function MailList({ mails, onRemove }) {
export function MailList() {
    const { mails, removeMail } = useOutletContext()

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id}> 
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                        <button onClick={() => removeMail(mail.id)}>
                            <img src="assets\img\trash.svg" alt="" />   
                        </button>
                    </li>))}
            </ul>
        </section>
    )
}
