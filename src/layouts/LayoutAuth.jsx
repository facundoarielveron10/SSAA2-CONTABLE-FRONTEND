// CSS
import "@styles/accounts/accounts.css";
import "@styles/accounts/create-edit.css";
import "@styles/books/diary.css";
import "@styles/navbar.css";
import "@styles/roles/roles.css";
import "@styles/roles/create-edit.css";
import "@styles/seats/createSeat.css";
import "@styles/seats/seats.css";
import "@styles/seats/seat.css";
import "@styles/users/create-edit.css";
import "@styles/auth/form.css";
import "@styles/users/users.css";
import "@styles/pagination.css";
import "@styles/search.css";
import "@styles/spinner.css";
import "@styles/logo.css";
import "@styles/darkmode.css";
import "@styles/alert.css";

// REACT
import { useEffect } from "react";

// COMPONENTS
import Navbar from "../components/navbar/Navbar.jsx";
import DarkMode from "../components/DarkMode.jsx";

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
            {children}
        </>
    );
}
