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

    return (
        <>
            <Navbar />
            <DarkMode />
            {children}
        </>
    );
}
