export function ActionBtns( {note} ){

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
                    <div className="action-icon">
                        <img src="assets\img\archive.svg" alt="" />
                        <span className="action-name">Archive</span>
                    </div>
                    <div className="action-icon">
                        <img src="assets\img\more.svg" alt="" />
                        <span className="action-name">More</span>
                    </div>
                    {/* <button onClick={() => onRemove(note.id)}>x</button> */}
            </section>
}