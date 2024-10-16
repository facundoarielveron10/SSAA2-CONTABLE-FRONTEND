// CSS
import "@styles/search.css";

// ICONS
import { FaSearch } from "react-icons/fa";

const Search = ({ handleSearch, handleClean, search, setSearch }) => {
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="search-container">
            <div className="search-content">
                <input
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Buscar..."
                    className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
            <button type="button" onClick={handleClean} className="button">
                Limpiar
            </button>
        </div>
    );
};

export default Search;
