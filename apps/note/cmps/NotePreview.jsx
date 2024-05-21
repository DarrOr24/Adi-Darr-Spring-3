export function NotePreview({ note }){
    const { info, style } = note
    const { title, txt } = info
    const { backgroundColor } = style
    
    return (
        <article className="note-preview" >
            <header>
                <h2>{title}</h2>
                <img src="\assets\img\pin.svg" alt="" />
            </header>
            
            <p>{txt} km/h</p>
        </article>
    ) 
}

