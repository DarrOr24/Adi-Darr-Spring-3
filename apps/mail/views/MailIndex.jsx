const { useState, useEffect } = React
const { Outlet, useSearchParams, Routes, Route } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
// 
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailSideMenu } from '../cmps/MailSideMenu.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailIndex() {
    
    const [ mails, setMails ] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [ filterBy, setFilterBy ] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [status, setStatus] = useState('inbox')
    const [unreadCount, setUnreadCount] = useState(0)
   

    // useEffect(() => {
    //     setSearchParams(filterBy)
    //     mailService.query(filterBy)
    //         .then(mails => setMails(mails))
    // }, [filterBy])

    useEffect(() => {
        setSearchParams(filterBy)
        const criteria = { ...filterBy, status }
        mailService.query(criteria)
            .then(mails => setMails(mails))
        
        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))
    }, [filterBy, status])

    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                mailService.countUnreadInboxMails()
                    .then(count => setUnreadCount(count))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }


    function toggleReadStatus(mailId) {
        const mail = mails.find(mail => mail.id === mailId)
        if (!mail) return

        const updatedMail = { ...mail, isRead: !mail.isRead }

        mailService.save(updatedMail)
            .then(savedMail => {
                setMails(prevMails => prevMails.map(mail => mail.id === savedMail.id ? savedMail : mail))
                mailService.countUnreadInboxMails()
                    .then(count => setUnreadCount(count))
                console.log('Mail has successfully saved!', savedMail)
            })
            .catch(() => {
                console.log(`Couldn't save mail`)
            })
    }
    

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function onSetStatus(newStatus) {
        setStatus(newStatus)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailHeader />
            <MailFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <main>
                <section className="mail-side-menu">
                    <MailSideMenu unreadCount={unreadCount} onSetStatus={onSetStatus} />
                </section>
                <section className="mail-list">
                    {/* <Outlet context={{ mails, removeMail }} /> */}
                    <Routes>
                        <Route path="/" element={<MailList mails={mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus}/>} />
                        <Route path=":mailId" element={<MailDetails toggleReadStatus={toggleReadStatus}/>} />
                        <Route path="sent" element={<MailList mails={mails} />} />
                        <Route path="sent/:mailId" element={<MailDetails toggleReadStatus={toggleReadStatus} />} />
                        <Route path="trash" element={<MailList mails={mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus} />} /> 
                    </Routes>
                </section>
            </main>
        </section>
    )
}

