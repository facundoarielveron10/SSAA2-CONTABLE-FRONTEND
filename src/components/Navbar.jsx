// CSS
import "../css/navbar.css";

// COOKIES
import { useCookies } from "react-cookie";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function Navbar() {
    // COOKIES
    const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

    // ZUSTAND
    const { logout, canExecute } = useLoginStore();

    // FUNCTIONS
    const handleLogout = () => {
        removeCookie("AUTH_TOKEN");
        logout();
        window.location.assign("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/" className="navbar-link">
                        Logo aqui
                    </a>
                    <div className="navbar-separator"></div>
                </div>
                <div className="navbar-links">
                    {canExecute("GET_USERS") ? (
                        <a href="/users" className="navbar-link">
                            Usuarios
                        </a>
                    ) : null}
                    {canExecute("GET_ROLES") ? (
                        <a href="/roles" className="navbar-link">
                            Roles
                        </a>
                    ) : null}
                    <button className="button" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}
