import { utilService } from "../../../services/util.service.js"

export function NoteTodos({note}){

    
    const {info} = note
    const {todos} = info
    

    // function keyCount(){
    //     const uniqueKey =  utilService.makeId()
    //     return uniqueKey
    // }

    // return <section className="note-todos">
    //             <h2>{note.info.title}</h2>
    //             <ul className="to-do-list"> 
    //                 {todos.map(todo => 
    //                 <li  key={keyCount()}   >
    //                     <span>☑️</span>{todo.txt}
    //                 </li>)}
    //                 </ul>
    //         </section>
    return <section className="note-todos">
                <h2>{note.info.title}</h2>
                <ul className="to-do-list"> 
                     
                   {(todos.todo1) && <li>
                                        <span>☑️</span>{todos.todo1}
                                     </li> } 
                   {(todos.todo2) && <li>
                                        <span>☑️</span>{todos.todo2}
                                     </li> } 
                   {(todos.todo3) && <li>
                                        <span>☑️</span>{todos.todo3}
                                     </li> } 
                   {(todos.todo4) && <li>
                                        <span>☑️</span>{todos.todo4}
                                     </li> } 
                   {(todos.todo5) && <li>
                                        <span>☑️</span>{todos.todo5}
                                     </li> } 
                    



                    </ul>
            </section>
                  
}