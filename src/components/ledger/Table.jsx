// UTILS
import { formatBalance, formatDate } from "src/utils/format";

export default function Table({ name, seats, openingBalance, finalBalance }) {
    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">{name}</h2>
                </div>
                <table className="table-content table-content-border">
                    <thead>
                        <tr>
                            <th className="table-15">Fecha</th>
                            <th className="table-35">Descripción</th>
                            <th className="table-15">Debe</th>
                            <th className="table-15">Haber</th>
                            <th className="table-20">Saldo</th>
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
        </div>
    );
}
