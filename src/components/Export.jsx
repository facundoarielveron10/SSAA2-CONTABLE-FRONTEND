// ICONS
import { BsFiletypeXlsx, BsFiletypePdf } from "react-icons/bs";

export default function Export({
    excel = false,
    pdf = false,
    exportToExcel = null,
    exportToPDF = null,
}) {
    return (
        <div className="export">
            {excel ? (
                <BsFiletypeXlsx
                    className="export-button export-excel"
                    onClick={exportToExcel}
                />
            ) : null}
            {pdf ? (
                <BsFiletypePdf
                    className="export-button export-pdf"
                    onClick={exportToPDF}
                />
            ) : null}
        </div>
    );
}
