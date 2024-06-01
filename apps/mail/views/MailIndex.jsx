const { useState, useEffect } = React
const { useSearchParams, useParams, useNavigate, Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailSideMenu } from '../cmps/MailSideMenu.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const [ mails, setMails ] = useState([])
    const [ filterBy, setFilterBy ] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [ status, setStatus ] = useState(params.status || 'inbox')
    const [unreadCount, setUnreadCount] = useState(0)
    const [sortBy, setSortBy] = useState('date')
    const [ newMail, setNewMail ] = useState(mailService.getEmptyMail())
    const [showCompose, setShowCompose] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        setSearchParams(filterBy)
        const criteria = { ...filterBy ,status, sortBy }
        mailService.query(criteria)
            .then(mails => setMails(mails))

        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))
    }, [filterBy, status, sortBy])

    useEffect(() => {
        if (params.status) setStatus(params.status)
    }, [params.status])

    useEffect(() => {
        if (searchParams.has('compose')) {
            setShowCompose(true)
        } else {
            setShowCompose(false)
        }
    }, [])

    
    function removeMail(mailId) {
        // setIsLoading(true)
        mailService.moveToTrash(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                mailService.countUnreadInboxMails()
                    .then(count => setUnreadCount(count))
            })
            .catch(err => {
                console.log('err:', err)
            })
            // .finally(()=>setIsLoading(false))
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
                console.log('Mail has successfully saved!')
            })
            .catch(() => {
                console.log(`Couldn't save mail`)
            })
    }
    
    function toggleStarredStatus(mailId){
        const mail = mails.find(mail => mail.id === mailId)
        if (!mail) return
        
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        mailService.save(updatedMail)
            .then(savedMail => {
                setMails(prevMails => prevMails.map(mail => mail.id === savedMail.id ? savedMail : mail))
                console.log('Mail has successfully saved!')
            })
            .catch(() => {
                console.log(`Couldn't save mail`)
            })
    }
    
    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({...prevFilter, ...newFilter}))
    }

    function onSetStatus(newStatus) {
        setStatus(newStatus)
        navigate(`/mail/${newStatus}`)
    }

    function onSetSortBy(newSortBy) {
        setSortBy(newSortBy)
    }

    function onSetNewMail(newMail){
        setNewMail(prevMail => ({...prevMail, ...newMail}))
    }

    function onSaveMailCompose(ev) {
        ev.preventDefault()
        if(!newMail.to) {
            console.log('Please specify at least one recipient.')
            return
        }

        mailService.save(newMail)
            .then(() => console.log('Mail has successfully saved!', newMail))
            .catch(() => console.log(`couldn't save mail`))
            .finally(() => closeCompose())
    }

    

    function onShowCompose(isShowCompose) {
        if (isShowCompose) {
            setNewMail(mailService.getEmptyMail())
        }
        setShowCompose(isShowCompose)
    }
    
    function closeCompose(){
        searchParams.delete('compose')
        searchParams.delete('subject')
        searchParams.delete('body')
        setSearchParams(searchParams)
        setShowCompose(false)
    }

    if (!mails) return <div>Loading...</div>

    // if (isLoading) return <div className="loader"></div>
    return (
        <section className="mail-index">
            <header className="mail-header">
                <img src="assets/img/gmail.svg"></img>
                <h1>Gmail</h1>
                <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} onSort={onSetSortBy}/>
            </header>
            <main>
                <MailSideMenu unreadCount={unreadCount} onSetStatus={onSetStatus} onShowCompose={onShowCompose}/>
                <Outlet context={{
                    mails,
                    removeMail,
                    toggleReadStatus,
                    toggleStarredStatus,
                    sortBy,
                    status,
                }} />
            </main>
            {showCompose && <MailCompose newMail={newMail} onNewMail={onSetNewMail} onSaveMailCompose={onSaveMailCompose} onCloseCompose={closeCompose} />}
        </section>
    )
}

