// CSS
import "../css/alert.css";

export default function Alert({ message, type }) {
    // FUNCTIONS
    const typeMessage = () => {
        if (type === "error") return "error";
        if (type === "success") return "success";
    };

    return (
        <div className={`alert-container ${typeMessage()}`}>
            <p className="alert">{message}</p>
        </div>
    );
}
