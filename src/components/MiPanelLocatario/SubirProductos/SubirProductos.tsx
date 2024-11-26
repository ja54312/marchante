//Hooks
import { useState, useEffect } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
//Styles
import "./SubirProductos.scss";
//
import { initialProductProps } from "../Locatario/SubirProductos.model";
interface subirProductosProps {
    product: initialProductProps;
    setProduct: React.Dispatch<React.SetStateAction<initialProductProps>>;
}

export const SubirProductos: React.FC<subirProductosProps> = ({ product, setProduct }) => {

    const initialProduct: initialProductProps = {
        product: "",
        prePz: 0,
        prePs: 0,
    }

    const [products, setProducts] = useLocalStorage<initialProductProps[]>('products', []);

    const [productCategory, setProductCategory] = useState('');
    console.log('productCategory', productCategory);
    //console.log('product', product);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    const handleNameProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            product: e.target.value
        })
    }

    const handlePriceProductPz = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            prePz: parseFloat(e.target.value)
        })
    }

    const handlePriceProductKg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            prePs: parseFloat(e.target.value)
        })
    }

    const addProduct = () => {
        console.log('Agregando producto...');
        setProducts([...products, product]);
        setProduct(initialProduct);
    }

    useEffect(() => {
        const isProductChanged = (Object.keys(initialProduct) as (keyof initialProductProps)[]).some(
            key => product[key] !== initialProduct[key]
        );
        setIsSaveButtonDisabled(!isProductChanged);
    }, [product])




    return (
        <div
            className="col-md-12 rounded border border-primary alert-primary mt-5 p-3"
        >
            <p
                className="rounded bg-white h4 text-center font-weight-bolder fa-2x pt-1 pr-5 titulo"
            >
                SUBIR PRODUCTOS
            </p>
            <div className="form-row align-items-center text-center">
                <div className="form-group col-md-4 d-flex">
                    <div>
                        <label htmlFor="tipoCliente">Selecciona una categoría</label>
                        <select
                            className="form-control"
                            id="productCategory"
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option>Selecciona una categoría...</option>
                            <option value="0">Otro...</option>
                        </select>
                    </div>
                    <button
                        style={{ zIndex: 0 }}
                        disabled
                        className="btn rounded-circle text-center tooltip"
                    >
                        <p className="h5 mb-0 titulo">
                            <i className="fas fa-info-circle"></i>
                        </p>
                        <span className="tooltiptext"
                        >Seleccione una categoría y si su producto no entra en
                            alguna opción, coloque "Otro...".</span
                        >
                    </button>
                </div>
            </div>
            <div className="form-row align-items-center text-center">
                <div className="form-group col-md-4">
                    <label htmlFor="product">Nombre de tu Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="product"
                        name="product"
                        onChange={handleNameProduct}
                        value={product.product}
                        required
                    />
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="prePz">Precio por 1 Pieza</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-white">
                                $
                            </div>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            id="prePz"
                            name="prePz"
                            value={product.prePz}
                            onChange={handlePriceProductPz}
                            required
                        />
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="prePs">Precio por 1 Kilo</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-white">
                                $
                            </div>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            id="prePs"
                            name="prePs"
                            value={product.prePs}
                            onChange={handlePriceProductKg}
                            required
                        />
                    </div>
                </div>
                <div className="form-group col-md-2">
                    <div className="tooltip">Hover over me</div>
                    <button
                        id="saveProduct"
                        disabled={isSaveButtonDisabled}
                        className="btn btn-primary form-control text-center"
                        onClick={() => addProduct()}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}
