const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailDetails({mail, onReturn}) {

    
    

    // console.log('reached mail details')
    // const [mail, setMail] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)

    
    const navigate = useNavigate()

    useEffect(() => {
        
        
        navigate(`/mail/details/${mail.id}`)
        
        
    }, [])
    // useEffect(() => {
    //     setIsLoading(true)
    //     mailService.get(params.mailId)
    //         .then(mail => {
    //             setMail(mail)
    //             if (!mail.isRead) {
    //                 const updatedMail = { ...mail, isRead: true }
    //                 mailService.save(updatedMail)
    //                     .then(() => {
    //                         toggleReadStatus(updatedMail.id)
    //                     })
    //             }
    //         })
    //         .catch(() => {
    //             alert('Couldnt get mail...')
    //             navigate('/mail/inbox')
    //         })
    //         .finally(() => {
    //             setIsLoading(false)
    //         })
    // }, [params.mailId])


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
                    <span className="action-name">Back to</span>
                
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

