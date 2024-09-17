// CSS
import "../../css/accounts/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// ALERTS
import toast from "react-hot-toast";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [balance, setBalance] = useState(0);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setDescription("");
        setType("");
        setBalance(0);
    };

    const handleChangeBalance = (value) => {
        const numericValue = Math.max(0, parseFloat(value));

        if (value) {
            setBalance(Number(numericValue));
        } else {
            setBalance(Number(0));
        }
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
                balance,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <>
            <Alert />
            <div className="createEditAccount">
                <h1 className="title">Creacion de Cuenta</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear una nueva
                    cuenta, donde debemos colocarle un nombre, descripcion, tipo
                    y saldo de la cuenta.
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
                        {/* SALDO */}
                        <div className="form-group createEditAccount-group">
                            <label className="form-label" htmlFor="balance">
                                Saldo de la cuenta
                            </label>
                            <input
                                className="form-input createEditAccount-input"
                                type="number"
                                id="balance"
                                min={0}
                                value={balance}
                                onChange={(e) =>
                                    handleChangeBalance(e.target.value)
                                }
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
                                -- Selecciona un tipo de cuenta --
                            </option>
                            <option value="Activo">Activo</option>
                            <option value="Pasivo">Pasivo</option>
                            <option value="Resultado+">Resultado +</option>
                            <option value="Resultado-">Resultado -</option>
                            <option value="PN">Patrimonio Neto</option>
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
