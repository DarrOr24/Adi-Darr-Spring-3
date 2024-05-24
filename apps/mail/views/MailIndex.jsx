const { useState, useEffect } = React
// const { Outlet, useSearchParams } = ReactRouterDOM
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

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])

    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailHeader />
            <MailFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <main>
                <section className="mail-side-menu">
                    <MailSideMenu />
                </section>
                <section className="mail-list">
                    {/* <Outlet context={{ mails, removeMail }} /> */}
                    <Routes>
                        <Route path="/" element={<MailList mails={mails} removeMail={removeMail} />} />
                        <Route path=":mailId" element={<MailDetails />} />
                    </Routes>
                    {/* <MailList mails={mails} onRemove={removeMail} /> */}
                </section>
            </main>
        </section>
    )
}

