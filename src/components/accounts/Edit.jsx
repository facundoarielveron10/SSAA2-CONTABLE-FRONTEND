// CSS
import "../../css/accounts/create-edit.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function Edit({ id }) {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState({});

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setDescription("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, description].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            name === account.nameAccount &&
            description === account.description
        ) {
            toast.error("No se han realizado cambios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/account/edit-account", {
                idAccount: id,
                name,
                description,
            });

            toast.success(data);
            getAccount();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const getAccount = async () => {
        try {
            const { data } = await clientAxios.get(`/account/account/${id}`);
            setAccount(data);
            setName(data.nameAccount);
            setDescription(data.description);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // EFFECTS
    useEffect(() => {
        getAccount();
    }, []);

    return (
        <>
            <Alert />
            <div className="createEditAccount">
                <h1 className="title">Edicion de Cuenta</h1>
                <p className="paragraph">
                    Edita los datos del siguiente formulario para editar una
                    cuenta, donde podemos editarle el nombre y la descripcion de
                    cuenta la cuenta
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

                    <button className="createEditAccount-button button">
                        Editar cuenta
                    </button>
                </form>
            </div>
        </>
    );
}
