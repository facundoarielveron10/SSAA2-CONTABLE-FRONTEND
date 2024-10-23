// RESPONSIVE
import { useMediaQuery } from "react-responsive";

// COMPONENTS
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";

export default function Navbar() {
    // RESPONSIVE
    const isDesktop = useMediaQuery({ query: "(min-width: 1068px)" });

    return (
        <div>
            {isDesktop ? (
                <NavbarDesktop url={window.location.pathname} />
            ) : (
                <NavbarMobile url={window.location.pathname} />
            )}
        </div>
    );
}
