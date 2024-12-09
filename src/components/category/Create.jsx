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
    const [description, setDescription] = useState("");

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

        try {
            const { data } = await clientAxios.post(
                "/category/create-category",
                {
                    name,
                    description,
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
                <h1 className="title">Creacion de Categoria</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear una nueva
                    categoria, donde deberas colocar el nombre de la misma
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
                    {/* DESCRIPTION */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">
                            Descripcion
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button
                        className="form-button form-submit button"
                        type="submit"
                    >
                        Crear categoria
                    </button>
                </form>
            </div>
        </>
    );
}
