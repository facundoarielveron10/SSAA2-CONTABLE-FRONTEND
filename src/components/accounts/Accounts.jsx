// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { getAccounts } from "../../utils/getData.js";
import { errorResponse } from "../../utils/error.js";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./Table.jsx";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Accounts() {
    // STATES
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getAccountsData = async () => {
            try {
                setLoading(true);
                const data = await getAccounts();
                setAccounts(data.accounts);
            } catch (error) {
                toast.error(errorResponse(error));
            } finally {
                setLoading(false);
            }
        };

        getAccountsData();
    }, []);

    return (
        <>
            <Alert />
            <div className="accounts">
                <h1 className="title">Listado de Cuentas</h1>
                <p className="paragraph">
                    En este Listado se puede ver todas las cuentas que existen
                    en el sistema, donde tambien se puede crear, editar y
                    elminar cuentas
                </p>
                {loading ? (
                    <div className="accounts-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <Table accounts={accounts} />
                    </div>
                )}
            </div>
            {canExecute("CREATE_ACCOUNT") ? (
                <a href="create-account" className="accounts-button button">
                    Crear cuenta
                </a>
            ) : null}
        </>
    );
}
