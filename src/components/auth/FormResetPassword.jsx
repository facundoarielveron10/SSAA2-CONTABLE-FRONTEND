// CSS
import "../../css/auth/form.css";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ICONS
import { IoIosArrowForward } from "react-icons/io";

// UTILS
import { errorResponse } from "../../utils/error";

export default function FormResetPassword() {
    // STATES
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // FUNCTIONS
    const resetValues = () => {
        setEmail("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email].includes("")) {
            setError("Todos los campos son obligatorios");

            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/reset-password", {
                email,
            });

            resetValues();
            setSuccess(data);
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <div className="form-message-container">
                {error ? (
                    <p className="form-message form-error">{error}</p>
                ) : null}
                {success ? (
                    <p className="form-message form-success">{success}</p>
                ) : null}
            </div>

            <form className="form" onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="form-submit button" type="submit">
                    Enviar Instrucciones
                </button>
            </form>
            {/* ENLACES */}
            <div className="form-links">
                <a className="form-link" href="/register">
                    <IoIosArrowForward /> Iniciar Sesión
                </a>
                <a className="form-link" href="/register">
                    <IoIosArrowForward /> Registro
                </a>
            </div>
        </>
    );
}
