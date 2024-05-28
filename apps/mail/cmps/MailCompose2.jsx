import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const {  useNavigate } = ReactRouterDOM

export function MailCompose2({onClose}){

    

    const [mail, setMail] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    // const navigate = useNavigate()
    useEffect(() => {
        navigate(`/mail/compose`)
    }, [])

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
        mailService.save(mail)
            .then(() => console.log('Mail has successfully saved!'))
            .catch(() => console.log(`couldn't save mail`))
            .finally(() => closeForm())
    }


    function closeForm() {
        onClose()
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

                    <button className="btn-send">Send</button>
                </div>
            </form>
        </section>
    )
    // return <h2 className="darr">Mail Compose 2</h2>
}