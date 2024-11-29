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
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Cuentas</h2>
                </div>

                {accounts.length === 0 ? (
                    <p className="table-no-data">
                        No hay ninguna cuenta disponible
                    </p>
                ) : (
                    Object.keys(groupedAccounts).map((type) => (
                        <div key={type}>
                            <div className="table-subheader">
                                <h3>{formattedTypeNames[type]}</h3>
                                <h3>{codesByType[type]}</h3>
                            </div>
                            <table className="table-content">
                                <thead>
                                    <tr>
                                        <th className="table-10">Código</th>
                                        <th className="table-25">Nombre</th>
                                        <th className="table-45">
                                            Descripción
                                        </th>
                                        <th className="table-10">Saldo</th>
                                        <th className="table-10">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedAccounts[type].map((account) => (
                                        <tr key={account._id}>
                                            <td>{account.code}</td>
                                            <td>{account.nameAccount}</td>
                                            <td>{account.description}</td>
                                            <td>
                                                $
                                                {formatBalance(account.balance)}
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    {canExecute(
                                                        "EDIT_ACCOUNT"
                                                    ) ? (
                                                        <a
                                                            href={`edit-account/${account._id}`}
                                                            className="table-button button"
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
        </div>
    );
}
