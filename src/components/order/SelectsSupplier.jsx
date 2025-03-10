// REACT
import { useEffect, useState } from "react";

export default function SelectsSupplier({
    supplier,
    suppliersSelected,
    handleSupplierSelect,
}) {
    // STATES
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedSupplierPrice, setSelectedSupplierPrice] =
        useState("No disponible");

    // EFFECTS
    useEffect(() => {
        suppliersSelected.forEach((s) => {
            let articleSearch = s.articles.find(
                (a) => a._id === supplier.article._id
            );
            if (articleSearch) {
                setSelectedSupplierPrice(articleSearch.price);
                setSelectedSupplier(s.supplier);
            }
        });
    }, []);

    // FUNCTIONS
    const handleSelect = (article, supplier) => {
        setSelectedSupplier(supplier);
        setSelectedSupplierPrice(supplier.price);
        handleSupplierSelect(article, supplier);
    };

    return (
        <div className="supplier-content">
            <p className="supplier-article">{supplier?.article?.name}</p>
            <div className="supplier">
                <select
                    className="form-select"
                    value={selectedSupplier?._id || ""}
                    onChange={(e) => {
                        const selected = supplier.suppliers.find(
                            (s) => s._id === e.target.value
                        );
                        handleSelect(supplier.article, selected);
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
                    <span className="supplier-price">
                        ${selectedSupplierPrice}
                    </span>
                )}
            </div>
        </div>
    );
}
