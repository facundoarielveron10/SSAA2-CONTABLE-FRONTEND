// ICONS
import { MdDateRange } from "react-icons/md";

// UTILS
import { formatBalance, formatDate } from "src/utils/format";

export default function Ledger({
    name,
    type,
    seats,
    openingBalance,
    finalBalance,
}) {
    return (
        <div className="ledger-content">
            <h2 className="ledger-name">{name}</h2>
            <div className="ledger-seats">
                {seats.length > 0 &&
                    seats.map((seat, index) => (
                        <div key={index} className="ledger-seat">
                            <p className="ledger-date">
                                <MdDateRange /> {formatDate(seat.seat.date)}
                            </p>
                            <p className="ledger-description">
                                {seat.seat.description}
                            </p>
                            <div className="ledger-seat-data">
                                <p>
                                    Debe:{" "}
                                    <strong>
                                        {seat.debe > 0
                                            ? `$${formatBalance(seat.debe)}`
                                            : "-"}
                                    </strong>
                                </p>
                                <p>
                                    Haber:{" "}
                                    <strong>
                                        {seat.haber > 0
                                            ? `$${formatBalance(seat.haber)}`
                                            : "-"}
                                    </strong>
                                </p>
                                <p>
                                    Saldo:{" "}
                                    <strong>
                                        {seat.balance > 0
                                            ? `$${formatBalance(seat.balance)}`
                                            : "-"}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="ledger-data-container">
                <p className="ledger-data">
                    Saldo Inicial{" "}
                    <strong>
                        {openingBalance > 0
                            ? `$${formatBalance(openingBalance)}`
                            : "$0"}
                    </strong>
                </p>
                <p className="ledger-data">{type}</p>
                <p className="ledger-data">
                    Saldo Final{" "}
                    <strong>
                        {finalBalance > 0
                            ? `$${formatBalance(finalBalance)}`
                            : "$0"}
                    </strong>
                </p>
            </div>
        </div>
    );
}
