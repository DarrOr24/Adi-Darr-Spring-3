export function NoteForm({note, handleChangeInfo, onSave}){
    return <section className = "note-form">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} 
                value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            <textarea
                name="txt"
                type="txt" 
                placeholder="Take a note..."
                cols='20'
                rows='10'
                value={note.info.txt}
                onChange={handleChangeInfo}
            ></textarea>

            <button>Close</button>
        </form>    
    </section >

}