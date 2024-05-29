import { NoteImg } from "./NoteImg"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function TrashNotePreview({note}){
    
    
   
    const {  style } = note
    const { backgroundColor } = style

   
    return  <section className="trahs-note-preview">
                
                    <article className="note-preview" style={{backgroundColor: backgroundColor}} >
                        
                        <DynamicCmp note={note} />
                       
                        {/* <ActionBtns note={updatedNote} onRemove={onRemove} onSetNoteColor={setNoteColor} onDuplicate={onDuplicate} onLoadImgOrVid={editPreview} /> */}
                    </article>
                
              
    </section>

}

function DynamicCmp({note}){
    
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt note={note} />
        case 'NoteImg':
            return <NoteImg note={note}/>
        case 'NoteVideo':
            return <NoteVideo note = {note} />
    }
}

