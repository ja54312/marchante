//Component
import ModalProducts from "./components/ModalProducts";
//Hooks
import { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useModal from "../../../hooks/useModal";
//Style
import './MisProductos.scss'
//Models
import { initialProductProps } from "../Locatario/SubirProductos.model";
interface misProductosProps {
    product: initialProductProps;
    setProduct: React.Dispatch<React.SetStateAction<initialProductProps>>;
}

export const MisProductos: React.FC<misProductosProps> = ({ product, setProduct }) => {

    const [products, setProducts] = useLocalStorage<initialProductProps[]>('products', []);
    console.log(setProduct)

    const [isOpenModal, openModal, closeModal] = useModal(false);

    const [caseModal, setCaseModal] = useState<'edit' | 'active' | 'delete' | 'desactive'>('edit');


    useEffect(() => {
        const handleStorageChange = () => {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setProducts]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, [product]);


    const handleEditar = () => {
        console.log('Editando producto')
        if (typeof openModal === 'function') {
                            openModal();
        }
        setCaseModal('edit');
    }

    const handleActivar = () => {
        console.log('Activando producto')
        if (typeof openModal === 'function') {
            openModal();
        }
        setCaseModal('active');
    }

    const handleSuspender = () => {
        console.log('Suspender producto')
        if (typeof openModal === 'function') {
            openModal();
        }
        setCaseModal('desactive');
    }

    const handleBorrar = () => {
        console.log('Borrando producto')
        if (typeof openModal === 'function') {
            openModal();
        }
        setCaseModal('delete');
    }


    return (
        <section>
            {products && products.length === 0 ? (<div
                className="col-md-12 align-items-center my-5 px-0"
                style={{ padding: "2rem" }}
                id="no-products"
            >
                <p
                    className="rounded bg-white h4 text-center text-info font-weight-bolder pt-1 pr-5 titulo"
                >
                    Aún no tienes productos. Añade uno para que aparezcan aquí.
                </p>
            </div>) :
                (<div
                    className="col-md-12 align-items-center table-responsive my-5 px-0"
                    id="product-table"
                >
                    <table
                        className="table table-hover text-center dataTable"
                        id="data-table"
                    >
                        <thead className="small table-info text-secondary subtitulo">
                            <tr>
                                <th scope="col">PRODUCTO</th>
                                <th scope="col">PRECIO POR 1 PIEZA</th>
                                <th scope="col">PRECIO POR 1 KILO</th>
                                <th className="text-right" scope="col">
                                    Buscar
                                </th>
                            </tr>
                        </thead>
                        <tbody id="table-body" >
                            {products.map((product, index) => (
                                <tr key={index} style={{ backgroundColor: product.isActive ? '#ffffff' : '#f4f4f4' }}>
                                    <td>{product.product}</td>
                                    <td>{product.prePz}</td>
                                    <td>{product.prePs}</td>
                                    <td className="text-right">
                                        <label className="switch">
                                            <input 
                                                type="checkbox" 
                                                checked={product.isActive} 
                                                onChange={() => {
                                                    const updatedProducts = products.map((p, i) =>
                                                        i === index ? { ...p, isActive: !p.isActive } : p
                                                    );
                                                    setProducts(updatedProducts);
                                                    localStorage.setItem('products', JSON.stringify(updatedProducts));
                                                }}
                                            />
                                            <span 
                                                className="slider" 
                                            ></span>
                                        </label>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            data-toggle="modal"
                                            data-target="#editProductModal"
                                            onClick={handleEditar}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            data-toggle="modal"
                                            data-target="#eraseProductModal"
                                            onClick={handleBorrar}
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
            <ModalProducts isOpen={isOpenModal} closeModal={closeModal} caseModal={caseModal} />
        </section >
    )
}
