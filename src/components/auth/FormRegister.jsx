// CSS
import "../../css/auth/form.css";

// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ICONS
import { IoIosArrowForward } from "react-icons/io";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// COMPONENTS
import Logo from "../Logo";

export default function FormRegister() {
    // STATES
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, lastname, email, password, passwordConfirm].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/register", {
                name,
                lastname,
                email,
                password,
                passwordConfirm,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <>
            <Alert />
            {/* LOGO */}
            <div className="form-logo">
                <Logo animation={true} name={true} width={80} height={60} />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* LASTNAME */}
                <div className="form-group">
                    <label className="form-label" htmlFor="lastname">
                        Apellido
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
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
                {/* PASSWORD CONFIRM */}
                <div className="form-group">
                    <label className="form-label" htmlFor="passwordConfirm">
                        Repetir Contraseña
                    </label>
                    <input
                        className="form-input"
                        type="password"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button className="form-submit button" type="submit">
                    Registrarme
                </button>
            </form>

            {/* ENLACES */}
            <div className="form-links">
                <a className="form-link" href="/login">
                    <IoIosArrowForward /> Iniciar Sesión
                </a>
                <a className="form-link" href="/forgot-password">
                    <IoIosArrowForward /> Olvide mi contraseña
                </a>
            </div>
        </>
    );
}
