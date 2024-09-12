// CSS
import "../css/alert.css";

// ALERT
import { Toaster, toast } from "react-hot-toast";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function Alert() {
    return (
        <div className="alert" onClick={() => toast.dismiss()}>
            <Toaster
                toastOptions={{
                    success: {
                        icon: <FiCheckCircle />,
                        style: {
                            background: "#11bd11",
                            color: "white",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        },
                    },
                    error: {
                        icon: <FiXCircle />,
                        style: {
                            background: "#c70a0a",
                            color: "white",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        },
                    },
                }}
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}
