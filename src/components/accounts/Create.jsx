// CSS
import "../../css/accounts/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getAccounts } from "../../utils/getData";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setDescription("");
        setType("");
        setAccount("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, description, type].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/account/create-account", {
                name,
                description,
                type,
                accountId: account,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

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
            <div className="createEditAccount">
                <h1 className="title">Creacion de Cuenta</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear una nueva
                    cuenta, donde debemos colocarle un nombre, descripcion y
                    tipo de cuenta
                </p>

                <form
                    className="createEditAccount-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form">
                        {/* NOMBRE */}
                        <div className="form-group createEditAccount-group">
                            <label className="form-label" htmlFor="name">
                                Nombre de la cuenta
                            </label>
                            <input
                                className="form-input createEditAccount-input"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* DESCRIPCIÓN DE LA CUENTA */}
                        <div className="form-group createEditAccount-group">
                            <label className="form-label" htmlFor="description">
                                Descripción de la cuenta
                            </label>
                            <textarea
                                className="form-input createEditAccount-input"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="createEditAccount-typeAccount">
                        <label
                            className="createEditAccount-type-label"
                            htmlFor="type"
                        >
                            Tipo de cuenta
                        </label>
                        <select
                            className="createEditAccount-type-select"
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option disabled defaultChecked value="">
                                Selecciona un tipo de cuenta
                            </option>
                            <option value="Activo">Activo</option>
                            <option value="Pasivo">Pasivo</option>
                            <option value="R+">Resultado +</option>
                            <option value="R-">Resultado -</option>
                            <option value="PN">Patrimonio Neto</option>
                        </select>
                    </div>

                    <div className="createEditAccount-typeAccount">
                        <label
                            className="createEditAccount-type-label"
                            htmlFor="type"
                        >
                            Hijo/a de cuenta
                        </label>
                        <select
                            className="createEditAccount-type-select"
                            id="account"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        >
                            <option defaultChecked value="">
                                Ninguna cuenta
                            </option>
                            {accounts.map((account) => (
                                <option key={account._id} value={account._id}>
                                    {account.nameAccount}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="createEditAccount-button button">
                        Crear cuenta
                    </button>
                </form>
            </div>
        </>
    );
}
