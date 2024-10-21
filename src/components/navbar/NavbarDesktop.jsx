// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// COMPONENTS
import Logo from "../Logo";

export default function NavbarDesktop() {
    // ZUSTAND
    const { logout, canExecute } = useLoginStore();

    // FUNCTIONS
    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/" className="navbar-link">
                        <Logo />
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
                    {canExecute("GET_ACCOUNTS") ? (
                        <a href="/accounts" className="navbar-link">
                            Cuentas
                        </a>
                    ) : null}
                    {canExecute("GET_SEATS") ? (
                        <a href="/seats" className="navbar-link">
                            Asientos
                        </a>
                    ) : null}
                    {canExecute("GET_DIARY") ? (
                        <a href="/diary-book" className="navbar-link">
                            Libro Diario
                        </a>
                    ) : null}
                    {canExecute("GET_LEDGER") ? (
                        <a href="/ledger" className="navbar-link">
                            Libro Mayor
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
