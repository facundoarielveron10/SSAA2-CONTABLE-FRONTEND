// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ICONS
import { IoIosArrowForward } from "react-icons/io";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Alert from "../Alert";
import { toast } from "react-toastify";
import Logo from "../Logo";

export default function FormResetPassword() {
    // STATES
    const [email, setEmail] = useState("");

    // FUNCTIONS
    const resetValues = () => {
        setEmail("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/reset-password", {
                email,
            });

            resetValues();
            toast.success(data);
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
                <a className="form-link" href="/login">
                    <IoIosArrowForward /> Iniciar Sesión
                </a>
                <a className="form-link" href="/register">
                    <IoIosArrowForward /> Registro
                </a>
            </div>
        </>
    );
}
