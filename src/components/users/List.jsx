// CSS
import "../../css/users/list.css";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

export default function List({ user }) {
    // STATES
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);

    // EFFECTS
    useEffect(() => {
        getUsers();
    }, []);

    // FUNCTIONS
    const getUsers = async () => {
        const { data } = await clientAxios.get(`/user/users/${user.id}`);

        const formattedData = data.map((userData) => {
            if (userData.role.name === "ROLE_ADMIN") {
                return {
                    ...userData,
                    role: { ...userData.role, name: "Administrador" },
                };
            }
            if (userData.role.name === "ROLE_USER") {
                return {
                    ...userData,
                    role: { ...userData.role, name: "Usuario" },
                };
            }
            return userData;
        });

        const filterAdmin = formattedData.filter(
            (userData) => userData.role.name === "Administrador"
        );
        const filterUser = formattedData.filter(
            (userData) => userData.role.name === "Usuario"
        );

        setAdmins(filterAdmin);
        setUsers(filterUser);
    };

    return (
        <div className="listUser">
            <h1 className="listUser-title">Listado de usuarios</h1>
            <div className="listUser-users">
                <div className="listUser-list">
                    <h2 className="listUser-subtitle">Administradores</h2>
                    <table className="listUser-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id}>
                                    <td>{admin._id}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.lastname}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.role.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="listUser-list">
                    <h2 className="listUser-subtitle">Usuarios</h2>
                    <table className="listUser-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
