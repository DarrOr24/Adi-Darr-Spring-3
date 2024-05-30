import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const {  useNavigate,useParams, useSearchParams } = ReactRouterDOM

export function MailCompose2({onComposeMail, onClose}){
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [searchParams, setSearchParams] = useSearchParams()
    const [noteMailContent, setNoteMailContent] = useState({ subject: '', body: '' })
    
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        navigate(`/mail/compose`)
        const subject = searchParams.get('subject') || ''
        const body = searchParams.get('body') || ''
        setMail(prevMail => ({ ...prevMail, subject, body }))
    }, [])

    useEffect(() => {
        const updatedMail = mailService.getMailFromSearchParams(searchParams)
        setNoteMailContent(updatedMail)
    }, [searchParams])

    useEffect(() => {
        if (mail.subject || mail.body) {
            setSearchParams({ subject: mail.subject, body: mail.body })
        }
    }, [mail.subject, mail.body])

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setMail(prevMail => ({ ...prevMail, [prop]: value }))
    }

    function onSave(ev) {
        ev.preventDefault()
        console.log(mail)
        if(!mail.to) {
            console.log('Please specify at least one recipient.')
            return
        }
        mailService.save(mail)
            .then((savedMail) => onComposeMail(savedMail))
            .then(() => console.log('Mail has successfully saved!'))
            .catch(() => console.log(`couldn't save mail`))
            
    }

    function closeForm() {
        onClose()
    }

    function sendNote(){
        const noteContent = {
            title: mail.subject,
            txt: mail.body,
        }
        console.log('noteContent:', noteContent)

        navigate(`/note/add?title=${mail.subject}&body=${mail.body}`)
    
        setNoteMailContent({subject: '', body: ''})
        closeForm()
    }

    

    return (
        <section className="mail-compose">
            <form onSubmit={onSave} className='mail-form'>
                <div className='mail-modal'>
                    <h2>New Message</h2>
                    <button type="button" className='btn-close' onClick={closeForm}>x</button>
                    <div className="mail-input">
                        <label htmlFor="to">To </label>
                        <input onChange={handleChange} value={mail.to}
                            id='to' type="text" name='to' />
                    </div>

                    <input className="mail-input" onChange={handleChange} value={mail.subject}
                        id='subject' type="text" name='subject' placeholder="Subject"/>

                    <textarea
                            name='body'
                            cols='30'
                            rows='10'
                            value={mail.body}
                            onChange={handleChange}
                        ></textarea>
                    <div className="btn-send-compose">
                        <button type="submit" className="btn-send">Send</button>
                        <button type="button" className="btn-send" onClick={sendNote}>Send as a note</button>
                    </div>
                </div>
            </form>
        </section>
    )
}