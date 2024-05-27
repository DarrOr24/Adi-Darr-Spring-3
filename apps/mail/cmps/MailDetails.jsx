const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailDetails({ toggleReadStatus, status }) {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
                if (!mail.isRead) {
                    const updatedMail = { ...mail, isRead: true }
                    mailService.save(updatedMail)
                        .then(() => {
                            toggleReadStatus(updatedMail.id)
                        })
                }
            })
            .catch(() => {
                alert('Couldnt get mail...')
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.mailId])


    function getTime(mail) {
        const sentDate = new Date(mail.sentAt)
        const day = sentDate.getDate()
        const monthName =  utilService.getMonthName(sentDate)
        const dayName =  utilService.getDayName(sentDate, 'EN')
    
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
        const formattedTime = sentDate.toLocaleTimeString('en-IL', timeOptions).toLocaleUpperCase()

        const time = dayName + ', ' + monthName + ' ' + day + ', ' + formattedTime
        return time
    }

    if (isLoading) return <h3>Loading...</h3>
    return (
        <section className="mail-details">
            <div className="action-icon back">
                <Link to="/mail">
                    <img src="assets/img/back.svg" alt="" />
                    <span className="action-name">Back to {status}</span>
                </Link>
            </div>
            <div className="subject">{mail.subject}</div>
            <div className="details">
                <span className="from">{'<'}{mail.from}{'>'}</span>
                <span>{getTime(mail)}</span>
            </div>
            <div className="mail-body">{mail.body}</div>
        </section>
    )
}

