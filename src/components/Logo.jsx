// ANIMATED
import { useSpring, animated } from "react-spring";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

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
    const { primaryColor } = useLoginStore();

    // ANIMATED
    const animationProps = useSpring({
        transform: clicked
            ? "rotate(360deg) scale(1.2)"
            : "rotate(0deg) scale(1)",
        config: { tension: 200, friction: 10 },
    });

    return (
        <div
            className="logo"
            onClick={() => setClicked(!clicked)}
            style={{ cursor: "pointer", color: primaryColor }} // Aplica color al `fill="currentColor"`
        >
            {animation ? (
                <animated.svg
                    width={width}
                    height={height}
                    viewBox="0 0 291 213"
                    xmlns="http://www.w3.org/2000/svg"
                    style={animationProps}
                    fill="currentColor" // Usa el color del contenedor
                >
                    <g
                        transform="translate(0.000000,213.000000) scale(0.100000,-0.100000)"
                        fill="currentColor"
                        stroke="none"
                    >
                        <path
                            d="M1368 2060 c-174 -30 -347 -149 -455 -312 -47 -73 -49 -74 -154 -82
-107 -8 -200 -51 -331 -152 -131 -102 -388 -402 -388 -454 0 -33 189 -270 287
-360 177 -163 299 -228 444 -237 l86 -6 49 -74 c100 -153 258 -271 414 -307
266 -63 561 70 714 323 l36 58 67 6 c88 7 190 41 250 83 26 18 71 48 98 67
107 72 291 270 374 403 l34 54 -33 48 c-70 98 -204 254 -263 307 -59 52 -132
107 -207 158 -62 42 -168 78 -247 84 l-73 6 -45 67 c-158 238 -411 361 -657
320z m187 -255 c32 -9 81 -28 108 -43 48 -26 187 -146 187 -161 0 -13 -380
-363 -389 -359 -5 2 -63 55 -128 118 -65 63 -148 142 -185 174 -38 33 -68 65
-68 71 0 16 93 104 148 140 48 32 179 74 232 74 20 1 62 -6 95 -14z m-581
-438 c78 -65 316 -299 316 -312 0 -6 -9 -16 -20 -21 -10 -5 -79 -68 -152 -140
-73 -72 -149 -140 -168 -150 -27 -15 -56 -19 -125 -19 -83 0 -96 3 -160 34
-56 28 -95 59 -198 161 -70 70 -127 134 -127 141 0 20 213 243 268 281 81 55
126 69 228 65 89 -3 93 -4 138 -40z m1292 9 c45 -22 90 -60 192 -162 72 -74
132 -139 132 -145 0 -24 -161 -198 -240 -260 -117 -92 -273 -115 -374 -55 -23
14 -108 90 -191 170 -144 140 -149 146 -130 161 11 9 60 55 110 104 139 136
215 200 249 211 17 5 67 8 112 7 65 -3 93 -9 140 -31z m-721 -557 c39 -38 123
-118 188 -177 64 -58 117 -110 117 -115 0 -4 -29 -37 -65 -71 -165 -160 -371
-187 -550 -74 -54 34 -155 127 -155 143 0 6 26 35 58 63 31 27 116 107 187
176 72 69 135 125 140 126 6 0 42 -32 80 -71z"
                        />
                    </g>
                </animated.svg>
            ) : (
                <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    viewBox="0 0 291.000000 213.000000"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g
                        transform="translate(0.000000,213.000000) scale(0.100000,-0.100000)"
                        fill="currentColor"
                        stroke="none"
                    >
                        <path
                            d="M1368 2060 c-174 -30 -347 -149 -455 -312 -47 -73 -49 -74 -154 -82
-107 -8 -200 -51 -331 -152 -131 -102 -388 -402 -388 -454 0 -33 189 -270 287
-360 177 -163 299 -228 444 -237 l86 -6 49 -74 c100 -153 258 -271 414 -307
266 -63 561 70 714 323 l36 58 67 6 c88 7 190 41 250 83 26 18 71 48 98 67
107 72 291 270 374 403 l34 54 -33 48 c-70 98 -204 254 -263 307 -59 52 -132
107 -207 158 -62 42 -168 78 -247 84 l-73 6 -45 67 c-158 238 -411 361 -657
320z m187 -255 c32 -9 81 -28 108 -43 48 -26 187 -146 187 -161 0 -13 -380
-363 -389 -359 -5 2 -63 55 -128 118 -65 63 -148 142 -185 174 -38 33 -68 65
-68 71 0 16 93 104 148 140 48 32 179 74 232 74 20 1 62 -6 95 -14z m-581
-438 c78 -65 316 -299 316 -312 0 -6 -9 -16 -20 -21 -10 -5 -79 -68 -152 -140
-73 -72 -149 -140 -168 -150 -27 -15 -56 -19 -125 -19 -83 0 -96 3 -160 34
-56 28 -95 59 -198 161 -70 70 -127 134 -127 141 0 20 213 243 268 281 81 55
126 69 228 65 89 -3 93 -4 138 -40z m1292 9 c45 -22 90 -60 192 -162 72 -74
132 -139 132 -145 0 -24 -161 -198 -240 -260 -117 -92 -273 -115 -374 -55 -23
14 -108 90 -191 170 -144 140 -149 146 -130 161 11 9 60 55 110 104 139 136
215 200 249 211 17 5 67 8 112 7 65 -3 93 -9 140 -31z m-721 -557 c39 -38 123
-118 188 -177 64 -58 117 -110 117 -115 0 -4 -29 -37 -65 -71 -165 -160 -371
-187 -550 -74 -54 34 -155 127 -155 143 0 6 26 35 58 63 31 27 116 107 187
176 72 69 135 125 140 126 6 0 42 -32 80 -71z"
                        />
                    </g>
                </svg>
            )}

            {name ? <p className="logo-name">Contalytic</p> : null}
        </div>
    );
}
