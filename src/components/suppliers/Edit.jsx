// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState, useEffect } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

// COMPONENTS
import Spinner from "../Spinner.jsx";

export default function Edit({ id }) {
    // STATES
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [supplier, setSupplier] = useState({});
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, address, phone, email].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            name === supplier?.name &&
            address === supplier?.address &&
            phone === supplier?.phone &&
            email === supplier?.email
        ) {
            toast.error("No se ha modificado ningun campo");
            return;
        }

        try {
            const { data } = await clientAxios.post("/supplier/edit-supplier", {
                idSupplier: id,
                newName: name,
                newAddress: address,
                newPhone: phone,
                newEmail: email,
            });

            toast.success(data);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const getSupplier = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(`/supplier/supplier/${id}`);

            setSupplier(data);
            setName(data?.name);
            setAddress(data?.address);
            setPhone(data?.phone);
            setEmail(data?.email);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        getSupplier();
    }, []);

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
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
}
