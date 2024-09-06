// CSS
import "../css/darkmode.css";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

// DARK MODE
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DarkMode() {
    // ZUSTAND
    const { toggleDarkMode, darkMode } = useLoginStore();

    return (
        <div className="darkMode">
            <DarkModeSwitch
                checked={darkMode}
                onChange={toggleDarkMode}
                size={40}
                sunColor="#F5D033"
            />
        </div>
    );
}
