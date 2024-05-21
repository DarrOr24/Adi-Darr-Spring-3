import { MailPreview } from './MailPreview.jsx'

export function MailList({ emails, onRemove }) {
    return (
        <section className="mail-list">
        <ul>
            {emails.map(email => 
            <li key={email.id}>
                <MailPreview email={email} />
                <button onClick={() => onRemove(email.id)}>x</button>
            </li>)}
        </ul>
    </section>
    )
}
