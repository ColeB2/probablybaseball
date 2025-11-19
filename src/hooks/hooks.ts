//Non consent required version, which since we aren't storing user info

import { useEffect, useState } from "react";

// has no need
type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;
const useLocalStorage = <T,>(key: string, initialValue: T): [T, SetValue<T>, () => void] => {
    // Retrieve stored value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // console.error(error);
            return initialValue;
        }
    });

    // Update localStorage when storedValue changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // console.error(error);
        }
    }, [key, storedValue]);

    // Function to reset storedValue to initialValue and update localStorage
    const resetToDefault = () => {
        setStoredValue(initialValue);
        window.localStorage.setItem(key, JSON.stringify(initialValue));
    };

    return [storedValue, setStoredValue, resetToDefault];
};

export {
    useLocalStorage
}