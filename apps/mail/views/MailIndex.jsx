const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailSideMenu } from '../cmps/MailSideMenu.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailCompose2 } from '../cmps/MailCompose2.jsx'

export function MailIndex() {

    const [ mails, setMails ] = useState([])
    const [ filterBy, setFilterBy ] = useState({status:'inbox'})
    const [unreadCount, setUnreadCount] = useState(0)
    const [sortBy, setSortBy] = useState('date')
    const [showCompose, setShowCompose] = useState(false)
    const [mailType, setMailType] = useState('inbox')
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()
    

    useEffect(() => {
        console.log('filterBy:', filterBy)
        const criteria = { ...filterBy ,sortBy }
        mailService.query(criteria)
            .then(mails => setMails(mails))
           
        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))
    }, [filterBy, sortBy])


    function removeMail(mailId) {
        setIsLoading(true)
        mailService.moveToTrash(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                mailService.countUnreadInboxMails()
                    .then(count => setUnreadCount(count))
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(()=>setIsLoading(false))
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

    function onSetSortBy(newSortBy) {
        setSortBy(newSortBy)
    }

    function onComposeMail(){
        setShowCompose(true)
        // navigate(`/mail/compose`)
    }

    function closeCompose(){
        setShowCompose(false)
        navigate(`/mail`)
    }

    function setMailStatus(status){
        setMailType(status)
        
        if (status === 'inbox') {
            setFilterBy(prevFilterBy => ({...prevFilterBy, status: 'inbox'}) )
        } else if (status === 'sent') {
            setFilterBy(prevFilterBy => ({...prevFilterBy, status: 'sent'}) )
        } else if (status === 'trash') {
            setFilterBy(prevFilterBy => ({...prevFilterBy, status: 'trash'}) )
        }

    }

    function saveNewMail(mailFromCompose){
        setMails(prevMails => [...prevMails, mailFromCompose])
        setShowCompose(false)
        navigate(`/mail`)

    }

   
    if (isLoading) return <div className="loader"></div>
    else return (
        <section className="mail-index full">
            <header className="mail-header">
                {/* <img src="assets/img/hamburger.svg" alt="" /> */}
                <img src="assets/img/gmail.svg"></img>
                <h1>Gmail</h1>
                <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} onSort={onSetSortBy}/>
            </header>
            <main>
                <MailSideMenu unreadCount={unreadCount}  handleComposeClick={onComposeMail} onSetStatus={setMailStatus}  />
                <MailList mails = {mails} removeMail={removeMail} toggleReadStatus={toggleReadStatus} /> 
                {showCompose && <MailCompose2 onComposeMail={saveNewMail} onClose={closeCompose}/>}
            </main>
        </section>
    )
}

