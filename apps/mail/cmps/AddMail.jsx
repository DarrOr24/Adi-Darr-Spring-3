// const { useState, useEffect } = React
// const { useParams, useNavigate } = ReactRouter

// import { mailService } from "../services/mail.service"

export function AddMail() {
    // const [mail, setMail] = useState(mailService.getEmptyMail())
    // const params = useParams()
    // const navigate = useNavigate()

    // function handleChange({ target }) {
    //     const { type, name: prop } = target
    //     let { value } = target

    //     switch (type) {
    //         case 'range':
    //         case 'number':
    //             value = +value
    //             break;

    //         case 'checkbox':
    //             value = target.checked
    //             break;
    //     }
    //     setMail(prevMail => ({ ...prevMail, [prop]: value }))
    // }

    // function onSave(ev) {
    //     ev.preventDefault()
    //     mailService.save(mail)
    // }

    return (
        <section className="add-mail">
            add mail
            <h2>New Massage</h2>
            {/* <form onSubmit={onSave}>
                <label className='bold-txt' htmlFor="to">To: </label>
                <input onChange={handleChange} value={to}
                    id='to' type="text" name='to' />

                <label className='bold-txt' htmlFor="subject">Subject: </label>
                <input onChange={handleChange} value={subject}
                    id='subject' type="text" name='subject' />

                <textarea
                        name='txt'
                        cols='30'
                        rows='10'
                        value={txt}
                        onChange={handleChange}
                    ></textarea>

                <button>Save</button>
            </form> */}
        </section>
    )
}