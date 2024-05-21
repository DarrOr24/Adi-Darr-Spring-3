import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    // get,
    // remove,
    // save,
}

window.ns = noteService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }

            // if (filterBy.minSpeed) {
            //     notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
            // }

            return notes
        })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length){
        notes = []
        const noteTitles = ['Note1', 'Note2', 'Note3', 'Note4', 'Note5']
        for (let i = 0; i < 5; i++){
            const noteTitle = noteTitles[i]
            notes.push(_createNote('NoteTxt', false, {'backgroundColor': utilService.getRandomColor()}, {'title': noteTitle, 'txt': utilService.makeLorem(20)}))
        }
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function _createNote(type, isPinned, style, info){
    const note = {
                    id:  utilService.makeId(),        
                    type, 
                    isPinned, 
                    style, 
                    info
                }
   return note
}


