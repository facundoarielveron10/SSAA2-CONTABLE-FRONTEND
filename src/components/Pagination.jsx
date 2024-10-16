// CSS
import "@styles/pagination.css";

export default function Pagination({
    handleNextPage,
    handlePreviousPage,
    currentPage,
    totalPages,
}) {
    // FUNCTIONS
    const isDisabledPrevious = () => {
        if (currentPage === 1) {
            return true;
        }

        return false;
    };

    const isDisabledNext = () => {
        if (currentPage === totalPages) {
            return true;
        }

        return false;
    };

    return (
        <div className="pagination">
            <button
                type="button"
                className={`button ${
                    isDisabledPrevious() ? "pagination-disabled" : ""
                }`}
                onClick={handlePreviousPage}
                disabled={isDisabledPrevious()}
            >
                Anterior
            </button>
            <span className="pagination-page">
                {currentPage} de {totalPages}
            </span>
            <button
                type="button"
                className={`button ${
                    isDisabledNext() ? "pagination-disabled" : ""
                }`}
                onClick={handleNextPage}
                disabled={isDisabledNext()}
            >
                Siguiente
            </button>
        </div>
    );
}
