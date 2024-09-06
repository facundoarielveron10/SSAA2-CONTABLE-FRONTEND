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
