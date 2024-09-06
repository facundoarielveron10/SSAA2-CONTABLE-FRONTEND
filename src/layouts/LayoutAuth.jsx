// REACT
import { useEffect } from "react";

// COMPONENTS
import Navbar from "../components/navbar/Navbar.jsx";
import DarkMode from "../components/DarkMode.jsx";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutAuth({ children, page }) {
    // ZUSTAND
    const { canExecute, initializeTheme } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        if (page === "users" && !canExecute("GET_USERS")) {
            window.location.assign("/");
        }
    }, [page]);

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    return (
        <>
            <Navbar />
            <DarkMode />
            {children}
        </>
    );
}
