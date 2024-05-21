import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'
_createEmails()

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regExp.test(email.subject))
            }
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    
    if (!emails || !emails.length) {
        emails = []
        for (let i = 0; i < 20; i++) {
            const email = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(20),
                isRead: false,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }
            emails.push(email)
        }
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}