import { a } from "motion/react-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Calculator() {
    const navigate = useNavigate();
    const [operation, setOperation] = useState([]);
    const [displayContent, setDisplayContent] = useState<number | string>(0);
    const openInNewWindow = () => {
        window.open("/calculator", "_blank", "width=400,height=600");
        navigate("/");
    };

    const handleCalculations = (value: string | number) => {
        console.log(operation);
        switch (value) {
            case "C":
                setOperation([]);
                setDisplayContent("");
                break;

            default:
                setOperation([...operation, value]);
                break;
        }

        if (value === "=") {
            const newOperation = operation.join("").split(/([+\-x\/])/);
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
                    const result =
                        Number(newOperation[i - 1]) /
                        Number(newOperation[i + 1]);
                    newOperation.splice(i - 1, 3, result.toString());
                    i -= 1;
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

            setDisplayContent(newOperation[0]);
        }
    };

    const numPad = [
        ["x^2", "sqr", "C", "/"],
        [7, 8, 9, "x"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        ["+/-", 0, ".", "="],
    ];

    return (
        <div className=" h-screen flex flex-col gap-5 justify-center items-center">
            <div className="relative">
                {/* Display */}
                <div className="bg-gray-900 w-full text-white text-5xl py-4 px-4 rounded-lg mb-4 text-right">
                    <p>
                        {displayContent
                            ? displayContent
                            : operation.join("") || 0}
                    </p>
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
                                    {btn}
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
