/* Modal recibe:
isOpen = estado inicial del modal (abierto o cerrado)
children = contenido del modal
*/
//Hooks
import { useState, useEffect } from "react";
//component
import ContainerModal from './ContainerModal'
//style
import './Modal.scss'

interface ModalProductsProps {
    isOpen: boolean;
    closeModal: () => void;
    caseModal: 'edit' | 'active' | 'delete' | 'desactive';
}

const ModalProducts: React.FC<ModalProductsProps> = ({ isOpen, closeModal, caseModal }) => {

    const initialColorText = {
        color: '',
        text: ''
    }

    const [colorText, setColorText] = useState(initialColorText)

    const handleModalDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    useEffect(() => {
        if (caseModal === 'edit') {
            setColorText({
                color: 'primary',
                text: 'EDITAR PRODUCTO'
            })
        } else if (caseModal === 'active') {
            setColorText(
                {
                    color: 'success',
                    text: 'ACTIVAR PRODUCTO'
                }
            )
        } else if (caseModal === 'delete') {
            setColorText({
                color: 'danger',
                text: 'ELIMINAR PRODUCTO'
            })
        } else if (caseModal === 'desactive') {
            setColorText({
                color: 'warning',
                text: 'SUSPENDER PRODUCTO'
            })
        }
    }, [caseModal])

    console.log('caseModal', caseModal)
    console.log('colorText', colorText)


    return (
        <div className={`modal-react ${isOpen && "modal-react-open"}`} onClick={closeModal}>
            <div className="modal-react__dialogProducts" onClick={handleModalDialogClick} >
                <div className={`modal-content alert-${colorText.color} border border-${colorText.color}`}>
                    <div className={`modal-header bg-${colorText.color} text-black-50`}>
                        <h5 className="modal-title" id="exampleModalLabel">{colorText.text}</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={closeModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                < div className="modal-react__dialog--children" >
                    <ContainerModal />
                </div>
            </div>
        </div>
    )
}

export default ModalProducts;