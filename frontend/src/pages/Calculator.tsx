import {
    faDeleteLeft,
    faDivide,
    faSquareRootVariable,
    faSuperscript,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Calculator() {
    const navigate = useNavigate();
    const [operation, setOperation] = useState<(number | string)[]>([]);

    const openInNewWindow = () => {
        window.open("/calculator", "_blank", "width=400,height=600");
        navigate("/");
    };

    const handleCalculations = (value: string | number) => {
        console.log(operation);
        switch (value) {
            case "C":
                setOperation([]);

                break;
            case "√":
                if (operation.length == 1) {
                    const result = Math.sqrt(operation[operation.length - 1]);
                    operation[operation.length - 1] = result;
                    setOperation([...operation]);
                }
                break;
            case "<":
                setOperation(operation.slice(0, -1));
                break;
            default:
                if (value !== "=") {
                    setOperation([...operation, value]);
                }
                break;
        }

        if (value === "=") {
            const newOperation = operation.join("").split(/([+\-x/])/);
            console.log("Operación separada:", newOperation);

            // Prioridad: multiplicación y división
            for (let i = 0; i < newOperation.length; i++) {
                if (newOperation[i] === "x") {
                    const result =
                        Number(newOperation[i - 1]) *
                        Number(newOperation[i + 1]);
                    newOperation.splice(i - 1, 3, result.toString());
                    i -= 1; // Reajustar índice
                } else if (newOperation[i] === "/") {
                    if (newOperation[i + 1] !== "0") {
                        const result =
                            Number(newOperation[i - 1]) /
                            Number(newOperation[i + 1]);
                        newOperation.splice(i - 1, 3, result.toString());
                        i -= 1;
                    } else {
                        setOperation([]);

                        return;
                    }
                }
            }

            // Suma y resta
            for (let i = 0; i < newOperation.length; i++) {
                if (newOperation[i] === "+") {
                    const result =
                        Number(newOperation[i - 1]) +
                        Number(newOperation[i + 1]);
                    newOperation.splice(i - 1, 3, result.toString());
                    i -= 1;
                } else if (newOperation[i] === "-") {
                    const result =
                        Number(newOperation[i - 1]) -
                        Number(newOperation[i + 1]);
                    newOperation.splice(i - 1, 3, result.toString());
                    i -= 1;
                }
            }

            setOperation([newOperation[0]]);
        }
    };

    const numPad = [
        ["x^2", "√", "C", "<"],
        [7, 8, 9, "/"],
        [4, 5, 6, "x"],
        [1, 2, 3, "-"],
        [".", 0, "=", "+"],
    ];

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key;

            // Mapea las teclas del teclado al contenido de los botones
            const validKeys = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9", // Números
                "+",
                "-",
                "x",
                "/",
                ".",
                "=",
                "Enter",
                "Backspace",
                "c", // Operaciones
            ];

            if (validKeys.includes(key)) {
                if (key === "Enter") {
                    handleCalculations("="); // Enter para "="
                } else if (key === "Backspace") {
                    handleCalculations("<"); // Backspace para limpiar
                } else if (key.toLowerCase() === "x") {
                    handleCalculations("x"); // "*" para multiplicar
                } else if (key.toLowerCase() === "c") {
                    handleCalculations("C"); // "C" para limpiar
                } else if (key === ".") {
                    handleCalculations(".");
                } else if (key === "Escape") {
                    handleCalculations("C");
                } else {
                    handleCalculations(key);
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [operation]);

    return (
        <div className=" h-screen flex flex-col gap-5 justify-center items-center">
            <div className="relative">
                {/* Display */}
                <div className="bg-gray-900 w-full text-white text-5xl py-4 px-4 rounded-lg mb-4 text-right">
                    <p>{operation.join("") || 0}</p>
                </div>

                {/* Keypad */}
                <div>
                    {numPad.map((row, i) => (
                        <div
                            key={i}
                            className="flex space-x-2 justify-center mb-2"
                        >
                            {row.map((btn, j) => (
                                <button
                                    key={j}
                                    onClick={() => handleCalculations(btn)}
                                    className="w-16 h-16 bg-primary-dark text-secondary rounded-lg shadow hover:bg-gray-700"
                                >
                                    {(() => {
                                        switch (btn) {
                                            case "√":
                                                return (
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faSquareRootVariable
                                                        }
                                                    />
                                                );
                                            case "/":
                                                return (
                                                    <FontAwesomeIcon
                                                        icon={faDivide}
                                                    />
                                                );
                                            case "<":
                                                return (
                                                    <FontAwesomeIcon
                                                        icon={faDeleteLeft}
                                                        size="lg"
                                                    />
                                                );
                                            case "x^2":
                                                return (
                                                    <FontAwesomeIcon
                                                        icon={faSuperscript}
                                                    />
                                                );
                                            default:
                                                return btn;
                                        }
                                    })()}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
                <button
                    onClick={openInNewWindow}
                    className="absolute text-secondary font-bold -bottom-16 max-sm:hidden"
                >
                    Click here to use the calculator in a new window
                </button>
            </div>
        </div>
    );
}
