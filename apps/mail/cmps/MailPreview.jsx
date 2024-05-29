import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail }) {
    

    const sentDate = new Date(mail.sentAt)
    const currentDate = new Date()
    const day = sentDate.getDate()
    const monthName =  utilService.getMonthName(sentDate)

    // const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
    const formattedTime = sentDate.toLocaleTimeString('en-IL', timeOptions).toLocaleUpperCase()
    
    const timeDifference = currentDate - sentDate

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
    const hasDayPassed = timeDifference >= oneDayInMilliseconds

    const { to, from, subject, body, isRead } = mail

    

    return ( 
        <article className="mail-preview" >
            {(to ==='user@appsus.com')&&<div className="from">{from}</div>}
            {(from ==='user@appsus.com')&&<div className="from">{to}</div>}
            <div className="txt">
                <p className="subject">{subject}</p>
                <p className="body">{body.substring(0,70)}</p>    
            </div>
            <div className="time">
                {hasDayPassed ? `${monthName} ${day}` : formattedTime}
            </div>
            {/* <p>{monthName} {day} {formattedTime}</p> */}
        </article> 

        
    )
}
