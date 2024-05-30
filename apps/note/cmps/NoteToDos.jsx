const { useState} = React

export function NoteTodos({note}){
    const {info} = note
    const {todos} = info

    
    function isTodoChecked(key){
        return (typeof(todos[key]) === 'number') ? `assets/img/checkbox-checked.svg` : `assets/img/checkbox-unchecked.svg`


    }
    
    
    return <section className="note-todos">
                <h2>{note.info.title}</h2>
                <ul className="to-do-list"> 
                     
                   {(todos.todo1) && <li>
                        <span><img height="18" src={isTodoChecked('doneAt1')} alt="" /></span>
                        {todos.todo1}
                                     </li> } 

                   {(todos.todo2) && <li>
                        <span><img height="18" src={isTodoChecked('doneAt2')} alt="" /></span> 
                        {todos.todo2}                                    
                                     </li> } 

                   {(todos.todo3) && <li>
                            <span><img height="18" src={isTodoChecked('doneAt3')} alt="" /></span>  
                            {todos.todo3}
                                     </li> } 

                   {(todos.todo4) && <li>
                            <span><img height="18" src={isTodoChecked('doneAt4')} alt="" /></span> 
                                        {todos.todo4}
                                     </li> }

                   {(todos.todo5) && <li>
                            <span><img height="18" src={isTodoChecked('doneAt5')} alt="" /></span> 
                                        {todos.todo5}
                                     </li> } 
                    
                    </ul>

                    
            </section>
                  
}