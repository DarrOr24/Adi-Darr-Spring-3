const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailDetails({mail, onReturn}) {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/mail/details/${mail.id}`)
    }, [])

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

    
    return (
        <section className="mail-details">
            <div onClick={onReturn} className="action-icon back">
                    <img src="assets/img/back.svg" alt="" />
                    <span className="action-name">Back</span>
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

