const Accordion = ({ id, handleClick, title, active, children }) => {
    return (
        <div className="accordion">
            <div className="accordion-item">
                <button
                    type="button"
                    className="accordion-header"
                    onClick={() => handleClick(id)}
                >
                    {title}
                    <span>{active ? "▲" : "▼"}</span>
                </button>
                {active && <div className="accordion-content">{children}</div>}
            </div>
        </div>
    );
};

export default Accordion;
