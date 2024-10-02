// CSS
import "../../css/books/createSeat.css";
import "../../css/auth/form.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { generateID } from "../../utils/utils";
import { errorResponse } from "../../utils/error";

// ICONS
import { IoIosAdd } from "react-icons/io";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// COMPONENTS
import Table from "./Table";

export default function CreateSeat() {
    // STATES
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState("");
    const [debe, setDebe] = useState(0);
    const [haber, setHaber] = useState(0);
    const [seats, setSeats] = useState([]);
    const [accounts, setAccounts] = useState([]);

    // EFFECTS
    useEffect(() => {
        getAccounts();
    }, []);

    // FUNCTIONS
    const resetValues = () => {
        setAccount("");
        setDebe(0);
        setHaber(0);
    };

    const getAccounts = async () => {
        try {
            const { data } = await clientAxios.get(
                "/account/accounts/childless"
            );

            setAccounts(data);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviar...");

        try {
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleChangeValue = (value, type) => {
        if (type === "debe") setDebe(value === "" ? 0 : Number(value));
        if (type === "haber") setHaber(value === "" ? 0 : Number(value));
    };

    const handleAdd = () => {
        if (!account || (debe <= 0 && haber <= 0)) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (debe > 0 && haber > 0) {
            toast.error("Valores de Debe y Haber incorrectos");
            return;
        }

        if (debe > 0) {
            setHaber(0);
        } else if (haber > 0) {
            setDebe(0);
        }

        const newSeat = {
            id: generateID(),
            account,
            debe,
            haber,
        };

        setSeats((prevSeats) => [...prevSeats, newSeat]);

        resetValues();

        toast.success("Asiento agregado correctamente.");
    };

    const handleDelete = (seatId) => {
        const seatsFilter = seats.filter((seat) => seat.id !== seatId);
        setSeats(seatsFilter);
    };

    const getNameAccount = (accountId) => {
        const accountData = accounts.find(
            (account) => account._id === accountId
        );

        if (accountData) {
            return accountData.nameAccount;
        } else {
            return null;
        }
    };

    return (
        <>
            <Alert />
            <div className="createSeat">
                <h1 className="title">Creacion de Asiento</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo
                    asiento, donde debera ir presionando en el mas para ir
                    sumando datos.
                </p>

                <form className="createSeat-form" onSubmit={handleSubmit}>
                    <div className="form">
                        <h2 className="createSeat-form-title">
                            Descripcion del asiento
                        </h2>
                        {/* DESCRIPCION */}
                        <div className="form-group createSeat-group">
                            <label className="form-label" htmlFor="name">
                                Descripcion del Asiento
                            </label>
                            <input
                                className="form-input createSeat-input"
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form">
                        <h2 className="createSeat-form-title">
                            Datos del Asiento
                        </h2>
                        {/* CUENTAS */}
                        <div className="createSeat-account">
                            <label
                                className="createSeat-account-label form-label"
                                htmlFor="accounts"
                            >
                                Cuenta
                            </label>
                            <select
                                className="createSeat-account-select"
                                id="accounts"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                            >
                                <option defaultChecked value="">
                                    Selecciona una cuenta
                                </option>
                                {accounts.map((account) => (
                                    <option
                                        key={account._id}
                                        value={account._id}
                                    >
                                        {account.nameAccount}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* DEBE */}
                        <div className="form-group createSeat-group">
                            <label className="form-label" htmlFor="name">
                                Debe del Asiento
                            </label>
                            <input
                                className="form-input createSeat-input"
                                type="number"
                                id="debe"
                                min={0}
                                value={debe}
                                onChange={(e) =>
                                    handleChangeValue(e.target.value, "debe")
                                }
                            />
                        </div>
                        {/* HABER */}
                        <div className="form-group createSeat-group">
                            <label className="form-label" htmlFor="name">
                                Haber del Asiento
                            </label>
                            <input
                                className="form-input createSeat-input"
                                type="number"
                                id="haber"
                                min={0}
                                value={haber}
                                onChange={(e) =>
                                    handleChangeValue(e.target.value, "haber")
                                }
                            />
                        </div>
                        {/* AGREGAR ASIENTO */}
                        <div className="createSeat-add-container">
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="createSeat-add"
                            >
                                <IoIosAdd className="createSeat-icon" />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="createSeat-button button">
                        Crear Asiento
                    </button>
                </form>

                {seats.length === 0 ? (
                    <p className="createSeat-seats-empty">
                        Aun no se ha agregado ningun asiento
                    </p>
                ) : (
                    <div className="createSeat-seats-container">
                        <Table
                            seats={seats}
                            getNameAccount={getNameAccount}
                            handleDelete={handleDelete}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
