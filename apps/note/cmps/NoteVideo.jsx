export function NoteVideo({note}){

   
    return <section className="note-video">
                <h2>{note.info.title}</h2>
                
                <iframe  width="360" height="200px" src={note.info.url}></iframe>
                
        </section>
                  
                        
}