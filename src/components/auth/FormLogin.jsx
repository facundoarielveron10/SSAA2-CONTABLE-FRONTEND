// CSS
import "../../css/auth/form.css";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// COOKIES
import { useCookies } from "react-cookie";

// ICONS
import { IoIosArrowForward } from "react-icons/io";

// UTILS
import { errorResponse } from "../../utils/error";

export default function FormLogin() {
    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // COOKIES
    const [cookies, setCookie] = useCookies(["AUTH_TOKEN"]);

    // FUNCTIONS
    const resetValues = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            setError("Todos los campos son obligatorios");

            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/login", {
                email,
                password,
            });

            setCookie("AUTH_TOKEN", data);
            resetValues();
            window.location.assign("/");
        } catch (error) {
            setError(errorResponse(error));
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <div className="alert-container">
                {error ? <p className="alert alert-error">{error}</p> : null}
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
                {/* PASSWORD */}
                <div className="form-group">
                    <label className="form-label" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="form-submit button" type="submit">
                    Iniciar Sesión
                </button>
            </form>
            {/* ENLACES */}
            <div className="form-links">
                <a className="form-link" href="/register">
                    <IoIosArrowForward /> Registro
                </a>
                <a className="form-link" href="/forgot-password">
                    <IoIosArrowForward /> Olvide mi contraseña
                </a>
            </div>
        </>
    );
}
