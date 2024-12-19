import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
interface RegistrationInputProps {
    type: string;
    labelTitle: string;
    inputStyles?: string;
    errorMessage?: string[];
    onInputChange?: (value: string) => void;
}
function RegistrationInput({
    type,
    labelTitle,
    inputStyles,
    errorMessage,
    onInputChange,
}: RegistrationInputProps) {
    const [alertBox, setAlertBox] = useState(false);

    return (
        <div>
            <label
                htmlFor={type}
                className="block text-sm/6 font-medium text-secondary"
            >
                {labelTitle}
            </label>
            <div className="mt-2 relative flex flex-row items-center justify-end">
                <input
                    onChange={(e) => onInputChange(e.target.value)}
                    name={type}
                    type={type}
                    autoComplete={type}
                    className={`block w-full rounded-md bg-primary-dark px-3 py-1.5 text-base text-white   placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6 ${inputStyles}`}
                />
                {errorMessage && errorMessage.length > 1 && (
                    <div
                        onMouseEnter={() => setAlertBox(true)}
                        onMouseLeave={() => setAlertBox(false)}
                        className="absolute pr-2"
                    >
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            color="#ef4444"
                            size="lg"
                        />
                        {alertBox && (
                            <ul className="absolute w-[400px] h-fit bg-primary-dark py-2 pl-7 rounded-md z-10 -bottom-2 max-md:top-8 max-md:right-0 md:left-10 list-disc">
                                {errorMessage.map((error) => (
                                    <li className="text-red-500 " key={error}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
            {errorMessage &&
                errorMessage.length == 1 &&
                errorMessage.map((error) => (
                    <p className="text-red-500" key={error}>
                        {error}
                    </p>
                ))}
        </div>
    );
}

export default RegistrationInput;
