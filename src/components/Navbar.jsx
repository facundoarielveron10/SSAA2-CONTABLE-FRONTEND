// CSS
import "../css/navbar.css";

// COOKIES
import { useCookies } from "react-cookie";

export default function Navbar() {
    // COOKIES
    const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

    // FUNCTIONS
    const handleLogout = () => {
        removeCookie("AUTH_TOKEN");
        window.location.assign("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <p>Logo aqui</p>
                    <div className="navbar-separator"></div>
                </div>
                <div className="navbar-links">
                    <button className="button" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}
