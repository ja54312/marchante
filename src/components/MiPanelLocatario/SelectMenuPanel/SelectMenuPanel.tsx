//Librerias
import { useState } from 'react';
//Styles
import './SelectMenuPanel.scss';

export const SelectMenuPanel = () => {
    const [selectedOption, setSelectedOption] = useState<string>('productos')

    const getClassName = (option: string, selectedOption: string) => {
        return option === selectedOption ? 'option selected' : 'option';
    };

    const handleOption = (option: string) => {
        setSelectedOption(option);
    }

    return (
        <section className='sectionSelectMenuPanel container mb-5'>
            <div className="containerSelectMenuPanel row justify-content-center mt5 mb5">
                <div className="containerOption">
                    <div className={getClassName('productos', selectedOption)} onClick={() => handleOption('productos')}>TUS PRODUCTOS</div>
                </div>
                <div className="containerOption">
                    <div className={getClassName('pedidos', selectedOption)} onClick={() => handleOption('pedidos')}>TUS PEDIDOS</div>
                </div>
            </div>
        </section>
    )
}
