// CSS
import "../css/alert.css";

// ALERT
import { Toaster, toast } from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { GoXCircleFill } from "react-icons/go";

export default function Alert() {
    return (
        <div className="alert" onClick={() => toast.dismiss()}>
            <Toaster
                toastOptions={{
                    success: {
                        icon: <FaCircleCheck />,
                        style: {
                            background: "#11bd11",
                            color: "white",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            width: "100%",
                        },
                    },
                    error: {
                        icon: <GoXCircleFill />,
                        style: {
                            background: "#c70a0a",
                            color: "white",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            width: "100%",
                        },
                    },
                }}
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}
