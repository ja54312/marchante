//Components
import { HeaderPanel } from '../../shared/HeaderPanel/HeaderPanel';
import { PedidosCliente } from '../PedidosCliente';
//Styles
import './Cliente.scss';
//Types
interface ClienteProps {
    typeClient: string
}

export const Cliente: React.FC<ClienteProps> = ({ typeClient }) => {
    return (
        <section className='sectionCliente container mb-5'>
            <HeaderPanel typeClient={typeClient} />
            <PedidosCliente />
        </section>
    )
}
