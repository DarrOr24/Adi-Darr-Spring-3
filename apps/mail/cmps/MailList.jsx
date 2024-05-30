const { useNavigate, Link } = ReactRouterDOM
const { useState } = React


import { MailPreview } from './MailPreview.jsx'
import { ActionBtnsMail } from './ActionBtnsMail.jsx'
// import { MailDetails } from './MailDetails.jsx'

// export function MailList({ mails, removeMail, toggleReadStatus, toggleSraredStatus }) {
export function MailList({ mails, removeMail, toggleReadStatus, status }) {
    // const [openDetails, setOpenDetails] = useState(false)
    // const [mail, setMail] = useState({})
    // const navigate = useNavigate()

    // function openMail(mail){
    //     setMail(prevMail => prevMail = mail)
    //     setOpenDetails(true)
    // }

    // function onReturn(){
    //     setOpenDetails(false)
    //     navigate(`/mail`) 
    // }

    if (mails.length === 0) {
        return (
            <div className="no-mails">
                {/* No conversations */}
                No conversations in {status}.
            </div>
        )
    }

    return (
        <section className="mail-list">
            {/* <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`${mail.isRead ? '' : 'un-read'}`}> 
                        <div onClick={()=>openMail(mail)}>
                            {(!openDetails) && <section>
                                    <MailPreview mail={mail} toggleSraredStatus={toggleSraredStatus}/>
                                    <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />
                                </section>}
                        </div>
                    </li>))}

                    {openDetails && <MailDetails mail={mail} onReturn={onReturn} />}
            </ul> */}
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`${mail.isRead ? '' : 'un-read'}`}> 
                        <Link to={`/mail/${status}/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                        <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />
                    </li>))}
            </ul>
        </section>
    )
}
