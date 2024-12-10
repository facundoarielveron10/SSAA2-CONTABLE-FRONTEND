// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setAddress("");
        setPhone("");
        setEmail("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, address, phone, email].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                "/supplier/create-supplier",
                {
                    name,
                    address,
                    phone,
                    email,
                }
            );
            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Creacion de Proveedor</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo
                    proveedor, donde deberas colocar el nombre, direccion,
                    telefono y email de contacto.
                </p>

                <form className="form" onSubmit={handleSubmit}>
                    {/* NAME */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* ADDRESS */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="address">
                            Direccion
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    {/* PHONE */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">
                            Telefono
                        </label>
                        <input
                            className="form-input"
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    {/* EMAIL */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        className="form-button form-submit button"
                        type="submit"
                    >
                        Crear Proveedor
                    </button>
                </form>
            </div>
        </>
    );
}
