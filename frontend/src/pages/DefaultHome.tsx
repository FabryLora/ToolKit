import {
    faCalculator,
    faClock,
    faNoteSticky,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import AppButton from "../components/AppButton.tsx";
export const DefaultHome = () => {
    const appButtonAttributes = [
        { icon: faCalculator, href: "/calculator" },
        { icon: faNoteSticky, href: "/notes" },
        { icon: faClock, href: "#" },
        { icon: faStopwatch, href: "#" },
        { icon: faNoteSticky, href: "#" },
        { icon: faNoteSticky, href: "#" },
    ];

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="grid grid-cols-3 grid-rows-2 gap-5">
                {appButtonAttributes.map((appButtonAttribute, index) => (
                    <AppButton
                        key={index}
                        icon={appButtonAttribute.icon}
                        href={appButtonAttribute.href}
                    />
                ))}
            </div>
        </div>
    );
};
