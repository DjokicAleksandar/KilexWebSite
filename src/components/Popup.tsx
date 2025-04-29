interface PopupProps {
    type: "loading" | "error" | "success";
}

const Popup = ({type}: PopupProps) => {
    return (
        <div className="position-fixed top-0 p-0"
            style={{height: "100vh", width: "100%", backdropFilter: "blur(10px)" }}>
            <div className="position-fixed bg-white shadow-lg p-4 rounded-xl z-50 top-50 start-50 translate-middle">
                {type === "loading" && <p>Slanje mejla... <br/> Molimo sačekajte</p>}
                {type === "error" && <p>Greška pri slanju mejla... <br/> Pokušajte kasnije </p>}
                {type === "success" && <p>Uspešno poslat mejl...</p>}
            </div>
        </div>
    )
}

export default Popup;