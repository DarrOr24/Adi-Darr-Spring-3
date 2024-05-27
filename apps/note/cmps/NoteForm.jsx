export function NoteForm({note, handleChangeInfo, onSave}){

    const isNoteTxt = (note.type === 'NoteTxt')
    const isNoteImg = (note.type === 'NoteImg')


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

           {isNoteTxt && <textarea
                name="txt"
                type="txt" 
                placeholder="Take a note..."
                cols='20'
                rows='4'
                value={note.info.txt}
                onChange={handleChangeInfo}
            ></textarea> } 

            {isNoteImg && <img height="150" src={note.info.url} alt="" />}

            <button>Close</button>
        </form>    
    </section >

}