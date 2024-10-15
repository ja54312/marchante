
import FormHome from "../../components/Home/FormHome/FormHome";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <section className="container my-5">
        <div className="row justify-content-around">
          <div className="col-md-8 text-center mb-2">
            <p className="h2 subtitulo">
              ¡Hola! Bienvenidx a
              <br />
              <span className="logotipo">Mi marchante</span>
            </p>
            <p
              className="text-muted"
              style={{ display: "none" }}
              id="postal_code"
            >
              Escribe tu código postal qué quieras buscar y disfruta de
              <b>
                <i>tu mercado en línea</i>
              </b>
            </p>
          </div>

          <article
            className="col-md-5 rounded text-center mt-4 py-3 bg-mercados"
            id="mercadoPostalCode"
            style={{ display: "none" }}
          >
            <h3 className="subtitulo rounded p-2 bg-transparencia">
              MERCADOS <i className="fas fa-warehouse"></i>
            </h3>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <label
                    htmlFor="suggestions-mercados"
                    className="text-white text-shadow"
                  >
                    Selecciona tu código postal
                  </label>
                  <select
                    className="selectpicker1 form-control"
                    data-live-search="true"
                    id="suggestions-mercados"
                  // onChange="setMarketToFind('mercado')"
                  >
                    <option value="">CP...</option>
                  </select>
                </div>
                <div className="col-md-6 mt-2 mt-md-0">
                  <label htmlFor="mercados" className="text-white text-shadow">
                    Selecciona tu mercado
                  </label>
                  <select
                    className="form-control mt-md-4"
                    id="mercados"
                  ></select>
                </div>
              </div>
              <button
                className="btn btn-primary mt-4 enter--button"
                id="enter-mercado"
              >
                ENTRAR
              </button>
            </form>
          </article>

          <article
            className="col-md-5 rounded text-center py-3 bg-tianguis mt-4"
            id="tianguisPostalCode"
            style={{ display: "none" }}
          >
            <h3 className="subtitulo rounded p-2 bg-transparencia">
              TIANGUIS <i className="fas fa-store"></i>
            </h3>
            <form>
              <div className="form-row">
                <div className="col-md-6 wrapper-results">
                  <label
                    htmlFor="suggestions-mercados"
                    className="text-white text-shadow"
                  >
                    Selecciona tu código postal
                  </label>
                  <select
                    className="selectpicker2 form-control"
                    data-live-search="true"
                    id="suggestions-tianguis"
                  //onChange="setMarketToFind('tianguis')"
                  >
                    <option value="">CP...</option>
                  </select>
                </div>
                <div className="col-md-6 mt-2 mt-md-0">
                  <label htmlFor="tianguis" className="text-white text-shadow">
                    Selecciona tu tianguis
                  </label>
                  <select
                    className="form-control mt-md-4"
                    id="tianguis"
                  ></select>
                </div>
              </div>
              <button
                className="btn btn-primary mt-4 enter--button"
                id="enter-tianguis"
              >
                ENTRAR
              </button>
            </form>
          </article>
        </div>
      </section>
      <FormHome />
    </>
  );
};

export default Home;
