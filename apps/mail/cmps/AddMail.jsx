const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { mailService } from "../services/mail.service.js"

export function AddMail() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    
    // const params = useParams()
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     if(!params.mailId) return

    //     mailService.get(params.mailId)
    //         .then((mail) => {
    //         setMail(mail)
            // console.log('mail:', mail)
    //     })
    // }, [])

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
            .finally(() => navigate('/mail'))
    }

    return (
        <section className="add-mail">
            <form onSubmit={onSave} className='add-form'>
                <div className='mail-modal'>
                    <h2>New Massage</h2>
                    <button className='btn-toggle-modal'>x</button>
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
}