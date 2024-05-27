
export function NoteImg({note}){


        console.log('reached img note')
   
    return <section className="note-image">
                <h2>{note.info.title}</h2>
                <img src={note.info.url} alt="" />
                {/* <img src="https://images.app.goo.gl/HWm6W3qzcGtTooqU6" alt="Please" /> */}
                
        </section>

                      
}