import { useState } from "react";

const useModal = (initialValue = false) => {
    const [isOpenModal, setIsOpenModal] = useState(initialValue);

    const closeModal:() => void  = () => {
        setIsOpenModal(false);
    };

    const openModal:() => void  = () => {
        setIsOpenModal(true);
    };

    return [isOpenModal, openModal, closeModal];
};

export default useModal;