export function ActionBtns( {note, onRemove} ){

    function onClickMore(ev){
       ev.stopPropagation()
       console.log('oh yeah')
        
    }

    return <section className ="action-icons">
                    <div className="action-icon">
                        <img src="assets\img\check.svg" alt="" />
                        <span className="action-name select">Select Note</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\pin.svg" alt="" />
                        <span className="action-name">Pin Note</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\remind_me.svg" alt="" />
                        <span className="action-name">Remind Me</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\collaborator.svg" alt="" />
                        <span className="action-name">Collaborator</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\background_options.svg" alt="" />
                        <span className="action-name">Background options</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\add_image.svg" alt="" />
                        <span className="action-name">Add image</span>
                    </div>
                    <div onClick={(ev) => onRemove(ev, note.id) } className="action-icon">
                        <img src="assets\img\trash.svg" alt="" />
                        <span className="action-name">Delete</span>
                    </div>
                    <div onClick = {onClickMore}className="action-icon">
                        <img src="assets\img\more.svg" alt="" />
                        <span className="action-name">More</span>
                    </div>
                    {/* <button onClick={() => onRemove(note.id)}>x</button> */}
            </section>
}