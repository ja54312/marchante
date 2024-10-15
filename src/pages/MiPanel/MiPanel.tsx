//componets
import { Cliente } from "../../components/MiPanel/Cliente"
import { Locatario } from "../../components/MiPanel/Locatario"

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