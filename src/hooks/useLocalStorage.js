import { useState, useEffect } from "react";

function useLocalStorage(key, firstvalue = null) {
    const initialValue = localStorage.getItem(key) || firstvalue;

    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage(){
        if (item === null){
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;