const { useState, useEffect } = React
const { Routes, Route, useSearchParams, useNavigate, useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailSideMenu } from '../cmps/MailSideMenu.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailCompose2 } from '../cmps/MailCompose2.jsx'

export function MailIndex() {

    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    
    const [ mails, setMails ] = useState([])
   
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ filterBy, setFilterBy ] = useState(mailService.getFilterFromSearchParams(searchParams))
    
    const [unreadCount, setUnreadCount] = useState(0)
    const [sortBy, setSortBy] = useState('date')
    const [showCompose, setShowCompose] = useState(false)
    const [mailType, setMailType] = useState('inbox')
    const [ mailList, setMailList ] = useState([])

    

    const navigate = useNavigate()
    

    useEffect(() => {

        
        // setSearchParams(filterBy)
        const criteria = { ...filterBy ,sortBy }
        mailService.query(criteria)
            .then(mails => {
                setMails(mails)
                setMailList(mails.filter(mail => mail.to === loggedinUser.email))})
           
        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))

        
    }, [])
    
    useEffect(() => {

        
        // setSearchParams(filterBy)
        const criteria = { ...filterBy ,sortBy }
        mailService.query(criteria)
            .then(mails => {
                setMails(mails)})
           
        mailService.countUnreadInboxMails()
            .then(count => setUnreadCount(count))

        
    }, [filterBy, sortBy])

  

    
    

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


    function onSetSortBy(newSortBy) {
        setSortBy(newSortBy)
    }

    function onComposeMail(){
        setShowCompose(true)
        // navigate(`/mail/compose`)
    }

    if (!mails) return <div>Loading...</div>

    function onCloseCompose(mail){
        console.log(mail)
        setMails([...mails, mail])
        setShowCompose(false)
        navigate(`/mail`)
    }

    function setMailStatus(status){
        console.log('statuts from side menu:',status)
        setMailType(status)
        console.log('mailType', mailType)
        if (status === 'inbox') {
            setMailList(mails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt)) 
        } 
        if (status === 'sent') {
            setMailList(mails.filter(mail => mail.from === loggedinUser.email && !mail.removedAt))
        } 
        if (status === 'trash') {
            setMailList(mails.filter(mail => mail.removedAt))
        }

    }

   
    
    return (
        <section className="mail-index full">
            <header className="mail-header">
                {/* <img src="assets/img/hamburger.svg" alt="" /> */}
                <img src="assets/img/gmail.svg"></img>
                <h1>Gmail</h1>
                <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} onSort={onSetSortBy}/>
            </header>
            <main>
                
                <MailSideMenu unreadCount={unreadCount}  handleComposeClick={onComposeMail} onSetStatus={setMailStatus}  />

               <MailList mails = {mailList} removeMail={removeMail} toggleReadStatus={toggleReadStatus}  /> 
                
                
                
                {showCompose && <MailCompose2 onClose={onCloseCompose}/>}

                
            </main>
           
        </section>
    )
}

