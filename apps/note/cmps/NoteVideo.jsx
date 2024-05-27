export function NoteVideo({note}){

   
    return <section className="note-video">
                <h2>{note.info.title}</h2>
                {/* <iframe width="420" height="315" */}
                <iframe  width="200"
                src={note.info.url}>
                </iframe>
                
        </section>
    
    // https://youtu.be/aUgtMaAZzW0                 
                        
}