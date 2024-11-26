//Hooks
import { useState } from "react";
//Components
import { HeaderPanel } from '../../shared/HeaderPanel/HeaderPanel';
import { MisProductos } from '../MisProductos';
import { SelectMenuPanel } from '../SelectMenuPanel';
import { SubirProductos } from '../SubirProductos';
//Styles
import './Locatario.scss';
//Types
import { initialProductProps } from "./SubirProductos.model";
interface LocatarioProps {
    typeClient: string
}

export const Locatario: React.FC<LocatarioProps> = ({ typeClient }) => {

    const initialProduct: initialProductProps = {
        product: "",
        prePz: 0,
        prePs: 0,
    }
    const [selectedOption, setSelectedOption] = useState<string>('productos')
    const [product, setProduct] = useState<initialProductProps>(initialProduct);
    console.log('selectedOption', selectedOption)

    return (
        <section className='sectionLocatario container mb-5'>
            <HeaderPanel typeClient={typeClient} />
            <SelectMenuPanel selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            {selectedOption === 'productos' && <SubirProductos product={product} setProduct={setProduct} />}
            {selectedOption === 'productos' && <MisProductos product={product} setProduct={setProduct} />}
        </section>
    )
}
