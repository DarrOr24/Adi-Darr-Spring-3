export function NoteVideo({note}){

   
    return <section className="note-video">
                <h2>{note.info.title}</h2>
                <iframe width="420" height="315"
                // src="https://www.youtube.com/embed/aUgtMaAZzW0">
                src={note.info.url}>
                </iframe>
                
        </section>
    
    // https://youtu.be/aUgtMaAZzW0                 
                        
}