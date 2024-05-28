const { useState, useEffect } = React
const { Routes, Route, useSearchParams, useNavigate, useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailSideMenu } from '../cmps/MailSideMenu.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    
    const [ mails, setMails ] = useState([])
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ filterBy, setFilterBy ] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [ status, setStatus ] = useState('inbox')
    const [unreadCount, setUnreadCount] = useState(0)
    const [sortBy, setSortBy] = useState('date')
    const navigate = useNavigate()
    

    useEffect(() => {
        setSearchParams(filterBy)
        const criteria = { ...filterBy ,status, sortBy }
        mailService.query(criteria)
            .then(mails => setMails(mails))
        
        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))
    }, [filterBy, status, sortBy])
    

    function removeMail(mailId) {
        mailService.moveToTrash(mailId)
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
        navigate(`/mail/${newStatus}`)
    }

    function onSetSortBy(newSortBy) {
        setSortBy(newSortBy)
    }

    if (!mails) return <div>Loading...</div>

    const showCompose = searchParams.get('compose') === 'new'

    return (
        <section className="mail-index full">
            <header className="mail-header">
                {/* <img src="assets/img/hamburger.svg" alt="" /> */}
                <img src="assets/img/gmail.svg"></img>
                <h1>Gmail</h1>
                <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} onSort={onSetSortBy}/>
            </header>
            <main>
                <section className="mail-side-menu">
                    <MailSideMenu unreadCount={unreadCount} onSetStatus={onSetStatus} />
                </section>
                <section className="mail-list">
                    <Routes>
                        <Route path=":status" element={<MailList mails={mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus} status={status} sortBy={sortBy}/>} />
                        <Route path=":status/:mailId" element={<MailDetails toggleReadStatus={toggleReadStatus} status={status}/>} />
                    </Routes>
                </section>
            </main>
            {showCompose && <MailCompose />}
        </section>
    )
}

