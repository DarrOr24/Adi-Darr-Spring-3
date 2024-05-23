const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
            })
            .catch(() => {
                alert('Couldnt get mail...')
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.mailId])

    if (isLoading) return <h3>Loading...</h3>
    return (
        <section>
            <header>
                <Link to="/mail"><button>Back to Inbox</button></Link>
            </header>
            <div className="mail-details">
                <h3>{mail.subject}</h3>
                <h3>{mail.from}</h3>
                <p>{mail.body}</p>
            </div>
        </section>
    )
}