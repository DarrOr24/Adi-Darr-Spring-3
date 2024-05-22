import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 20; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(20),
                isRead: Math.random() > 0.7,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }
            mails.push(mail)
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}