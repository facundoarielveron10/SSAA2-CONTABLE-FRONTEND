// UTILS
import { getSections } from "src/utils/getData";

// COMPONENTS
import Card from "./Card";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";
import Statistics from "./Statistics";

export default function Home() {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    // SECTIONS
    const sections = getSections();

    return (
        <div className="home">
            {canExecute("GET_STATS") ? (
                <>
                    <h2 className="title">Estadisticas</h2>
                    <p className="paragraph">
                        En esta seccion se podran visualizar la estadistica de
                        la cantidad de asientos registrados en el año actual,
                        ademas de otros datos importantes
                    </p>
                    <Statistics />
                </>
            ) : null}
            <h1 className="title">Secciones</h1>
            <p className="paragraph">
                En esta seccion podras encontrar acceso a todas las secciones
                importantes del sistema, siempre y cuando tengas permisos a esas
                secciones.
            </p>
            <div className="home-sections">
                {sections.map(
                    (section, index) =>
                        canExecute(section.permission) && (
                            <Card
                                key={index}
                                title={section.title}
                                description={section.description}
                                url={section.url}
                            />
                        )
                )}
            </div>
        </div>
    );
}
