const { useState, useEffect } = React
const { Routes, Route, useSearchParams, useNavigate, useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailSideMenu } from '../cmps/MailSideMenu.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [ mails, setMails ] = useState([])
    const [ filterBy, setFilterBy ] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [ status, setStatus ] = useState('inbox')
    const [unreadCount, setUnreadCount] = useState(0)
    const [sortBy, setSortBy] = useState('date')
    // const [showCompose, setShowCompose] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     console.log('filterBy Index:', filterBy)
    //     const criteria = { ...filterBy ,sortBy }
    //     mailService.query(criteria)
    //         .then(mails => setMails(mails))
           
    //     mailService.countUnreadInboxMails()
    //         .then(count => setUnreadCount(count))
    // }, [filterBy, sortBy])

    useEffect(() => {
        setSearchParams(filterBy)
        const criteria = { ...filterBy ,status, sortBy }
        mailService.query(criteria)
            .then(mails => setMails(mails))

        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))
    }, [filterBy, status, sortBy])

    // useEffect(() => {
    //     if (searchParams.has('subject') || searchParams.has('body')) {
    //         setShowCompose(true)
    //     } else {
    //         setShowCompose(false)
    //     }
    // }, [])

    // function removeMail(mailId) {
    //     setIsLoading(true)
    //     mailService.moveToTrash(mailId)
    //         .then(() => {
    //             setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
    //             mailService.countUnreadInboxMails()
    //                 .then(count => setUnreadCount(count))
    //         })
    //         .catch(err => {
    //             console.log('err:', err)
    //         })
    //         .finally(()=>setIsLoading(false))
    // }
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

    // function toggleReadStatus(mailId) {
    //     const mail = mails.find(mail => mail.id === mailId)
    //     if (!mail) return

    //     const updatedMail = { ...mail, isRead: !mail.isRead }

    //     mailService.save(updatedMail)
    //         .then(savedMail => {
    //             setMails(prevMails => prevMails.map(mail => mail.id === savedMail.id ? savedMail : mail))
    //             mailService.countUnreadInboxMails()
    //                 .then(count => setUnreadCount(count))
    //             console.log('Mail has successfully saved!', savedMail)
    //         })
    //         .catch(() => {
    //             console.log(`Couldn't save mail`)
    //         })
    // }

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
    

    // function toggleStarredStatus(mailId){
    //     console.log('mailId:', mailId)
    //     const mail = mails.find(mail => mail.id === mailId)
    //     if (!mail) return
        
    //     const updatedMail = { ...mail, isStarred: !mail.isStarred }

    //     mailService.save(updatedMail)
    //         .then(savedMail => {
    //             setMails(prevMails => prevMails.map(mail => mail.id === savedMail.id ? savedMail : mail))
    //             console.log('Mail has successfully saved!', savedMail)
    //         })
    //         .catch(() => {
    //             console.log(`Couldn't save mail`)
    //         })
    // }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({...prevFilter, ...newFilter}))
        // setFilterBy(newFilter)
    }

    function onSetStatus(newStatus) {
        setStatus(newStatus)
        navigate(`/mail/${newStatus}`)
    }

    function onSetSortBy(newSortBy) {
        setSortBy(newSortBy)
    }
    
    // function onComposeMail(){
    //     setShowCompose(true)
    //     // navigate(`/mail/compose`)
    // }
    
    // function closeCompose(){
    //     setShowCompose(false)
    //     navigate(`/mail`)
    // }
    
    // function setMailStatus(status) {
    //     setFilterBy(prevFilterBy => ({...prevFilterBy, status}))
    // }
    
    // function saveNewMail(mailFromCompose){
    //     setMails(prevMails => [...prevMails, mailFromCompose])
    //     setShowCompose(false)
    //     navigate(`/mail`)

    // }

    if (!mails) return <div>Loading...</div>

    const showCompose = searchParams.get('compose') === 'new'

    // if (isLoading) return <div className="loader"></div>
    return (
        <section className="mail-index">
            <header className="mail-header">
                <img src="assets/img/hamburger.svg" alt="" />
                <img src="assets/img/gmail.svg"></img>
                <h1>Gmail</h1>
                <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} onSort={onSetSortBy}/>
            </header>
            {/* <main>
                <MailSideMenu unreadCount={unreadCount}  handleComposeClick={onComposeMail} onSetStatus={setMailStatus}  />
                <MailList mails = {mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus} toggleSraredStatus={toggleSraredStatus}/> 
                {showCompose && <MailCompose onComposeMail={saveNewMail} onClose={closeCompose}/>}
            </main> */}
            <main>
                <MailSideMenu unreadCount={unreadCount} onSetStatus={onSetStatus} />
                <Routes>
                    <Route path="/" element={<MailList mails={mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus} status={status} sortBy={sortBy}/>} />
                    <Route path=":status" element={<MailList mails={mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus} status={status} sortBy={sortBy}/>} />
                    <Route path=":status/:mailId" element={<MailDetails toggleReadStatus={toggleReadStatus} status={status}/>} />
                </Routes>
            </main>
            {showCompose && <MailCompose />}
        </section>
    )
}

