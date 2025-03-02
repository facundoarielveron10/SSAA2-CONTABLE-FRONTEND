// CSS (Interns)
// GLOBALS
import "@styles/navbar.css";
import "@styles/pagination.css";
import "@styles/search.css";
import "@styles/spinner.css";
import "@styles/logo.css";
import "@styles/darkmode.css";
import "@styles/alert.css";
import "@styles/export.css";
import "@styles/form.css";
import "@styles/table.css";
import "@styles/modal.css";
import "@styles/accordion.css";
// ROLES
import "@styles/roles/actions.css";
// BOOKS
import "@styles/books/ledger.css";
// HOME
import "@styles/home/card.css";
import "@styles/home/home.css";
import "@styles/home/stats.css";
// STOCK
import "@styles/stock.css";
// COLORS
import "@styles/colors.css";
// ORDERS
import "@styles/order/order.css";
import "@styles/order/summary.css";

// CSS (External)
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

// REACT
import { useEffect } from "react";

// COMPONENTS
import Navbar from "../components/navbar/Navbar.jsx";
import DarkMode from "../components/DarkMode.jsx";
import Colors from "src/components/Colors.jsx";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutAuth({ children, action }) {
    // ZUSTAND
    const { canExecute, initializeTheme } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        if (action) {
            if (!canExecute(action)) {
                window.location.assign("/");
            }
        }
    }, [action]);

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    useEffect(() => {
        const reloadStyles = () => {
            const links = document.querySelectorAll("style[type='text/css']");
            links.forEach((link) => {
                const href = link.href;
                link.href = "";
                link.href = href;
            });
        };

        reloadStyles();
    }, []);

    return (
        <>
            <Navbar />
            <DarkMode />
            <Colors />

            {children}
        </>
    );
}
