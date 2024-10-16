// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// UTILS
import { formatBalance } from "../../utils/format";

export default function Table({ accounts }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    // CODES
    const codesByType = {
        Activo: 1000,
        Pasivo: 2000,
        "R+": 3000,
        "R-": 4000,
        PN: 5000,
    };

    // NAMES
    const formattedTypeNames = {
        Activo: "Activo",
        Pasivo: "Pasivo",
        "R+": "Resultados Positivos",
        "R-": "Resultados Negativos",
        PN: "Patrimonio Neto",
    };

    // FUNCTIONS
    const groupedAccounts = accounts.reduce((acc, account) => {
        const { type } = account;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(account);
        return acc;
    }, {});

    return (
        <div className="accounts-list">
            <h2 className="accounts-subtitle">Cuentas</h2>

            {accounts.length === 0 ? (
                <p className="accounts-no-accounts">
                    No hay ninguna cuenta disponible
                </p>
            ) : (
                Object.keys(groupedAccounts).map((type) => (
                    <div key={type}>
                        <div className="accounts-table-header">
                            <h3>{formattedTypeNames[type]}</h3>
                            <h3>{codesByType[type]}</h3>
                        </div>
                        <table className="accounts-table">
                            <thead>
                                <tr>
                                    <th className="accounts-table-col-code">
                                        Código
                                    </th>
                                    <th className="accounts-table-col-name">
                                        Nombre
                                    </th>
                                    <th className="accounts-table-col-description">
                                        Descripción
                                    </th>
                                    <th className="accounts-table-col-balance">
                                        Saldo
                                    </th>
                                    <th className="accounts-table-col-actions">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedAccounts[type].map((account) => (
                                    <tr key={account._id}>
                                        <td className="accounts-table-col-code">
                                            {account.code}
                                        </td>
                                        <td className="accounts-table-col-name">
                                            {account.nameAccount}
                                        </td>
                                        <td className="accounts-table-col-description">
                                            {account.description}
                                        </td>
                                        <td className="accounts-table-col-balance">
                                            ${formatBalance(account.balance)}
                                        </td>
                                        <td className="accounts-table-col-actions">
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
                    </div>
                ))
            )}
        </div>
    );
}
