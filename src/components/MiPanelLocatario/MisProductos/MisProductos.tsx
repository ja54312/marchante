//Hooks
import { useEffect } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
//Style
import './MisProductos.scss'
//Models
import { initialProductProps } from "../SubirProductos/SubirProductos.model";

export const MisProductos = () => {

    const [products, setProducts] = useLocalStorage<initialProductProps[]>('products', []);



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
                                    EDITAR / SUSPENDER / ACTIVAR
                                </th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product}</td>
                                    <td>{product.prePz}</td>
                                    <td>{product.prePs}</td>
                                    <td className="text-right">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            data-toggle="modal"
                                            data-target="#editProductModal"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            data-toggle="modal"
                                            data-target="#suspendProductModal"
                                        >
                                            Suspender
                                        </button>
                                        <button
                                            className="btn btn-success btn-sm"
                                            data-toggle="modal"
                                            data-target="#activateProductModal"
                                        >
                                            Activar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
        </section>
    )
}
