// UTILS
import { formatBalance, formatDate } from "src/utils/format";

export default function Table({ name, seats, openingBalance, finalBalance }) {
    return (
        <div className="ledger-table-container">
            <div className="ledger-table-name">
                <h2>{name}</h2>
            </div>
            <table className="ledger-table">
                <thead>
                    <tr>
                        <th className="ledger-table-col-date">Fecha</th>
                        <th className="ledger-table-col-description">
                            Descripción
                        </th>
                        <th className="ledger-table-col-debe">Debe</th>
                        <th className="ledger-table-col-haber">Haber</th>
                        <th className="ledger-table-col-balance">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>Saldo Inicial</td>
                        <td></td>
                        <td></td>
                        <td>${formatBalance(openingBalance)}</td>
                    </tr>
                    {seats.length > 0 &&
                        seats.map((seat, index) => (
                            <tr key={index}>
                                <td>{formatDate(seat.seat.date)}</td>
                                <td>{seat.seat.description}</td>
                                <td>
                                    {seat.debe > 0
                                        ? `$${formatBalance(seat.debe)}`
                                        : ""}
                                </td>
                                <td>
                                    {seat.haber > 0
                                        ? `$${formatBalance(seat.haber)}`
                                        : ""}
                                </td>
                                <td>${formatBalance(seat.balance)}</td>
                            </tr>
                        ))}
                    <tr>
                        <td>-</td>
                        <td>Saldo Final</td>
                        <td></td>
                        <td></td>
                        <td>${formatBalance(finalBalance)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
