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
import Alert from "../Alert";

export default function FormLogin() {
    // STATES
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([token].includes("")) {
            setError("Todos los campos son obligatorios");

            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/confirm", {
                token,
            });

            setSuccess(data);

            setTimeout(() => {
                window.location.assign("/login");
            }, 5000);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            {error ? <Alert message={error} type="error" /> : null}
            {success ? <Alert message={success} type="success" /> : null}
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
