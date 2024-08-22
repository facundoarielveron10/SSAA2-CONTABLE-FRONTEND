// CSS
import "../../css/login/form.css";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// COOKIES
import { useCookies } from "react-cookie";

export default function Form() {
    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // COOKIES
    const [cookies, setCookie] = useCookies(["AUTH_TOKEN"]);

    // FUNCTIONS
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
            window.location.assign("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <div className="form-error-container">
                {error ? <p className="form-error">{error}</p> : null}
            </div>

            <form className="form" onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="email"
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="form-submit" type="submit">
                    Iniciar Sesión
                </button>
            </form>
        </>
    );
}
