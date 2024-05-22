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
        const noteTitles = ['Shopping List', 'Workout schedule', 'Passwords', 'Cookies', 'Important']

        const coral = '#faafa8'
        const peach = '#f39f76'
        const sand = '#fff8b8'
        const mint = '#e2f6d3'
        const sage = '#b4ddd3'
        const fog =  '#d4e4ed'
        const storm= '#aeccdc'
        const dusk= '#d3bfdb'
        const blossom= '#f6e2dd'
        const clay= '#e9e3d4'
        const chalk= '#efeff1'
        const white = 'white'
        const noteColors = [chalk, white, storm, clay, white]
      
        for (let i = 0; i < 5; i++){
            const noteTitle = noteTitles[i]
            const noteColor =noteColors[i]
            notes.push(_createNote('NoteTxt', false, {'backgroundColor': noteColor}, {'title': noteTitle, 'txt': utilService.makeLorem(20)}))
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


