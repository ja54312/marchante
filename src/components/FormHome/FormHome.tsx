import { useState ,useEffect} from "react"
import { useNavigate  } from 'react-router-dom';
const FormHome = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [typeClient,setTypeClient]= useState("Locatario")
    //console.log("Tipo de cliente",typeClient)
    //console.log("form",form)

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "Locatario" || e.target.value === "Cliente"){
            setTypeClient(e.target.value)
        }
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    };
    
      const handleChecked = (e : React.ChangeEvent<HTMLInputElement>) => {
        setForm({
          ...form,
          [e.target.name]: e.target.checked,
        });
      };
    
      const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        if(formElement.id === "FormRegistro"){
            console.log("Registro")
            if(typeClient === "Cliente"){
                navigate('/user');
            }else{
                navigate('/comercio');
            }
        }
        if(formElement.id === "FormLogin"){
            navigate('/comercio');
            console.log("Login")
        }
        console.log("Formulario Enviado",form)
      };

      useEffect(() => {
        if(typeClient === "Locatario"){
            setForm({
                "mercado": "Mercado San Cosme",
                "mercadoTianguis":"Mercado",
                "zonaRegistro": "CDMX_Centro"
            })
        } else {
            setForm({})
        }
      }, [typeClient])
      

  return (
    <section className="container mb-5" id="registroLogin">
        <div className="row justify-content-around text-center">
          <article
            className="col-md-5 border-left border-right border-secondary"
            id="registro"
          >
            <h4 className="mb-4 titulo">Regístrate</h4>
            <hr />
            <form onSubmit={handleSubmit} id="FormRegistro">
            <div className="form-group">
              <label htmlFor="tipoCliente">Selecciona tu tipo</label>
              <select
                className="form-control"
                id="tipoCliente"
                name="tipoCliente"
                onChange={handleSelect}
              >
                <option value="Locatario">Locatario</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
            {typeClient === "Locatario" && <div id="disapearCustommer">
              <div className="form-group">
                <label htmlFor="mercadoTianguis">Tu mercado o tianguis</label>
                <select
                  className="form-control"
                  id="mercadoTianguis"
                  name="mercadoTianguis"
                  onChange={handleSelect}
                >
                  <option value="Mercado">Mercado</option>
                  <option value="Tianguis">Tianguis</option>
                </select>
                <label htmlFor="zonaRegistro">Selecciona tu zona</label>
                <select
                  className="form-control"
                  id="zonaRegistro"
                  name="zonaRegistro"
                  onChange={handleSelect}
                >
                  <option value="CDMX_Centro">CDMX Centro</option>
                  <option  value="CDMX_Norte">CDMX Norte</option>
                  <option  value="CDMX_Oriente">CDMX Oriente</option>
                  <option  value="CDMX_Poniente">CDMX Poninete</option>
                  <option  value="CDMX_Sur">CDMX Sur</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mercado">Selecciona tu mercado</label>
                <select
                  className="form-control"
                  id="mercado"
                  name="mercado"
                  data-live-search="true"
                  onChange={handleSelect}
                >
                    <option value="Mercado San Cosme">Mercado San Cosme</option>
                    <option value="Otro">Otro</option>
                </select>
                <label htmlFor="local">Escribe el número de tu local</label>
                <input
                  type="number"
                  className="form-control"
                  id="local"
                  name="local"
                  onChange={handleChange}
                />
              </div>
            </div>}
            {typeClient === "Locatario" && <div className="form-group">
              <label htmlFor="formGroupExampleInput" id="label--name">
                Escribe el nombre de tu local
              </label>
              <input
                type="text"
                className="form-control"
                id="nameLocal"
                name="nameLocal"
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>
            }
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Escribe tu correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="micorreo@correo.com"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Escribe tu contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="*****"
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-check text-black-50 small">
              <input type="checkbox" className="form-check-input" id="check" name="checkTyC" onChange={handleChecked}/>
              <label className="form-check-label" htmlFor="exampleCheck1">
                Acepto Términos y Condiciones
              </label>
            </div>
            <input type="submit" className="btn btn-primary" id="submit" value="Registrarme"/>
            </form>
          </article>

          <article
            className="col-md-5 border-left border-right border-secondary"
            id="login"
          >
            <h4 className="mb-4 mt-5 mt-md-0 titulo">Inicia Sesión</h4>
            <hr />
            <form onSubmit={handleSubmit} id="FormLogin">
                <div className="form-group">
                <label htmlFor="exampleInputEmail1">Escribe tu correo</label>
                <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    name="loginEmail"
                    aria-describedby="emailHelp"
                    placeholder="micorreo@correo.com"
                    onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputPassword1">Escribe tu contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    name="loginPassword"
                    placeholder="*****"
                    onChange={handleChange}
                />
                </div>
                <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkLogin"
                    name="checkLogin"
                    onChange={handleChecked}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    Recordar correo
                </label>
                <p>
                    <a
                    className="small"
                    data-toggle="modal"
                    data-target="#forgot-password"
                    style={{ color: "dodgerblue", cursor: "pointer" }}
                    >
                    Olvide mi contraseña
                    </a>
                </p>
                </div>
                <input type="submit" className="btn btn-primary" id="submitLogin" value="Iniciar Sesión"/>
            </form>
          </article>
        </div>
      </section>
  )
}

export default FormHome