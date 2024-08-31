// REACT
import { useEffect } from "react";

// UTILS
import { isGetUsers } from "../utils/auth";

// COMPONENTS
import Navbar from "../components/Navbar";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutAuth({ children, page }) {
    // ZUSTAND
    const { user } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        if (page === "users" && !isGetUsers(user.actions)) {
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
