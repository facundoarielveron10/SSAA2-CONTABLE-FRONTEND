// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// COMPONENTS
import Logo from "../Logo";

export default function NavbarDesktop({ url }) {
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
                    <a
                        href="/"
                        className={`${
                            url === "/" ? "navbar-link-active" : ""
                        } navbar-link`}
                    >
                        <Logo />
                    </a>
                    <div className="navbar-separator"></div>
                </div>
                <div className="navbar-links">
                    {canExecute("GET_USERS") ? (
                        <a
                            href="/users"
                            className={`${
                                url === "/users" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Usuarios
                        </a>
                    ) : null}
                    {canExecute("GET_ROLES") ? (
                        <a
                            href="/roles"
                            className={`${
                                url === "/roles" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Roles
                        </a>
                    ) : null}
                    {canExecute("GET_ACCOUNTS") ? (
                        <a
                            href="/accounts"
                            className={`${
                                url === "/accounts" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Cuentas
                        </a>
                    ) : null}
                    {canExecute("GET_SEATS") ? (
                        <a
                            href="/seats"
                            className={`${
                                url === "/seats" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Asientos
                        </a>
                    ) : null}
                    {canExecute("GET_DIARY") ? (
                        <a
                            href="/diary-book"
                            className={`${
                                url === "/diary-book"
                                    ? "navbar-link-active"
                                    : ""
                            } navbar-link`}
                        >
                            Libro Diario
                        </a>
                    ) : null}
                    {canExecute("GET_LEDGER") ? (
                        <a
                            href="/ledger"
                            className={`${
                                url === "/ledger" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Libro Mayor
                        </a>
                    ) : null}
                    {canExecute("GET_ARTICLES") ? (
                        <a
                            href="/articles"
                            className={`${
                                url === "/articles" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Articulos
                        </a>
                    ) : null}
                    {canExecute("GET_CATEGORIES") ? (
                        <a
                            href="/categories"
                            className={`${
                                url === "/categories"
                                    ? "navbar-link-active"
                                    : ""
                            } navbar-link`}
                        >
                            Categorias
                        </a>
                    ) : null}
                    {canExecute("GET_SUPPLIERS") ? (
                        <a
                            href="/suppliers"
                            className={`${
                                url === "/suppliers" ? "navbar-link-active" : ""
                            } navbar-link`}
                        >
                            Proveedores
                        </a>
                    ) : null}
                    {canExecute("GET_PURCHASE_REQUEST") ? (
                        <a
                            href="/purchase-request"
                            className={`${
                                url === "/purchase-request"
                                    ? "navbar-link-active"
                                    : ""
                            } navbar-link`}
                        >
                            Pedidos de Compra
                        </a>
                    ) : null}
                    {canExecute("GET_PURCHASE_ORDERS") ? (
                        <a
                            href="/purchase-order"
                            className={`${
                                url === "/purchase-order"
                                    ? "navbar-link-active"
                                    : ""
                            } navbar-link`}
                        >
                            Ordenes de Compras
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
