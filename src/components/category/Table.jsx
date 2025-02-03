// UTILS
import { formatBalance } from "src/utils/format";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    categories,
    onOpenDeleteCategoryModal,
    handleActive,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Categorias</h2>
                </div>
                {categories.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningúna categoria disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th className="table-header-actions">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        {category.active ? (
                                            <div className="table-actions">
                                                {canExecute(
                                                    "EDIT_CATEGORIES"
                                                ) ? (
                                                    <a
                                                        href={`edit-category/${category._id}`}
                                                        className="table-button button"
                                                    >
                                                        Editar
                                                    </a>
                                                ) : null}
                                                {canExecute(
                                                    "DELETE_CATEGORIES"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            onOpenDeleteCategoryModal(
                                                                category
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
                                                    "ACTIVE_CATEGORIES"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handleActive(
                                                                category._id
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
