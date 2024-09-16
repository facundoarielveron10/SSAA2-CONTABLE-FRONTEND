// CSS
import "../../css/accounts/accounts.css";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// COMPONENTS
import Search from "../Search";

export default function Table({ accounts }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="accounts-list">
            <h2 className="accounts-subtitle">Cuentas</h2>

            {accounts.length === 0 ? (
                <p className="accounts-no-accounts">
                    No hay ningúna cuenta disponible
                </p>
            ) : (
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Tipo</th>
                            <th>Saldo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account._id}>
                                <td>{account.nameAccount}</td>
                                <td>{account.description}</td>
                                <td>{account.type}</td>
                                <td>{account.balance}</td>
                                <td>-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
