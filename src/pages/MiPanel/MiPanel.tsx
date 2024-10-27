//componets
import { Cliente } from "../../components/MiPanelCliente/Cliente"
import { Locatario } from "../../components/MiPanelLocatario/Locatario"
//Hooks
import useLocalStorage from "../../hooks/useLocalStorage"

const MiPanel = () => {

  //let typeClient: string = 'Locatario'
  const [clientTypeStorage] = useLocalStorage(
    'ClientType', "Locatario"
  )

  return (
    <section className="sectionMipanel">
      {clientTypeStorage === 'Cliente' && <Cliente typeClient={clientTypeStorage} />}
      {clientTypeStorage === 'Locatario' && <Locatario typeClient={clientTypeStorage} />}
    </section>
  )
}

export default MiPanel