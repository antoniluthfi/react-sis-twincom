import { useState } from 'react';

export const useInput = () => {
    const [value, setValue] = useState({});
    const changeHandler = e => {
        e.persist();
        setValue(value => ({
            ...value, [e.target.name]: e.target.value
        }));
    }

    const reset = () => {
        setValue({});
    }
    
    return [value, setValue, changeHandler, reset];
}

export const useModal = () => {
    const [visible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(!visible);
    }

    return [toggle, visible];
}