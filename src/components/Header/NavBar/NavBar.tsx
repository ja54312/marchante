import Modal from "../../Modal/Modal";
import useModal from "../../../hooks/useModal";

const NavBar = () => {
    const [isOpenModal, openModal, closeModal] = useModal(true);
    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-mm1">
            <a className="navbar-brand logotipo" href="/">
                Mi <br /> marchante
            </a>
            <a href="/bolsa">
                <i className="fas fa-shopping-bag fa-3x text-mm2"></i>
                <sup className="badge badge-primary align-top" id="cart-length">0</sup>
            </a>
            <button className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <span>modalito</span>
            </Modal>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item" id="panelLocatario" style={{ display: "none" }}>
                        <a className="nav-link">Panel</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link">Inicio</a>
                        <span className="sr-only"></span>
                    </li>
                    <li className="nav-item" id="buttonRegister">
                        <a className="nav-link">Registrarse
                            <i className="far fa-edit"></i>
                        </a>
                    </li>
                    <li className="nav-item" id="buttonLogin">
                        <a className="nav-link">Iniciar Sesion
                            <i className="far fa-user"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <button className="btn text-black-50">Ayuda
                            <i className="far fa-question"></i>
                        </button>
                    </li>
                    <li className="nav-item" id="logOut">
                        <button className="btn text-black-50">
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar