// REACTS
import { useState } from "react";
import { useLoginStore } from "src/zustand/loginStore";

export default function Colors() {
    // STATES
    const [isOpen, setIsOpen] = useState(false);

    // ZUSTAND
    const { setPrimaryColors } = useLoginStore();

    // COLORS
    const colors = [
        {
            name: "Violet",
            label: "violet",
            value: "#6200ee",
            darkValue: "#5501ca",
        },
        {
            name: "Orange",
            label: "orange",
            value: "#ff9800",
            darkValue: "#e68900",
        },
        {
            name: "Green",
            label: "green",
            value: "#2bd422",
            darkValue: "#23b91b",
        },
        { name: "Blue", label: "blue", value: "#2196f3", darkValue: "#1976d2" },
    ];

    return (
        <div className="colors-container">
            <div
                className={`colors-toggle ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
            </div>
            <div className={`colors ${isOpen ? "open" : ""}`}>
                {colors.map((color) => (
                    <label
                        key={color.name}
                        className={`colors-${color.label}`}
                        onClick={() =>
                            setPrimaryColors(color.value, color.darkValue)
                        }
                    >
                        <div className="colors-layer"></div>
                        <div className="colors-circle">
                            <span></span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}
