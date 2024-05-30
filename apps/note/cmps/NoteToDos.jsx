export function NoteTodos({note}){

    const {info} = note
    const {todos} = info
    return <section className="note-text">
                <h2>{note.info.title}</h2>
                <ul> 
                    {todos.map(todo => 
                    <li  key={note.id }   >
                        {todo.txt}
                    </li>)}
                    </ul>
            </section>
                  
}