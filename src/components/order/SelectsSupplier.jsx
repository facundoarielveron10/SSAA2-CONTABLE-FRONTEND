import { useEffect, useState } from "react";

export default function SelectsSupplier({
    supplier,
    suppliersSelected,
    handleSupplierSelect,
}) {

    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedSupplierPrice, setSelectedSupplierPrice] = useState("No disponible");

    useEffect(() => {
        suppliersSelected.forEach(s => {
            let articleSearch = s.articles.find(a => a._id === supplier.article._id);
            if(articleSearch){
                setSelectedSupplierPrice(articleSearch.price);
                setSelectedSupplier(s.supplier);
            }
        });
    }, []);

    const handleSelect = (article, supplier) => {
        setSelectedSupplier(supplier);
        setSelectedSupplierPrice(supplier.price);
        handleSupplierSelect(article, supplier);
    }

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
                    <span className="order-select-price">
                        ${selectedSupplierPrice}
                    </span>
                )}
            </div>
        </div>
    );
}
