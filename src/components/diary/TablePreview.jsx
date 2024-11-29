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
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Asientos</h2>
                </div>

                <table className="table-content table-content-border">
                    <thead>
                        <tr>
                            <th className="table-10">Fecha</th>
                            <th className="table-20">Usuario</th>
                            <th className="table-30">Cuentas</th>
                            <th className="table-12">Debe</th>
                            <th className="table-12">Haber</th>
                            <th className="table-15">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seats.map((seat, index) => (
                            <tr key={index}>
                                <td>{getDateNow()}</td>
                                <td>{user.email}</td>
                                <td
                                    className={`${
                                        seat.amount.type === "haber"
                                            ? "table-haber"
                                            : ""
                                    }`}
                                >
                                    {getNameAccount(seat.account)}
                                </td>
                                <td>
                                    {seat.amount.type === "debe"
                                        ? `$${formatBalance(
                                              seat.amount.amount
                                          )}`
                                        : ""}
                                </td>
                                <td>
                                    {seat.amount.type === "haber"
                                        ? `$${formatBalance(
                                              seat.amount.amount
                                          )}`
                                        : ""}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(seat.id)}
                                        className="margin-right table-delete button"
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
        </div>
    );
}
