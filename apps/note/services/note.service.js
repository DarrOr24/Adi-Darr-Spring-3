import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    sortNotes,
    get,
    remove,
    save
}

window.ns = noteService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.title ) || regExp.test(note.info.txt))
                
            }

            notes = sortNotes(notes)
            
            return notes
        })
}

function sortNotes(notesArr){
    const pinnedNotes = notesArr.filter(note => note.isPinned === true)
    pinnedNotes.sort((note2, note1) => note1.pinTime - note2.pinTime)
    const unpinnedNotes =notesArr.filter(note => note.isPinned === false)
    unpinnedNotes.sort((note1, note2) => note1.time - note2.time)
    console.log(unpinnedNotes)
    return [...pinnedNotes, ...unpinnedNotes]
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
      
        for (let i = 0; i < 2; i++){
            const noteTitle = noteTitles[i]
            const noteColor =noteColors[i]
            notes.push(_createNote('NoteTxt', false, {'backgroundColor': noteColor}, {'title': noteTitle, 'txt': utilService.makeLorem(20)}, Date.now()+i))
        }

        const url = `assets/img/sweet_noga.png`
        const noteImg = _createNote('NoteImg', true, {'backgroundColor': chalk}, {'url':url, 'title': 'My Sweet Noga'}, Date.now()+2)
        notes.push(noteImg)
     
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function _createNote(type, isPinned, style, info, time = Date.now()){
    const note = {
                    id:  utilService.makeId(),        
                    type, 
                    isPinned, 
                    pinTime: (isPinned)? Date.now() : '',
                    style, 
                    info,
                    time,
                    updatedAt: time
                }
   return note
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    .then(note => {
        // note = _setNextPrevCarId(note)
        return note
    })
   
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        // if(note.isPinned) return storageService.postFirst(NOTE_KEY, note)
        return storageService.post(NOTE_KEY, note)
    }
}


