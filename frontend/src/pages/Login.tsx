import { useState } from "react";
import tk from "../assets/logos/tk-logo-transparent.webp";
import axiosClient from "../axios.ts";
import InputButton from "../components/RegistrationInput.tsx";
import { useStateContext } from "../contexts/ContextProvider.tsx";
export default function Login() {
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    });
    const { setUserToken } = useStateContext();

    const login = (ev: React.FormEvent) => {
        ev.preventDefault();
        axiosClient.post("/login", loginCredentials).then(({ data }) => {
            setUserToken(data.token);
        });
    };
    const handleInputChange = (field: string, value: string) => {
        setLoginCredentials({ ...loginCredentials, [field]: value });
    };

    return (
        <>
            <div className="flex h-screen items-center flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-row gap-2 justify-center items-center mx-auto w-full">
                    <img alt="ToolKit logo" src={tk} className=" h-20 " />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm max-sm:w-full">
                    <form
                        onSubmit={login}
                        action="#"
                        method="POST"
                        className="space-y-6"
                    >
                        <InputButton
                            onInputChange={(value) =>
                                handleInputChange("email", value)
                            }
                            labelTitle="Email address"
                            type="email"
                        />
                        <InputButton
                            onInputChange={(value) =>
                                handleInputChange("password", value)
                            }
                            labelTitle="Password"
                            type="password"
                        />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                            >
                                LOG IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
