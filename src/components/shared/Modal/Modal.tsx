/* Modal recibe:
isOpen = estado inicial del modal (abierto o cerrado)
children = contenido del modal
*/
import './Modal.scss'
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
    const handleModalDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (
        <div className={`modal-react ${isOpen && "modal-react-open"}`} onClick={closeModal}>
            <div className="modal-react__dialog" onClick={handleModalDialogClick} >
                <button className="modal-react__dialog--button-close" onClick={closeModal}>
                    x
                </button>
                < div className="modal-react__dialog--children" > {children} </div>
            </div>
        </div>
    )
}

export default Modal;