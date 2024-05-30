import { noteService } from "../services/note.service.js"

const { useState, useRef} = React


export function NoteToDosAdd({note: incomingNote,  onSaveTodosNote}){

    const [ note, setNote ] =useState(incomingNote)
    const [ listItem1, setListItem1 ] = useState(false)
    const [ listItem2, setListItem2 ] = useState(false)
    const [ listItem3, setListItem3 ] = useState(false)
    const [ listItem4, setListItem4 ] = useState(false)
    const [ listItem5, setListItem5 ] = useState(false)

    const noteTitle = useRef()
    const item1 = useRef()
    const item2 = useRef()
    const item3 = useRef()
    const item4 = useRef()
    const item5 = useRef()
    


    function openListItem(){
        setListItem1(true)
        if (listItem1) setListItem2(true)
        if (listItem2) setListItem3(true)
        if (listItem3) setListItem4(true)
        if (listItem4) setListItem5(true)
    }

    function onSubmit(ev){
        ev.preventDefault()
        console.log(item1.current.value)
        const todoTitle = noteTitle.current.value

        const todo1 = {'txt': item1.current.value}
        const todo2 = {'txt': item2.current.value}
        const todo3 = {'txt': item3.current.value}
        const todo4 = {'txt': item4.current.value}
        const todo5 = {'txt': item5.current.value}
        const todosArr = [todo1, todo2, todo3, todo4, todo5]
        
        setNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, 'title': todoTitle, 'todos': todosArr }
        }))

        noteService.save({...note, info: {...note.info, 'title': todoTitle, 'todos': todosArr}})
            .then(onSaveTodosNote)
    }

    
    return <section className = "note-form list">
        <form onSubmit = {onSubmit}>
           
            <input
                ref={noteTitle} 
                placeholder="Title"
                 />

            {listItem1 && <div>
                <input type="checkbox"/>
                <input
                 ref={item1}
                placeholder="List item"
                />
            </div>} 

            {listItem2 && <div>
                <input type="checkbox"/>
                <input
                ref={item2}
                placeholder="List item"
                />
            </div>}            
            {listItem3 && <div>
                <input type="checkbox"/>
                <input
                ref={item3}
                placeholder="List item"
                />
            </div>}            
            {listItem4 && <div>
                <input type="checkbox"/>
                <input
                ref={item4}
                placeholder="List item"
                />
            </div>}            
            {listItem5 && <div>
                <input type="checkbox"/>
                <input
                ref={item5}
                placeholder="List item"
                />
            </div>}            
                
            <div onClick={openListItem}>+</div>

            <button>Close</button>
        </form>    
    </section >

}