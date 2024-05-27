
export function NoteImgAdd({note, handleChangeInfo, onSave}){
  
    return <section className = "note-img-add">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} 
                value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

            {(note.info.url) && <img src={note.info.url} alt="" />    }

            <label htmlFor="url">Enter an https:// URL:</label>
           <input
                onChange={handleChangeInfo} 
                value={note.info.url}
                id="url" 
                name="url"
                type="url" 
                placeholder="https://example.com"
                // pattern="https://.*" size="30" required
                pattern="https://.*" size="30" 
            /> 

            

            <button>Close</button>
            
        </form>    
    </section >
    
}
  
