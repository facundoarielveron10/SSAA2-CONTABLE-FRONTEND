// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// UTILS
import { getDateNow } from "../../utils/getData";
import { formatBalance } from "../../utils/format";

// ICONS
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function TablePreview({
    seats,
    getNameAccount,
    handleDelete,
    handleEdit,
}) {
    // ZUSTAND
    const { user } = useLoginStore();

    return (
        <div className="diary-seating">
            <div className="diary-header">
                <h2 className="diary-subtitle">Asientos</h2>
            </div>

            <table className="diary-table">
                <thead>
                    <tr>
                        <th className="diary-table-col-date">Fecha</th>
                        <th className="diary-table-col-user">Usuario</th>
                        <th className="diary-table-col-accounts">Cuentas</th>
                        <th className="diary-table-col-debe">Debe</th>
                        <th className="diary-table-col-haber">Haber</th>
                        <th className="diary-table-col-actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map((seat, index) => (
                        <tr key={index}>
                            <td className="diary-table-col-date">
                                {getDateNow()}
                            </td>
                            <td className="diary-table-col-user">
                                {user.email}
                            </td>
                            <td
                                className={`${
                                    seat.amount.type === "haber"
                                        ? "diary-haber"
                                        : ""
                                } diary-table-col-accounts`}
                            >
                                {getNameAccount(seat.account)}
                            </td>
                            <td className="diary-table-col-debe">
                                {seat.amount.type === "debe"
                                    ? `$${formatBalance(seat.amount.amount)}`
                                    : ""}
                            </td>
                            <td className="diary-table-col-haber">
                                {seat.amount.type === "haber"
                                    ? `$${formatBalance(seat.amount.amount)}`
                                    : ""}
                            </td>
                            <td className="createSeat-actions-container">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(seat.id)}
                                    className="createSeat-delete button"
                                >
                                    <FaTrashAlt />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleEdit(seat)}
                                    className="button"
                                >
                                    <FaPencil />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
