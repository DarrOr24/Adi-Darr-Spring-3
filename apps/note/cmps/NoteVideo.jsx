export function NoteVideo({note}){

   
    return <section className="note-video">
                <h2>{note.info.title}</h2>
                
                <iframe  width="240"  src={note.info.url}></iframe>
                
        </section>
                  
                        
}