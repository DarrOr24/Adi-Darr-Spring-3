import { ActionBtns } from "./ActionBtns.jsx";

export function AddNote({notes}){
    return <section className = "add-note">
        <div className="closed">
            <p>Take a note...</p>
            <div>
                <img src="assets\img\new_list.svg" alt="" />
                <img src="assets\img\new_note_with_drawing.svg" alt="" />
                <img src="assets\img\new_note_with_img.svg" alt="" />
            </div>

        </div>

        <div className="opened hidden">
                <h4>Title</h4>
                <p>Take a note...</p>
        </div>

    </section>
}