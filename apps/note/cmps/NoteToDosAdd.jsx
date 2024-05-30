const { useState } = React


export function NoteToDosAdd({note, handleChangeInfo, onSave}){

    const [ listItem1, setListItem1 ] = useState(false)
    
    function openListItem(){
        console.log('hi')
        setListItem1(true)
    }


    return <section className = "note-form list">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} 
                value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            
            
            {listItem1 && <div>
                <input type="checkbox"/>
                <input
                onChange={handleChangeInfo} 
                
                id="title" 
                name="todos"
                type="text" 
                placeholder="List item"
                />
            </div>}            
                
            <div onClick={openListItem}>+</div>

            <button>Close</button>
        </form>    
    </section >

}