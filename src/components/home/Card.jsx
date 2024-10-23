// REACT
import { useState } from "react";

export default function Card({ title, description, url }) {
    // STATES
    const [isExpanded, setIsExpanded] = useState(false);

    // CONSTANTs
    const characterLimit = 100;

    // FUNCTIONS
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // TRUNCATED
    const truncatedDescription =
        description.length > characterLimit && !isExpanded
            ? description.substring(0, characterLimit) + "..."
            : description;

    return (
        <div className="home-card">
            <div className="home-card-iframe">
                <iframe
                    src={url}
                    title={title}
                    className="home-card-preview"
                    allowFullScreen
                />
                <div className="home-card-overlay"></div>
            </div>
            <h2 className="home-card-title">{title}</h2>
            <p className="home-card-description">
                {truncatedDescription}
                {description.length > characterLimit && (
                    <button
                        className="home-card-expand-button"
                        onClick={handleToggleExpand}
                    >
                        {isExpanded ? "Ver menos" : "Ver más"}
                    </button>
                )}
            </p>
            <div className="home-card-button">
                <a href={url} className="button">
                    Ir a {title}
                </a>
            </div>
        </div>
    );
}
