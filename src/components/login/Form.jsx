// CSS
import "../../css/login/form.css";

// ICON
import { FaUserAstronaut } from "react-icons/fa6";

export default function Form() {
    return (
        <form className="form">
            {/* NAME */}
            <div className="form-group">
                <label className="form-label" htmlFor="name">
                    Nombre de Usuario
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    required
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
                    name="password"
                    required
                />
            </div>
            <button className="form-submit" type="submit">
                Iniciar Sesión
            </button>
        </form>
    );
}
