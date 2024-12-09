// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

export default function Edit({ id }) {
    // STATES
    const [name, setName] = useState("Coca-Cola");
    const [address, setAddress] = useState(
        "Ramon Hernandez 872, Junín, Provincia de Buenos Aires"
    );
    const [phone, setPhone] = useState("+542364123456");
    const [email, setEmail] = useState("cocacola@company.com");

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
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    return (
        <div>
            <Alert />
            <div className="content">
                <h1 className="title">Edicion de Proveedor</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar el
                    proveedor, donde podemos cambiar los datos de nombre,
                    direccion, telefono y email de contacto.
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
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        className="form-button form-submit button"
                        type="submit"
                    >
                        Editar Proveedor
                    </button>
                </form>
            </div>
        </div>
    );
}
