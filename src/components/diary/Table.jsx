// CSS
import "../../css/books/diary.css";

// UTILS
import { getDateNow } from "../../utils/getData";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// ICONS
import { FaTrashAlt } from "react-icons/fa";

export default function Table({ seats, getNameAccount, handleDelete }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map((seat, index) => (
                        <tr key={index}>
                            <td>{getDateNow()}</td>
                            <td>{getNameAccount(seat.account)}</td>
                            <td>${seat.debe}</td>
                            <td>${seat.haber}</td>
                            <td className="createSeat-delete-container">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(seat.id)}
                                    className="createSeat-delete button"
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
