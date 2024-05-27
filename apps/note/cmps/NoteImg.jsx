
export function NoteImg({note}){


        console.log('reached img note')
   
    return <section className="note-image">
                <h2>{note.info.title}</h2>
                <img width="200" src={note.info.url} alt="" />
               
                
        </section>

                      
}