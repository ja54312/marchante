//Styles
import './HeaderPanel.scss';
//Models
interface HeaderPanelProps {
    typeClient: string
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({ typeClient }) => {
    return (
        <section className='sectionHeaderPanel row justify-content-center'>
            <div className="containerPedidos col-md-12 bg-warning py-2">
                <p className='h2 mb-0 titulo'>TU PANEL</p>
                <p className='rounded bg-white text-center font-weight-bolder fa-2x py-2 pr-5 titulo'>
                    {typeClient === 'Cliente' ? 'Aquí puedes ver todos tus pedidos' : 'Aquí puedes subir, desactivar, o cambiar tus productos.  Y ver tus pedidos.'}
                    <li className='icons fas fa-apple-alt text-danger'></li>
                    <li className='icons fas fa-carrot text-warning'></li>
                    <li className='icons fas fa-seedling text-success'></li>
                    <li className='icons fas fa-wine-bottle text-primary'></li>
                </p>
            </div>
        </section>
    )
}
