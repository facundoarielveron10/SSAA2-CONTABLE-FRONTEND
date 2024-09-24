// CSS
import "../../css/users/users.css";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({}) {
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>24/09/2024</td>
                        <td>Caja</td>
                        <td>50.000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>24/09/2024</td>
                        <td>Deudores por ventas</td>
                        <td></td>
                        <td>50.000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
