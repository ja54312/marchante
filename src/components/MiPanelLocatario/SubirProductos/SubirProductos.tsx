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
    const [customCategory, setCustomCategory] = useState(''); // Estado para la categoría personalizada
    //console.log('productCategory', productCategory);
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
        if (productCategory === "0" && customCategory.trim() !== "") {
            alert(`La categoría personalizada "${customCategory}" será evaluada para darse de alta.`);
        }
    
        console.log('Agregando producto...');
        setProducts([...products, product]);
        setProduct(initialProduct);
        setProductCategory(''); // Reinicia la categoría seleccionada
        setCustomCategory(''); // Limpia la categoría personalizada
    }

    useEffect(() => {
        const isProductChanged = (Object.keys(initialProduct) as (keyof initialProductProps)[]).some(
            key => product[key] !== initialProduct[key]
        );
        setIsSaveButtonDisabled(!isProductChanged);
    }, [product])


    const categories = [
        { id: 1, name: 'Abarrotes' },
        { id: 2, name: 'Frutas' },
        { id: 3, name: 'Verduras' },
        { id: 4, name: 'Carnes' },
        { id: 5, name: 'Pescados' },
        { id: 6, name: 'Mariscos' },
        { id: 7, name: 'Tortilleria' },
        { id: 8, name: 'Ropa' },
        { id: 9, name: 'Zapatería' },
        { id: 10, name: 'Disfraces' },
        { id: 11, name: 'Mascotas' },
        { id: 12, name: 'Juguetes' },
        { id: 13, name: 'Herramientas' },
        { id: 14, name: 'Papelería' },
        { id: 15, name: 'Costura' },
        { id: 16, name: 'Ferretería' },
        { id: 17, name: 'Belleza' },
        { id: 18, name: 'Florería' },
        { id: 19, name: 'Comida' },
    ]

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
                            <option value="">Selecciona una categoría...</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
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
                {productCategory === "0" && (
                        <div>
                            <label htmlFor="customCategory">Escribe tu categoría</label>
                            <input
                                type="text"
                                className="form-control"
                                id="customCategory"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                placeholder="Ingresa una categoría personalizada"
                            />
                        </div>
                        )}
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
