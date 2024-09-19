// CSS
import "../../css/auth/form.css";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

export default function FormLogin() {
    // STATES
    const [token, setToken] = useState("");
    const [success, setSuccess] = useState(false);

    // FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([token].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/confirm", {
                token,
            });

            toast.success(data);
            setSuccess(true);
            setTimeout(() => {
                window.location.assign("/login");
            }, 5000);
        } catch (error) {
            toast.error(errorResponse(error));
            setSuccess(false);
        }
    };

    return (
        <>
            <Alert />
            <form className="form" onSubmit={handleSubmit}>
                {/* TOKEN */}
                <div className="form-group">
                    <label className="form-label" htmlFor="token">
                        Codigo
                    </label>
                    <input
                        disabled={success ? true : false}
                        className={`form-input ${
                            success ? "form-input-blocked" : ""
                        }`}
                        type="text"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>
                <button
                    disabled={success ? true : false}
                    className={`form-submit button ${
                        success ? "form-submit-blocked" : ""
                    }`}
                    type="submit"
                >
                    Confirmar Cuenta
                </button>
            </form>
            <div className="form-spinner">{success ? <Spinner /> : null}</div>
        </>
    );
}
