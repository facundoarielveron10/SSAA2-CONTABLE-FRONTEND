// COMPONENTS
import Spinner from "../Spinner";
import SelectsSupplier from "./SelectsSupplier";

export default function Suppliers({
    loading,
    suppliers,
    suppliersSelected,
    handleSupplierSelect,
}) {
    return (
        <>
            <h2 className="form-subtitle">Proveedores</h2>
            {loading ? (
                <div className="spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="supplier-container">
                    {suppliers?.map((supplier) => (
                        <SelectsSupplier
                            key={supplier?._id}
                            supplier={supplier}
                            suppliersSelected={suppliersSelected}
                            handleSupplierSelect={handleSupplierSelect}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
