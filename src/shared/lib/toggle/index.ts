import { useState } from "react";

export type returnValue = [boolean, () => void]

export const useToogle = (defaultValue = false):returnValue => {
    const [value, setValue] = useState<boolean>(defaultValue);

    const changeValue = () => {
        setValue(!value);
    }
    
    return [value, changeValue];
}