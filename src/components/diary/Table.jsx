// CSS
import { Fragment } from "react/jsx-runtime";
import "../../css/books/diary.css";

// UTILS
import { formatBalance, formatDate } from "../../utils/format";

export default function TablePreview({ seats }) {
    return (
        <div className="diary-seating">
            <div className="diary-header">
                <h2 className="diary-subtitle">Asientos</h2>
            </div>

            <table className="diary-table">
                <thead>
                    <tr>
                        <th className="diary-table-col-date">Fecha</th>
                        <th className="diary-table-col-description">
                            Descripción
                        </th>
                        <th className="diary-table-col-user">Usuario</th>
                        <th className="diary-table-col-accounts">Cuentas</th>
                        <th className="diary-table-col-debe">Debe</th>
                        <th className="diary-table-col-haber">Haber</th>
                    </tr>
                </thead>
                <tbody>
                    {seats
                        .sort(
                            (a, b) =>
                                new Date(a.seat.date) - new Date(b.seat.date)
                        )
                        .map((seat, index) => (
                            <Fragment key={index}>
                                {seat.accountSeats
                                    .sort((a, b) => b.debe - a.debe)
                                    .map((accountSeat, accountIndex) => (
                                        <tr key={accountIndex}>
                                            {accountIndex === 0 && (
                                                <>
                                                    <td
                                                        className="diary-table-col-date"
                                                        rowSpan={
                                                            seat.accountSeats
                                                                .length
                                                        }
                                                    >
                                                        {formatDate(
                                                            seat.seat.date
                                                        )}
                                                    </td>
                                                    <td
                                                        className="diary-table-col-description"
                                                        rowSpan={
                                                            seat.accountSeats
                                                                .length
                                                        }
                                                    >
                                                        {seat.seat.description}
                                                    </td>
                                                    <td
                                                        className="diary-table-col-user"
                                                        rowSpan={
                                                            seat.accountSeats
                                                                .length
                                                        }
                                                    >
                                                        {seat.seat.user}
                                                    </td>
                                                </>
                                            )}
                                            <td
                                                className={`${
                                                    accountSeat.haber > 0
                                                        ? "diary-haber"
                                                        : ""
                                                } diary-table-col-accounts`}
                                            >
                                                {accountSeat.account}
                                            </td>
                                            <td className="diary-table-col-debe">
                                                {accountSeat.debe > 0
                                                    ? `$${formatBalance(
                                                          accountSeat.debe
                                                      )}`
                                                    : ""}
                                            </td>
                                            <td className="diary-table-col-haber">
                                                {accountSeat.haber > 0
                                                    ? `$${formatBalance(
                                                          accountSeat.haber
                                                      )}`
                                                    : ""}
                                            </td>
                                        </tr>
                                    ))}
                            </Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
