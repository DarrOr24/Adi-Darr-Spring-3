const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'

export function MailIndex() {
    
    const [ emails, setEmails ] = useState([])

    useEffect(() => {
        mailService.query()
            .then(emails => setEmails(emails))
    }, [])

    function removeEmail(emailId) {
        mailService.remove(emailId)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    return (
        <section className="mail-index">
            <MailHeader />
            <main>
                <section className="side-menu">Side Menu</section>
                <section className="mail-list">
                    <MailList emails={emails} onRemove={removeEmail} />
                </section>
            </main>
        </section>
    )
}

