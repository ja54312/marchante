//Pages
import Home from "./pages/home/Home";
import AvisoDePrivacidad from "./pages/avisoDePrivacidad/AvisoDePrivacidad";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad/PoliticaPrivacidad";
import TerminosYCondiciones from "./pages/TerminosYCondiciones/TerminosYCondiciones";
//import Registro from "./pages/registro/Registro";
//Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
//Styles
import "./styles/global.scss"
//Router
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout />
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/avisoPrivacidad",
          element: <AvisoDePrivacidad />
        },
        {
          path: "/politicaPrivacidad",
          element: <PoliticaPrivacidad />
        },
        {
          path: "/terminosYCondicionesUso",
          element: <TerminosYCondiciones />
        },
      ]
    },
  ])


  return (
    <RouterProvider router={router} />
  )
}

export default App;
