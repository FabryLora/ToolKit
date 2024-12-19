import React, { useState } from "react";
import tk from "../assets/logos/tk-logo-transparent.webp";
import axiosClient from "../axios.ts";
import InputButton from "../components/RegistrationInput.tsx";
import { useStateContext } from "../contexts/ContextProvider.tsx";
export default function Signup() {
    const { setUserToken } = useStateContext();
    const [errorMessage, setErrorMessage] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };
    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        axiosClient
            .post("/signup", formData)
            .then(({ data }) => {
                setUserToken(data.token);
            })
            .catch((err) => setErrorMessage(err.response.data.errors));
    };

    return (
        <>
            <div className="flex h-screen items-center flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-row gap-2 justify-center items-center mx-auto w-full">
                    <img alt="ToolKit logo" src={tk} className=" h-20 " />
                </div>

                {Object.is(errorMessage, {}) && (
                    <div className="text-center text-red-500">
                        {Object.values(errorMessage).map((error) => (
                            <p key={error as string}>{error as string}</p>
                        ))}
                    </div>
                )}

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm max-sm:w-full">
                    <form
                        onSubmit={onSubmit}
                        action="#"
                        method="POST"
                        className="space-y-6"
                    >
                        <InputButton
                            type="text"
                            labelTitle="Name"
                            errorMessage={errorMessage.name}
                            onInputChange={(value) =>
                                handleInputChange("name", value)
                            }
                        />
                        <InputButton
                            type="email"
                            labelTitle="Email address"
                            errorMessage={errorMessage.email}
                            onInputChange={(value) =>
                                handleInputChange("email", value)
                            }
                        />
                        <InputButton
                            type="password"
                            labelTitle="Password"
                            errorMessage={errorMessage.password}
                            onInputChange={(value) =>
                                handleInputChange("password", value)
                            }
                        />
                        <InputButton
                            type="password"
                            labelTitle="Confirm Password"
                            errorMessage={errorMessage.password_confirmation}
                            onInputChange={(value) =>
                                handleInputChange(
                                    "password_confirmation",
                                    value
                                )
                            }
                        />

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                            >
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
