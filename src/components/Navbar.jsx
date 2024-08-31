// CSS
import "../css/navbar.css";

// COOKIES
import { useCookies } from "react-cookie";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function Navbar({ user }) {
    // COOKIES
    const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

    // ZUSTAND
    const { logout } = useLoginStore();

    // FUNCTIONS
    const handleLogout = () => {
        removeCookie("AUTH_TOKEN");
        logout();
        window.location.assign("/login");
    };

    const isAdmin = () => {
        if (user.role.name === "ROLE_ADMIN") {
            return true;
        } else {
            return false;
        }
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
                    {isAdmin(user) ? (
                        <a href="/users" className="navbar-link">
                            Usuarios
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
