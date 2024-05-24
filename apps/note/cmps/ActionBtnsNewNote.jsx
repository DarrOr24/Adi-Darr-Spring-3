export function ActionBtnsNewNote(){

    function onClickMore(ev){
       ev.stopPropagation()
       console.log('oh yeah')
        
    }

    return <section className ="bottom-menu action-icons-new-note">
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
                   
                    <div onClick = {onClickMore}className="action-icon">
                        <img height="24" width="24" src="assets\img\more.svg" alt="" />
                        <span className="action-name">More</span>
                    </div>

                    {/* <div onClick ={onClose} className="closeBtn">Close</div> */}

            </section>
}