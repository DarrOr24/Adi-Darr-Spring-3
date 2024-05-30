import { utilService } from "../../../services/util.service.js"

export function NoteTodos({note}){

    
    const {info} = note
    const {todos} = info
    

    function keyCount(){
        const uniqueKey =  utilService.makeId()
        return uniqueKey
    }

    return <section className="note-todos">
                <h2>{note.info.title}</h2>
                <ul className="to-do-list"> 
                    {todos.map(todo => 
                    <li  key={keyCount()}   >
                        <span>☑️</span>{todo.txt}
                    </li>)}
                    </ul>
            </section>
                  
}