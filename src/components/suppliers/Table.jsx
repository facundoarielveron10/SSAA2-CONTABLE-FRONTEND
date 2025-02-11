// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    suppliers,
    onOpenDeleteSupplierModal,
    handleActive,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Proveedores</h2>
                </div>
                {suppliers.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningún proveedor disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th className="table-10">Nombre</th>
                                <th className="table-40">Direccion</th>
                                <th className="table-20">Telefono</th>
                                <th className="table-20">Email</th>
                                <th className="table-10">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier) => (
                                <tr key={supplier._id}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.email}</td>
                                    <td>
                                        {supplier.active ? (
                                            <div className="table-actions">
                                                {canExecute(
                                                    "EDIT_SUPPLIERS"
                                                ) ? (
                                                    <a
                                                        href={`edit-supplier/${supplier._id}`}
                                                        className="table-button button"
                                                    >
                                                        Editar
                                                    </a>
                                                ) : null}
                                                {canExecute(
                                                    "DELETE_SUPPLIERS"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            onOpenDeleteSupplierModal(
                                                                supplier
                                                            )
                                                        }
                                                        className="table-button table-delete button"
                                                    >
                                                        Eliminar
                                                    </button>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <div className="table-actions">
                                                {canExecute(
                                                    "ACTIVE_SUPPLIERS"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handleActive(
                                                                supplier._id
                                                            )
                                                        }
                                                        className="table-button button"
                                                    >
                                                        Activar
                                                    </button>
                                                ) : null}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
