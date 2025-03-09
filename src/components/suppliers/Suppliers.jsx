// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getSuppliers } from "src/utils/getData";

// COMPONENTS
import Table from "./Table";
import Spinner from "../Spinner";
import Pagination from "../Pagination";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import DeleteSupplierModal from "../modal/DeleteSupplierModal";

export default function Categories() {
    // STATES
    const [suppliers, setSuppliers] = useState([]);
    const [open, setOpen] = useState(false);
    const [supplierDelete, setSupplierDelete] = useState({});
    const [loading, setLoading] = useState(false);
    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getSuppliersData = async () => {
            setLoading(true);
            const data = await getSuppliers(currentPage, limit);
            setSuppliers(data.suppliers);
            setTotalPages(data.totalPages);
            setLoading(false);
        };

        getSuppliersData();
    }, [currentPage]);

    // FUNCTIONS
    const onOpenDeleteSupplierModal = (supplier) => {
        setOpen(true);
        setSupplierDelete(supplier);
    };

    const onCloseDeleteSupplierModal = () => {
        setOpen(false);
        setSupplierDelete({});
    };

    const handleDeleteSupplier = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                "/supplier/delete-supplier",
                {
                    idSupplier: supplierDelete._id,
                }
            );

            toast.success(data);
            onCloseDeleteSupplierModal();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleActive = async (id) => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                "/supplier/active-supplier",
                {
                    idSupplier: id,
                }
            );

            toast.success(data);
            window.location.reload();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Listado de Proveedores</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Proveedores que
                    existen en el sistema, donde tambien se puede crear nuevos
                    Proveedores
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <Table
                            suppliers={suppliers}
                            onOpenDeleteSupplierModal={
                                onOpenDeleteSupplierModal
                            }
                            handleActive={handleActive}
                        />
                        {suppliers.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <DeleteSupplierModal
                open={open}
                onCloseDeleteSupplierModal={onCloseDeleteSupplierModal}
                handleDeleteSupplier={handleDeleteSupplier}
                supplierDelete={supplierDelete}
            />
            {canExecute("CREATE_SUPPLIERS") ? (
                <a href="/create-supplier" className="button-position button">
                    Crear Proveedor
                </a>
            ) : null}
        </>
    );
}
