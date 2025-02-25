const Accordion = ({key, handleClick, title, active, children}) => {
  return (
    <div className="accordion">
            <div key={key} className="accordion-item">
                {/* Botón para abrir/cerrar el acordeón */}
                <button
                    type="button"
                    className="accordion-header"
                    onClick={() => handleClick(key)}
                >
                    {title}
                    <span>{active ? "▲" : "▼"}</span>
                </button>

                {/* Contenido del acordeón (se muestra solo si el proveedor está activo) */}
                {active && (
                    <div className="accordion-content">
                        {children}
                    </div>
                )}
            </div>
    </div>
  )
}

export default Accordion