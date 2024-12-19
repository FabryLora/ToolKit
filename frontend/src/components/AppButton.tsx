import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface AppButtonProps {
    icon: FontAwesomeIconProps["icon"];
    href?: string;
}

export default function AppButton({ icon, href }: AppButtonProps) {
    return (
        <Link to={href}>
            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-secondary rounded-md"
            >
                <FontAwesomeIcon icon={icon} size="2xl" color="#252422" />
            </motion.button>
        </Link>
    );
}
