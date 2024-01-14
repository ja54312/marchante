import Modal from "../../Modal/Modal";
import useModal from "../../../hooks/useModal";

const NavBar = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false);

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
                        <button className="btn text-black-50" onClick={openModal}>Ayuda
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
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <div className="modal-body text-center">
                    <p>Nos puedes contactar aquí:</p>
                    <div className="row">
                        <div className="col-md-6">
                            <a href="https://api.whatsapp.com/send?phone=525560927609&text=Hola!%20quería%20preguntar..." target="_blank" className="text-success my-3 py-3">
                                WHATSAPP <i className="fab fa-whatsapp"></i>
                                <br />
                                <p className="lead">+52 5560927609</p>
                            </a>
                        </div>
                        <div className="col-md-6">
                            <a href="https://www.facebook.com/Mi-marchante-100779191802852" target="_blank" className="text-primary my-3 py-3">
                                FACEBOOK <i className="fab fa-facebook"></i>
                                <br />
                                <p className="lead logotipo">Mi marchante</p>
                            </a>
                        </div>
                    </div>
                    <hr />
                    <a href="#" target="_blank" className="text-info lead my-3 py-3">
                        EMAIL <i className="far fa-envelope"></i>
                        <br />
                        <p className="lead">contacto@mimarchante.mx</p>
                    </a>
                </div>
                <div className="modal-footer">
                    <button onClick={closeModal} type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </Modal>
        </nav>
    )
}

export default NavBar