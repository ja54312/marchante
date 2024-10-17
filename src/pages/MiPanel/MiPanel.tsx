//componets
import { Cliente } from "../../components/MiPanelCliente/Cliente"
import { Locatario } from "../../components/MiPanelLocatario/Locatario"

const MiPanel = () => {

  let typeClient: string = 'Locatario'

  return (
    <section className="sectionMipanel">
      {typeClient === 'Cliente' && <Cliente typeClient={typeClient} />}
      {typeClient === 'Locatario' && <Locatario typeClient={typeClient} />}
    </section>
  )
}

export default MiPanel