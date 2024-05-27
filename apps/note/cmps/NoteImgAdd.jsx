
export function NoteImgAdd({note, handleChangeInfo, onSaveNoteImg, onReturn}){
  
    return <section className = "note-img-add">
        <form onSubmit = {onSaveNoteImg}>
           
            <input
                onChange={handleChangeInfo} 
                value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            <label htmlFor="url">Enter an https:// URL:</label>
           <input
                onChange={handleChangeInfo} 
                value={note.info.url}
                id="url" 
                name="url"
                type="url" 
                placeholder="https://example.com"
                pattern="https://.*" size="30" required
            /> 

            

            <button>Save</button>
            <button onClick={onReturn} type="button">Return</button>
        </form>    
    </section >
    
}
  
