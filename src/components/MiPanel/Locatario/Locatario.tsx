//Components
import { HeaderPanel } from '../HeaderPanel/HeaderPanel';
//Styles
import './Locatario.scss';
//Types
interface LocatarioProps {
    typeClient: string
}

export const Locatario: React.FC<LocatarioProps> = ({ typeClient }) => {

    return (
        <section className='sectionLocatario container mb-5'>
            <HeaderPanel typeClient={typeClient} />
        </section>
    )
}
