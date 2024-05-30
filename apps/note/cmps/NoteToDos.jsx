export function NoteTodos({note}){

    const {info} = note
    const {todos} = info
    return <section className="note-todos">
                <h2>{note.info.title}</h2>
                <ul className="to-do-list"> 
                    {todos.map(todo => 
                    <li  key={note.id }   >
                        <span>☑️</span>{todo.txt}
                    </li>)}
                    </ul>
            </section>
                  
}