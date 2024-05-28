import { NoteColorMenu } from "./NoteColorMenu.jsx"
import { NoteImgAdd } from "./NoteImgAdd.jsx"

const { useState } = React

export function ActionBtns( {note, onRemove, onSetNoteColor, onDuplicate, onChangeImg} ){

    const [ colorMenu, setColorMenu ] = useState(false)
    const [ addImg, setAddImg ] = useState(false)
    const [ buttonClass, setButtonClass ] = useState('')
    
    function onDuplicateNote(ev){
       ev.stopPropagation()
       console.log('oh yeah')
       onDuplicate(note)
        
    }

    function openColorMenu(ev){
        ev.stopPropagation()
        // (colorMenu) ? setColorMenu(false) : setColorMenu(true)
        if(!colorMenu) setColorMenu(true)
        else setColorMenu(false)
    }

    function onAddImg(ev){
        ev.stopPropagation()
        if(!addImg) setAddImg(true)
    }

    function changeImg(noteFromImg){
        console.log(noteFromImg)
        console.log('Reached action buttons')
        setAddImg(false)
        onChangeImg(noteFromImg)
    }

    
    
    return <section className ="action-icons">
                    <div className={`action-icon select `}>
                        <img  src="assets\img\check.svg" alt="" />
                        <span className="action-name select">Select Note</span>
                    </div>

                    <div className="action-icon list">
                        <img src="assets\img\new_list.svg" alt="" />    
                        <span className="action-name">New list</span>
                    </div>

                    <div className="action-icon drawing">
                        <img src="assets\img\new_note_with_drawing.svg" alt="" />      
                        <span className="action-name">New note with drawing</span>
                    </div>

                    
                    {/* <div className="action-icon">
                        <img src="assets\img\remind_me.svg" alt="" />
                        <span className="action-name">Remind Me</span>
                    </div> */}

                    <div className="action-icon email">
                        <img height="24" width="24" src="assets\img\email.svg" alt="" />
                        <span className="action-name">Send as mail</span>
                    </div>

                    <div onClick={openColorMenu} className="action-icon color">
                        <img src="assets\img\background_options.svg" alt="" />
                        <span className="action-name">Background options</span>
                        {colorMenu && <NoteColorMenu onSetNoteColor={onSetNoteColor} />}
                    </div>

                    <div onClick={onAddImg}  className="action-icon add-img" >
                        <img  src="assets\img\add_image.svg" alt="" />
                        <span className="action-name">Add image</span>
                        {addImg && <NoteImgAdd note={note} onReturn={() => setAddImg(false)} onChangeImg={changeImg} />}
                    </div>

                    <div className="action-icon" >
                        <img height="24" width="24" src="assets\img\video.svg" alt="" />      
                        <span className="action-name">Add video</span>
                    </div>

                    <div onClick = {onDuplicateNote}className="action-icon duplicate">
                        <img height="24" width="24" src="assets\img\duplicate.png" alt="" />
                        <span  className="action-name">Duplicate</span>
                    </div>

                    <div onClick={(ev) => onRemove(ev, note.id) } className="action-icon trash">
                        <img src="assets\img\trash.svg" alt="" />
                        <span className="action-name">Delete</span>
                    </div>
         </section>
}