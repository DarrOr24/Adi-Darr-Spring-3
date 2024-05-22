import { utilService } from '../../../services/util.service.js'

export function MailPreview({ email }) {
    const sentDate = new Date(email.sentAt)
    const day = sentDate.getDate()
    const monthName =  utilService.getMonthName(sentDate)

    // const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
    const formattedTime = sentDate.toLocaleTimeString('en-IL', timeOptions).toLocaleUpperCase()
    
    return (
        <article className="mail-preview">
            <h3>{email.from}</h3>
            <h3>{email.subject}</h3>
            <p>{email.body}</p>
            <p>{monthName} {day} {formattedTime}</p>
        </article>
    )
}
