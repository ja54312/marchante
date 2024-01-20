import { Link } from 'react-router-dom';
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="container-fluid bg-secondary">
        <div className="row justify-content-center align-items-center pt-2">
          <div className="col-md-6 small text-black-50">
            <a
              href="https://www.freepik.es/fotos/marco"
              className="text-black-50"
              target="_blank"
            >
              Contribuciones: Foto de Marco creado por freepik - www.freepik.es
            </a>
          </div>
          <div className="col-md-6 text-right small text-light containerLinksFooter">
            <Link to="/avisoPrivacidad">Aviso de Privacidad |</Link>
            <Link to="/politicaPrivacidad">Política de Privacidad |</Link>
            <Link to="/terminosYCondicionesUso">Términos y Condiciones</Link>
          </div>
          <div className="col-md-12 bg-dark text-center text-light pb-2">
            <p className="m-0 p-0">
              <a
                href="https://www.facebook.com/Mi-marchante-100779191802852"
                target="_blank"
                className="text-white"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </p>
            <p className="d-inline-flex m-0 p-0 ">
              <a href="/" className="text-light logotipo">
                <i className="fas fa-shopping-bag text-mm2"></i>
                Mi marchante
              </a>{" "}
              - 2020
            </p>
          </div>
        </div>
      </footer >

      <div style={{ display: "none" }} id="loader">
        <div className="conte_loader_MyStyle" style={{ display: "flex" }}>
          <div className="loader_MyStyle"></div>
        </div>
      </div>
    </>
  );
};

export default Footer;
