// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";
import Logo from "../Logo";

// ALERTS
import Alert from "../Alert";
import { toast } from "react-toastify";

export default function FormNewPassword() {
    // STATES
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [success, setSuccess] = useState(false);

    // FUNCTIONS
    const handleSubmitToken = async (e) => {
        e.preventDefault();

        if ([token].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/validate-token", {
                token,
            });

            toast.success(data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setIsValidToken(true);
            }, 5000);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();

        if ([password, passwordConfirm].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                `/user/update-password/${token}`,
                {
                    password,
                    passwordConfirm,
                }
            );

            toast.success(data);
            setSuccess(true);
            setTimeout(() => {
                window.location.assign("/login");
            }, 5000);
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
            {isValidToken ? (
                <form className="form" onSubmit={handleSubmitNewPassword}>
                    {/* PASSWORD */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            disabled={success ? true : false}
                            className={`form-input ${
                                success ? "form-input-blocked" : ""
                            }`}
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
                            disabled={success ? true : false}
                            className={`form-input ${
                                success ? "form-input-blocked" : ""
                            }`}
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={success ? true : false}
                        className={`form-submit button ${
                            success ? "form-submit-blocked" : ""
                        }`}
                        type="submit"
                    >
                        Reestablecer Contraseña
                    </button>
                </form>
            ) : (
                <form className="form" onSubmit={handleSubmitToken}>
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
                        Ingresar
                    </button>
                </form>
            )}

            <div className="form-spinner">{success ? <Spinner /> : null}</div>
        </>
    );
}
