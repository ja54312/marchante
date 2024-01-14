import { useState } from "react";

const useModal = (initialValue = false) => {
    const [isOpenModal, setIsOpenModal] = useState(initialValue);

    const closeModal: any = () => {
        setIsOpenModal(false);
    };

    const openModal: any = () => {
        setIsOpenModal(true);
    };

    return [isOpenModal, openModal, closeModal];
};

export default useModal;