// REACT
import { useEffect } from "react";

// COMPONENTS
import Navbar from "../components/Navbar";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutAuth({ children, page }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        if (page === "users" && !canExecute("GET_USERS")) {
            window.location.assign("/");
        }
    }, [page]);

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
