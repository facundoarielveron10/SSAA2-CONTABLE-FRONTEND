// REACT
import { useState } from "react";

// ALERT
import { toast } from "react-toastify";
import Alert from "../Alert";

export default function Create() {
    // STATES
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        step1: {},
        step2: {},
        step3: {},
    });

    // FUNCTIONS
    const validateStep = () => {
        const currentData = formData[`step${step}`];
        if (step === 1 && !currentData.name) return false;
        if (step === 2 && !currentData.details) return false;
        if (step === 3 && !currentData.extra) return false;
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) {
            toast.error("Debes completar todos los campos antes de continuar");
            return;
        }
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleStepClick = (num) => {
        if (num > step && !validateStep()) {
            toast.error("Debes completar todos los campos antes de continuar");
            return;
        }
        setStep(num);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [`step${step}`]: {
                ...formData[`step${step}`],
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Orden de compra creada exitosamente");
    };

    return (
        <>
            <Alert />
            <div className="content">
                <h1 className="title">Realizar Orden de Compra</h1>
                <div className="order">
                    <div className="order-steps">
                        {[1, 2, 3, 4].map((num) => (
                            <div
                                key={num}
                                className={`order-step ${
                                    step >= num ? "order-active" : ""
                                }`}
                                onClick={() => handleStepClick(num)}
                                style={{ cursor: "pointer" }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <Step1
                                data={formData.step1}
                                onChange={handleChange}
                            />
                        )}
                        {step === 2 && (
                            <Step2
                                data={formData.step2}
                                onChange={handleChange}
                            />
                        )}
                        {step === 3 && (
                            <Step3
                                data={formData.step3}
                                onChange={handleChange}
                            />
                        )}
                        {step === 4 && <Summary data={formData} />}

                        <div className="order-buttons">
                            {step > 1 && (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={handlePrevious}
                                >
                                    Anterior
                                </button>
                            )}
                            {step < 4 ? (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={handleNext}
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button className="button" type="submit">
                                    Confirmar Orden
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

function Step1({ data, onChange }) {
    return (
        <div>
            <h2 className="form-subtitle">Pedidos de Compras</h2>
        </div>
    );
}

function Step2({ data, onChange }) {
    return (
        <div>
            <h2 className="form-subtitle">Proveedores</h2>
        </div>
    );
}

function Step3({ data, onChange }) {
    return (
        <div>
            <h2 className="form-subtitle">Orden de Compra</h2>
        </div>
    );
}

function Summary({ data }) {
    return (
        <div>
            <h2 className="form-subtitle">Resumen</h2>
        </div>
    );
}
