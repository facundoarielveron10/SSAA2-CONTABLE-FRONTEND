// ALERT
import { ToastContainer } from "react-toastify";

export default function Alert() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="alert"
        />
    );
}
