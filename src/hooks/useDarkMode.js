import { useEffect, useState } from "react";

export default function useDarkMode(defaultValue = false) {
    const [enabled, setEnabled] = useState(defaultValue);

    useEffect(() => {
        if (enabled) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [enabled]);

    return [enabled, setEnabled];
}