// COMPONENTS
import Navbar from "../components/Navbar";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutAuth({ children }) {
    const { user } = useLoginStore();

    return (
        <>
            <Navbar user={user} />
            {children}
        </>
    );
}
