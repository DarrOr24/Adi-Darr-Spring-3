export function NoteToDos({note, onSave}){

    function handleChangeTodo(){
        console.log('Todos')
    }

    return <section className = "note-form list">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeTodo} 
                value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            <div>
            <input
                onChange={handleChangeTodo} 
                
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />
            </div>

            
            <button>Close</button>
        </form>    
    </section >

}