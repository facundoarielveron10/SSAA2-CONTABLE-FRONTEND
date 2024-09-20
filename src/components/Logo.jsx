// CSS
import "../css/logo.css";

// ANIMATED
import { useSpring, animated } from "react-spring";

// IMG
import logo from "../assets/logotipo.png";

// REACT
import { useState } from "react";

export default function Logo({
    animation = false,
    name = false,
    className = "",
    width = 50,
    height = 40,
}) {
    // STATES
    const [clicked, setClicked] = useState(false);

    // ANIMATED
    const animationProps = useSpring({
        transform: clicked
            ? "rotate(360deg) scale(1.2)"
            : "rotate(0deg) scale(1)",
        config: { tension: 200, friction: 10 },
    });

    return (
        <>
            <div
                className="logo"
                onClick={() => setClicked(!clicked)}
                style={{ cursor: "pointer" }}
            >
                {animation ? (
                    <animated.img
                        className={className}
                        src={logo.src}
                        alt="Logotipo"
                        width={width}
                        height={height}
                        style={animationProps}
                    />
                ) : (
                    <img
                        className={className}
                        src={logo.src}
                        alt="Logotipo"
                        width={width}
                        height={height}
                    />
                )}

                {name ? <p className="logo-name">Contalytic</p> : null}
            </div>
        </>
    );
}
