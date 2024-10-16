// REACT
import { useEffect, useState } from "react";

// ICONS
import { IoIosArrowForward } from "react-icons/io";

// UTILS
import { errorResponse } from "../../utils/error";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// COMPONENTS
import Logo from "../Logo";

export default function FormLogin() {
    // ZUSTAND
    const { isSubmitting, successSubmitted, errorSubmitting, submitLogin } =
        useLoginStore();

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // FUNCTIONS
    const resetValues = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            await submitLogin(email, password);

            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // EFFECTS
    useEffect(() => {
        if (!isSubmitting && errorSubmitting) {
            toast.error(errorSubmitting);
        }
    }, [errorSubmitting, isSubmitting]);

    useEffect(() => {
        if (!isSubmitting && successSubmitted) {
            window.location.assign("/");
        }
    }, [successSubmitted, isSubmitting]);

    return (
        <>
            {/* ALERTA */}
            <Alert />
            {/* LOGO */}
            <div className="form-logo">
                <Logo animation={true} name={true} width={80} height={60} />
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
