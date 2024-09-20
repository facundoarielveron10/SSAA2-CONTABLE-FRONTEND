// CSS
import "../../css/accounts/accounts.css";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

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
                            <th className="accounts-head-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account._id}>
                                <td>{account.nameAccount}</td>
                                <td>{account.description}</td>
                                <td>{account.type}</td>
                                <td>{account.balance}</td>
                                <td>
                                    <div className="accounts-buttons">
                                        {canExecute("EDIT_ACCOUNT") ? (
                                            <a
                                                href={`edit-account/${account._id}`}
                                                className="accounts-button-table accounts-edit button"
                                            >
                                                Editar
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
