import { MailFilter } from './MailFilter.jsx'

export function MailHeader() {
    return (
        <header className="mail-header">
            <img src="assets/img/hamburger.svg" alt="" />
            <img src="assets/img/gmail.svg"></img>
            <h1>Gmail</h1>
            <MailFilter/>
        </header>
    )
}