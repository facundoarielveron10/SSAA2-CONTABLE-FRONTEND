// UTILS
import { formatBalance, formatArrayToString } from "src/utils/format";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    articles,
    onOpenDeleteArticleModal,
    handleActive,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="table-container">
            <div className="table">
                <div className="table-header">
                    <h2 className="table-subtitle">Articulos</h2>
                </div>
                {articles.length === 0 ? (
                    <p className="table-no-data">
                        No hay ningún articulo disponible
                    </p>
                ) : (
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th className="table-20">Nombre</th>
                                <th className="table-20">Descripcion</th>
                                <th className="table-20">Categorias</th>
                                <th className="table-30">Proveedores</th>
                                <th className="table-10">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article._id}>
                                    <td>{article.name}</td>
                                    <td className="table-cell">
                                        <span className="table-cell-text">
                                            {article.description}
                                        </span>
                                    </td>

                                    <td>
                                        {formatArrayToString(
                                            article.categories
                                        )}
                                    </td>
                                    <td>
                                        {formatArrayToString(article.suppliers)}
                                    </td>
                                    <td>
                                        {article.active ? (
                                            <div className="table-actions">
                                                {canExecute("EDIT_ARTICLES") ? (
                                                    <a
                                                        href={`edit-article/${article._id}`}
                                                        className="table-button button"
                                                    >
                                                        Editar
                                                    </a>
                                                ) : null}
                                                {canExecute(
                                                    "DELETE_ARTICLES"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            onOpenDeleteArticleModal(
                                                                article
                                                            )
                                                        }
                                                        className="table-button table-delete button"
                                                    >
                                                        Eliminar
                                                    </button>
                                                ) : null}
                                                {canExecute("GET_STOCK") ? (
                                                    <a
                                                        href={`stock/${article._id}`}
                                                        className="table-button button"
                                                    >
                                                        Stock
                                                    </a>
                                                ) : null}
                                                {canExecute("GET_ARTICLES") ? (
                                                    <a
                                                        href={`prices/${article._id}`}
                                                        className="table-button button"
                                                    >
                                                        Precios
                                                    </a>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <div className="table-actions">
                                                {canExecute(
                                                    "ACTIVE_ARTICLES"
                                                ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handleActive(
                                                                article._id
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
