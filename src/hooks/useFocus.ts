import { useCallback, useEffect, useState } from 'react';

export const useFocus = () => {
    const [isFocused, setIsFocused] = useState(document.hasFocus());

    const onFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const onBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);

    return [isFocused, setIsFocused] as const;
};

