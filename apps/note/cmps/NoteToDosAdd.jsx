const { useState } = React


export function NoteToDosAdd({note, handleChangeInfo, onSave, onHandleTodos}){

    const noteToEdit = note

    const todosLength = noteToEdit.info.todos.length
    
    const [ todosObj, setTodosObj ] = useState({})
   
    const [ listItem1, setListItem1 ] = useState((todosLength>=1) ? true : false)
    const [ listItem2, setListItem2 ] = useState((todosLength>=2) ? true : false)
    const [ listItem3, setListItem3 ] = useState((todosLength>=3) ? true : false)
    const [ listItem4, setListItem4 ] = useState((todosLength>=4) ? true : false)
    const [ listItem5, setListItem5 ] = useState((todosLength>=5) ? true : false)


    
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
                value = (target.checked) ? Date.now() : 'no'
                break;
        }
         
        setTodosObj(prevTodosObj => (
                {...prevTodosObj, [prop]: value }
            ))


           
        console.log(todosObj)
        console.log('darr')
        
        
        
        
        
        
        onHandleTodos(todosObj)  
    }
        
           
    return <section className = "note-form list">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} 
                value={noteToEdit.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            {listItem1 && <div>
                <input type="checkbox"
                onChange={handleChangeTodo} 
                id="doneAt1" 
                name="doneAt1"
                
                />
                <input
                onChange={handleChangeTodo} 
                // value={(todosLength>=1) ? noteToEdit.info.todos[0].txt : ''}
                id="todo1" 
                name="todo1"
                type="text" 
                placeholder={(todosLength>=1) ? note.info.todos[0].txt : 'List item'}/>
            </div>} 

            {listItem2 && <div>
                <input type="checkbox"
                onChange={handleChangeTodo} 
                id="doneAt2" 
                name="doneAt2"
                
                />
                <input
                onChange={handleChangeTodo} 
                // value={(todosLength>=1) ? noteToEdit.info.todos[0].txt : ''}
                id="todo2" 
                name="todo2"
                type="text" 
                placeholder={(todosLength>=2) ? note.info.todos[0].txt : 'List item'}/>
            </div>} 

          

            {listItem3 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={(todosLength>=3) ? note.info.todos[2].txt : ''}
                id="todo3" 
                name="todo3"
                type="text" 
                placeholder="List item"/>
            </div>} 

            {listItem4 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={(todosLength>=4) ? note.info.todos[3].txt : ''}
                id="todo4" 
                name="todo4"
                type="text" 
                placeholder="List item"/>
            </div>} 

            {listItem5 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeTodo} 
                // value={(todosLength>=5) ? note.info.todos[4].txt : ''}
                id="todo5" 
                name="todo5"
                type="text" 
                placeholder={(todosLength>=5) ? note.info.todos[4].txt : 'List item'}/>
            </div>}            
                      
                
            <div className="add-list-item" onClick={openListItem}>+</div>

            <button>Close</button>
        </form>    
    </section >

}