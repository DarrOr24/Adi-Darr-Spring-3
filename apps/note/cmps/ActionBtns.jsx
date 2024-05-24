import { NoteColorMenu } from "./NoteColorMenu.jsx"

const { useState } = React

export function ActionBtns( {note, onRemove} ){

    const [ colorMenu, setColorMenu ] = useState(false)

    function onClickMore(ev){
       ev.stopPropagation()
       console.log('oh yeah')
        
    }

    function openColorMenu(ev){
        ev.stopPropagation()
        // (colorMenu) ? setColorMenu(false) : setColorMenu(true)
        if(!colorMenu) setColorMenu(true)
        else setColorMenu(false)
        console.log('hi')
    }

    function setNoteColor(color){
        console.log(color)
    }

    return <section className ="action-icons">
                    <div className="action-icon select">
                        <img  src="assets\img\check.svg" alt="" />
                        <span className="action-name select">Select Note</span>
                    </div>
                    
                    <div className="action-icon">
                        <img src="assets\img\remind_me.svg" alt="" />
                        <span className="action-name">Remind Me</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\collaborator.svg" alt="" />
                        <span className="action-name">Collaborator</span>
                    </div>
                    <div onClick={openColorMenu} className="action-icon color">
                        <img src="assets\img\background_options.svg" alt="" />
                        <span className="action-name">Background options</span>
                        {colorMenu && <NoteColorMenu onSetNoteColor={setNoteColor} />}
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\add_image.svg" alt="" />
                        <span className="action-name">Add image</span>
                    </div>
                    <div onClick={(ev) => onRemove(ev, note.id) } className="action-icon trash">
                        <img src="assets\img\trash.svg" alt="" />
                        <span className="action-name">Delete</span>
                    </div>
                    <div onClick = {onClickMore}className="action-icon">
                        <img height="24" width="24" src="assets\img\more.svg" alt="" />
                        <span  className="action-name">More</span>
                    </div>
                    
            </section>
}