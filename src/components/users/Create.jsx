// CSS
import "../../css/users/create-edit.css";
import "../../css/auth/form.css";

// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles } from "../../utils/getData.js";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

export default function Create() {
    // STATES
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);

    // FUNCTIONS
    const resetValues = () => {
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [name, lastname, email, password, passwordConfirm, role].includes(
                ""
            )
        ) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/create-user", {
                name,
                lastname,
                email,
                password,
                passwordConfirm,
                role,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // EFFECTS
    useEffect(() => {
        const getRolesData = async () => {
            const data = await getRoles();
            setRoles(data);
        };

        getRolesData();
    }, []);

    return (
        <>
            <Alert />
            <div className="createEditUser">
                <h1 className="title">Creacion de Usuario</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear un nuevo
                    usuario, donde deberas colocar el nombre, apellido, email,
                    contraseña y el rol del nuevo usuario.
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
                    {/* LASTNAME */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="lastname">
                            Apellido
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
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
                    {/* PASSWORD */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* PASSWORD CONFIRM */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="passwordConfirm">
                            Repetir Contraseña
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    {/* ROL DEL USUARIO */}
                    <div className="form-group createEditUser-select">
                        <label className="form-label" htmlFor="passwordConfirm">
                            Rol del usuario
                        </label>
                        <select
                            className="form-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option
                                disabled
                                className="createEditUser-option"
                                value=""
                            >
                                Seleccionar Rol
                            </option>
                            {roles.length > 0
                                ? roles.map((rol) => (
                                      <option
                                          key={rol._id}
                                          className="createEditUser-option"
                                          value={rol.name}
                                      >
                                          {rol.nameDescriptive}
                                      </option>
                                  ))
                                : null}
                        </select>
                    </div>

                    <button
                        className="createEditUser-button form-submit button"
                        type="submit"
                    >
                        Crear usuario
                    </button>
                </form>
            </div>
        </>
    );
}
