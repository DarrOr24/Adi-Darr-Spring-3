const { useState} = React


export function NoteToDosAdd({note: incomingNote, handleChangeInfo, onSave, onHandleTodos}){

    
    const [ todosObj, setTodosObj ] = useState({})
   
    const [ listItem1, setListItem1 ] = useState(false)
    const [ listItem2, setListItem2 ] = useState(false)
    const [ listItem3, setListItem3 ] = useState(false)
    const [ listItem4, setListItem4 ] = useState(false)
    const [ listItem5, setListItem5 ] = useState(false)

    
    function openListItem(){
        setListItem1(true)
        if (listItem1) setListItem2(true)
        if (listItem2) setListItem3(true)
        if (listItem3) setListItem4(true)
        if (listItem4) setListItem5(true)
    }

    function handleChangeTodo({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
         
        setTodosObj(prevTodosObj => (
                {...prevTodosObj, [prop]: value }
            ))

        const todosArr = Object.values(todosObj).map(value => value = {'txt': value})

        onHandleTodos(todosArr)   
    }
        
           
    return <section className = "note-form list">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} 
                // value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            {listItem1 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={note.info.todos[0].txt}
                id="todo1" 
                name="todo1"
                type="text" 
                placeholder="List item"/>
            </div>} 

            {listItem2 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={note.info.todos[1].txt}
                id="todo2" 
                name="todo2"
                type="text" 
                placeholder="List item"/>
            </div>} 

            {listItem3 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={note.info.todos[1].txt}
                id="todo3" 
                name="todo3"
                type="text" 
                placeholder="List item"/>
            </div>} 

            {listItem4 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={note.info.todos[1].txt}
                id="todo4" 
                name="todo4"
                type="text" 
                placeholder="List item"/>
            </div>} 

            {listItem5 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={note.info.todos[1].txt}
                id="todo5" 
                name="todo5"
                type="text" 
                placeholder="List item"/>
            </div>}            
                      
                
            <div onClick={openListItem}>+</div>

            <button>Close</button>
        </form>    
    </section >

}