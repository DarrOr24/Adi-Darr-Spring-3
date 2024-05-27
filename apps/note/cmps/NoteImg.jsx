export function NoteImg({note}){

   
    return <section className="note-image">
                <h2>{note.info.title}</h2>
                <img src={note.info.url} alt="" />
        </section>

        // return <form action="/action_page.php">
        //         <input type="file" id="myFile" name="filename"/>
        //         <input type="submit" />
        // </form>

                        
                        
}