// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState, useEffect } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

export default function Create({ id }) {
    // STATES
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState({});

    // FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, description].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (name === category?.name && description === category?.description) {
            toast.error("No se ha modificado ningun campo");
            return;
        }

        try {
            const { data } = await clientAxios.post("/category/edit-category", {
                idCategory: id,
                newName: name,
                newDescription: description,
            });

            toast.success(data);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const getCategory = async () => {
        try {
            const { data } = await clientAxios.get(`/category/category/${id}`);

            setCategory(data);
            setName(data?.name);
            setDescription(data?.description);
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // EFFECTS
    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div>
            <Alert />
            <div className="content">
                <h1 className="title">Edicion de Categoria</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar la
                    categoria, donde podemos cambiar los datos de nombre de la
                    misma
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
                        Editar categoria
                    </button>
                </form>
            </div>
        </div>
    );
}
