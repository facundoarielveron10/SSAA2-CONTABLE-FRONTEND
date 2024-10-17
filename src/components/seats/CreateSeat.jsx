// REACT
import { useEffect, useState } from "react";

// UTILS
import { generateID } from "../../utils/utils";
import { errorResponse } from "../../utils/error";

// ICONS
import { IoIosAdd } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// COMPONENTS
import TablePreview from "../diary/TablePreview";
import { getTotalsDebeHaber } from "../../utils/getData";
import Checkbox from "../Checkbox";

export default function CreateSeat() {
    // STATES
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState(0);
    const [debe, setDebe] = useState(false);
    const [haber, setHaber] = useState(false);
    const [seats, setSeats] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [seatIdEditing, setSeatIdEditing] = useState(null);

    // EFFECTS
    useEffect(() => {
        getAccounts();
    }, []);

    // FUNCTIONS
    const resetValues = () => {
        setAccount("");
        setDebe(false);
        setHaber(false);
        setAmount(0);
        setIsEditing(false); // Resetea la edición
        setSeatIdEditing(null);
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
        const { debe: totalDebe, haber: totalHaber } =
            getTotalsDebeHaber(seats);

        if (!description) {
            toast.error("El Campo Descripcion es Obligatorio");
            return;
        }

        if (seats.length < 2) {
            toast.error("Debe por lo menos contender 2 operaciones");
            return;
        }

        if (totalDebe - totalHaber !== 0) {
            toast.error("Valores de Debe y Haber Incorrectos");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                "/account-seat/create-seat",
                {
                    description,
                    seats,
                }
            );

            toast.success(data);
            resetValues();
            setSeats([]);
            setDescription("");
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleChangeValue = (value) => {
        setAmount(value === "" ? 0 : Number(value));
    };

    const handleAddOrEdit = () => {
        if (!account || amount <= 0) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (!debe && !haber) {
            toast.error('El monto debe ir por el "debe" o por el "haber"');
            return;
        }

        if (debe && haber) {
            toast.error("Valores de Debe y Haber incorrectos");
            return;
        }

        if (isEditing && seatIdEditing) {
            // Editar el asiento existente
            const updatedSeats = seats.map((seat) =>
                seat.id === seatIdEditing
                    ? {
                          ...seat,
                          account,
                          amount: {
                              amount,
                              type: debe ? "debe" : "haber",
                          },
                      }
                    : seat
            );
            setSeats(updatedSeats);
            toast.success("Asiento editado correctamente");
        } else {
            // Agregar nuevo asiento
            const newSeat = {
                id: generateID(),
                account,
                amount: {
                    amount,
                    type: debe ? "debe" : haber ? "haber" : null,
                },
            };

            setSeats((prevSeats) => [...prevSeats, newSeat]);
            toast.success("Asiento agregado correctamente");
        }

        resetValues();
    };

    const handleDelete = (seatId) => {
        const seatsFilter = seats.filter((seat) => seat.id !== seatId);
        setSeats(seatsFilter);
        setAccount("");
        setAmount(0);
        setDebe(false);
        setHaber(false);
        setIsEditing(false);
        setSeatIdEditing(null);
    };

    const handleEdit = (seat) => {
        setAccount(seat.account);
        setAmount(seat.amount.amount);
        setDebe(seat.amount.type === "debe");
        setHaber(seat.amount.type === "haber");
        setIsEditing(true);
        setSeatIdEditing(seat.id);
    };

    const getNameAccount = (accountId) => {
        const accountData = accounts.find(
            (account) => account._id === accountId
        );
        return accountData ? accountData.nameAccount : null;
    };

    const handleDebeChange = (value) => {
        setDebe(value);
        if (value) {
            setHaber(false);
        }
    };

    const handleHaberChange = (value) => {
        setHaber(value);
        if (value) {
            setDebe(false);
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
                        <div className="form-group createSeat-group">
                            <label className="form-label" htmlFor="description">
                                Descripcion
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
                        <div className="createSeat-account">
                            <label
                                className="createSeat-account-label form-label"
                                htmlFor="accounts"
                            >
                                Cuenta
                            </label>
                            <div className="createSeat-subgroup">
                                <div className="createSeat-subgroup-input">
                                    <select
                                        className="createSeat-account-select"
                                        id="accounts"
                                        value={account}
                                        onChange={(e) =>
                                            setAccount(e.target.value)
                                        }
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
                                <div className="createSeat-accountButtons">
                                    <a
                                        href="/accounts"
                                        className="createSeat-accountButton button"
                                    >
                                        Plan de cuentas
                                    </a>
                                    <a
                                        href="/create-account"
                                        className="createSeat-accountButton button"
                                    >
                                        Agregar cuenta
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="form-group createSeat-group">
                            <label className="form-label" htmlFor="amount">
                                Monto
                            </label>
                            <div className="createSeat-subgroup">
                                <div className="createSeat-subgroup-input">
                                    <input
                                        className="form-input createSeat-input"
                                        type="number"
                                        id="amount"
                                        min={0}
                                        value={amount}
                                        onChange={(e) =>
                                            handleChangeValue(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="createSeat-checkouts">
                                    <div className="createSeat-checkout">
                                        <label
                                            className="form-label"
                                            htmlFor="debe"
                                        >
                                            Debe
                                        </label>
                                        <Checkbox
                                            id="debe"
                                            checked={debe}
                                            onChange={(e) =>
                                                handleDebeChange(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="createSeat-checkout">
                                        <label
                                            className="form-label"
                                            htmlFor="haber"
                                        >
                                            Haber
                                        </label>
                                        <Checkbox
                                            id="haber"
                                            checked={haber}
                                            onChange={(e) =>
                                                handleHaberChange(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="createSeat-add-container">
                            <button
                                type="button"
                                onClick={handleAddOrEdit}
                                className="createSeat-add"
                            >
                                {isEditing ? (
                                    <FaPencil className="createSeat-icon-edit" />
                                ) : (
                                    <IoIosAdd className="createSeat-icon" />
                                )}
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
                        <TablePreview
                            seats={seats}
                            getNameAccount={getNameAccount}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
