// CSS (Internal)
import "@styles/form.css";
import "@styles/logo.css";
import "@styles/darkmode.css";
import "@styles/alert.css";
import "@styles/spinner.css";

// CSS (External)
import "react-toastify/dist/ReactToastify.css";

// REACT
import { useEffect } from "react";

// COMPONENTS
import DarkMode from "../components/DarkMode";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutNotAuth({ children }) {
    // ZUSTAND
    const { initializeTheme } = useLoginStore();

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    return (
        <>
            <DarkMode />
            {children}
        </>
    );
}
