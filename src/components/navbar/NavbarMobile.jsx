// REACT
import { useState } from "react";

// COMPONENTS
import { Sling as Hamburger } from "hamburger-react";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// ICON
import { CiLogout } from "react-icons/ci";

export default function NavbarMobile({ url }) {
    // STATE
    const [isOpen, setOpen] = useState(false);

    // ZUSTAND
    const { darkMode, canExecute, logout } = useLoginStore();

    // FUNCTIONS
    const handleLogout = () => {
        logout();
    };
    console.log(url);
    return (
        <>
            <div className="navbarMobile">
                <Hamburger
                    toggled={isOpen}
                    toggle={setOpen}
                    color={`${
                        darkMode ? "#e9e9e9" : isOpen ? "#e9e9e9" : "#0f1214"
                    }`}
                />
            </div>
            <div
                className={`navbarMobile-overlay ${isOpen ? "open" : ""}`}
                id="navbarMobile-overlay"
            >
                <nav className="navbarMobile-overlay-menu">
                    <ul>
                        <li>
                            <a
                                className={`${
                                    url === "/" ? "navbar-link-active" : ""
                                }`}
                                href="/"
                            >
                                Inicio
                            </a>
                        </li>
                        {canExecute("GET_USERS") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/users"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/users"
                                >
                                    Usuarios
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_ROLES") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/roles"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/roles"
                                >
                                    Roles
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_ACCOUNTS") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/accounts"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/accounts"
                                >
                                    Cuentas
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_SEATS") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/seats"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/seats"
                                >
                                    Asientos
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_DIARY") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/diary-book"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/diary-book"
                                >
                                    Libro Diario
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_LEDGER") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/ledger"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/ledger"
                                >
                                    Libro Mayor
                                </a>
                            </li>
                        ) : null}
                        <li>
                            <button
                                className="navbarMobile-logout"
                                onClick={handleLogout}
                            >
                                <CiLogout />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
