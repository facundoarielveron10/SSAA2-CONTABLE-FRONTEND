export default function SelectsSupplier({
    supplier,
    suppliersSelected,
    handleSupplierSelect,
}) {
    // SUPPLIER
    const selectedSupplier =
        suppliersSelected.find((s) => s.articleId === supplier.article._id)
            ?.supplier || null;

    // PRICE
    const selectedSupplierPrice = selectedSupplier?.price || "No disponible";

    return (
        <div className="order-select">
            <p className="order-select-article">{supplier?.article?.name}</p>
            <div className="order-select-supplier">
                <select
                    className="form-select"
                    value={selectedSupplier?._id || ""}
                    onChange={(e) => {
                        const selected = supplier.suppliers.find(
                            (s) => s._id === e.target.value
                        );
                        handleSupplierSelect(supplier.article._id, selected);
                    }}
                >
                    <option disabled value="">
                        Seleccionar Proveedor
                    </option>
                    {supplier?.suppliers.map((supplierData) => (
                        <option
                            key={supplierData?._id}
                            value={supplierData._id}
                        >
                            {supplierData?.name}
                        </option>
                    ))}
                </select>
                {selectedSupplier && (
                    <span className="order-select-price">
                        ${selectedSupplierPrice}
                    </span>
                )}
            </div>
        </div>
    );
}
