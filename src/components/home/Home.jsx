// UTILS
import { getSections } from "src/utils/getData";

// COMPONENTS
import Card from "./Card";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

export default function Home() {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    // SECTIONS
    const sections = getSections();

    return (
        <div className="home">
            <h1 className="title">Inicio</h1>
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
