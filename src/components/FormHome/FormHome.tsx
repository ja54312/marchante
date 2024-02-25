//Librerias
import { useState, useEffect } from "react"
//Hooks
import { useNavigate } from 'react-router-dom';
//import useLocalStorage from '../../hooks/useLocalStorage'
//Styles
import "./FormHome.scss"
//Types
import { initialformProps, initialErrorProps } from "./FormHome.model";
const FormHome = () => {

  const initialformLocatario: initialformProps = {
    "tipoCliente": "Locatario",
    "mercadoTianguis": "Mercado",
    "zonaRegistro": "CDMX_Centro",
    "mercado": "Mercado San Cosme",
    "local": "",
    "nameLocal": "",
    "email": "",
    "password": "",
    "checkTyC": false
  }

  const initialformCliente: initialformProps = {
    "tipoCliente": "Cliente",
    "email": "",
    "password": "",
    "checkTyC": false
  }

  const errores: initialErrorProps = {}
  const navigate = useNavigate();
  const [form, setForm] = useState(initialformLocatario || initialformCliente);
  const [typeClient, setTypeClient] = useState("Locatario")
  // const [clientTypeStorage, setClientTypeStorage] = useLocalStorage(
  //   'ClientType', "Locatario"
  // )
  const [errors, setErrors] = useState(errores)
  const [count, setCount] = useState(0)
  //console.log("Tipo de cliente", typeClient)
  //console.log("form", form)
  //console.log("localStorage", clientTypeStorage)

  // /*VALIDACIONES*/
  const validationsForm = (form: initialformProps) => {
    let errors: initialErrorProps = {}
    //console.log(0, form.local)
    if (typeClient === "Locatario" && !form.local) {
      errors.local = '**Inserte un Numero de Local**'
    }

    if (typeClient === "Locatario" && !form.nameLocal.trim()) {
      errors.nameLocal = '**Inserte un Nombre de Local**'
    }

    if (!form.email.trim()) {
      errors.email = '**Inserte un email valido**'
    }

    if (!form.password.trim()) {
      errors.password = '**El campo es requerido**'
    }

    return errors
  }

  const validationsFormLocatario = (form: initialformProps) => {
    let count: number = 0

    if (form.local.length === 0) {
      count = + 1
    }

    if (form.nameLocal.length === 0) {
      count = + 1
    }

    if (form.email.length === 0) {
      count = + 1
    }

    if (form.password.length === 0) {
      count = + 1
    }

    return count
  }

  const validationsFormClient = (form: initialformProps) => {
    let count: number = 0

    if (form.email.length === 0) {
      count = + 1
    }

    if (form.password.length === 0) {
      count = + 1
    }

    return count
  }

  useEffect(() => {
    if (typeClient === "Locatario") {
      setCount(validationsFormLocatario(form))
    } else {
      setCount(validationsFormClient(form))
    }
  }, [form, typeClient])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Locatario" || e.target.value === "Cliente") {
      setTypeClient(e.target.value)
      //setClientTypeStorage(e.target.value)
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validationsForm(form))
    const formElement = e.target as HTMLFormElement;
    //console.log("errors", errors)
    if (Object.keys(errors).length === 0 && form.checkTyC === true && count === 0) {
      console.log("Formulario Enviado", form)
      if (formElement.id === "FormRegistro") {
        console.log("Registro")
        if (typeClient === "Cliente") {
          navigate('/user');
        } else {
          navigate('/comercio');
        }
      }
    }
    // if (formElement.id === "FormLogin") {
    //   navigate('/comercio');
    //   console.log("Login")
    // }
  };

  useEffect(() => {
    if (typeClient === "Locatario") {
      setForm(initialformLocatario)
    } else {
      setForm(initialformCliente)
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
                  <option value="CDMX_Norte">CDMX Norte</option>
                  <option value="CDMX_Oriente">CDMX Oriente</option>
                  <option value="CDMX_Poniente">CDMX Poninete</option>
                  <option value="CDMX_Sur">CDMX Sur</option>
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
                {errors.local && (
                  <p className="novalidado">
                    {errors.local}
                  </p>
                )}
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
              {errors.nameLocal && (
                <p className="novalidado">
                  {errors.nameLocal}
                </p>
              )}
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
              {errors.email && (
                <p className="novalidado">
                  {errors.email}
                </p>
              )}
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
              {errors.password && (
                <p className="novalidado">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="form-group form-check text-black-50 small">
              <input type="checkbox" className="form-check-input" id="checkTyC" name="checkTyC" onChange={handleChecked} />
              <label className="form-check-label" htmlFor="checkTyC">
                Acepto Términos y Condiciones
              </label>
            </div>
            <input type="submit" className="btn btn-primary" id="submit" value="Registrarme" />
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
            <input type="submit" className="btn btn-primary" id="submitLogin" value="Iniciar Sesión" />
          </form>
        </article>
      </div>
    </section>
  )
}

export default FormHome