export function MailPreview({ email }) {
    return (
        <article className="mail-preview">
            <h3>{email.from}</h3>
            <h3>{email.subject}</h3>
            <p>{email.body}</p>
        </article>
    )
}
