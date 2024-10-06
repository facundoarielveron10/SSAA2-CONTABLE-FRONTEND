// CSS
import "../../css/books/diary.css";

// UTILS
import { getDateNow } from "../../utils/getData";
import { formatBalance } from "../../utils/format";

export default function TablePreview({ seats }) {
    return (
        <div className="diary-seating">
            <div className="diary-header">
                <h2 className="diary-subtitle">Asientos</h2>
            </div>

            <table className="diary-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cuentas</th>
                        <th>Debe</th>
                        <th>Haber</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map((seat, index) => (
                        <tr key={index}>
                            <td>{seat.date}</td>
                            <td>{getNameAccount(seat.account)}</td>
                            <td>${formatBalance(seat.debe)}</td>
                            <td>${formatBalance(seat.haber)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
