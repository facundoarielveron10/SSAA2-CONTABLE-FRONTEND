export default function TableArticles({ articles }) {
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
                                <th className="table-40">Descripcion</th>
                                <th className="table-20">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article, index) => (
                                <tr key={index}>
                                    <td>{article?.article?.name}</td>
                                    <td>{article?.article?.description}</td>
                                    <td>{article?.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
