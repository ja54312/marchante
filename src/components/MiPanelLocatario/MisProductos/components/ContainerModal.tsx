import './Modal.scss'

const ContainerModal = () => {
    return (
        <section className='sectionContainerModal'>
            <div className="modal-body text-center">
                <p className="text-secondary">
                    Cambia tus precios o nombre y guarda al final.
                </p>
                <div className="form-row align-items-center text-center">
                    <div className="form-group col-md-12">
                        <label htmlFor="product">Nombre de tu Producto</label>
                        <input
                            type="text"
                            className="form-control text-center"
                            id="productName"
                            placeholder="Elige un nuevo nombre"
                            required
                        />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="prePz">Precio por 1 Pieza</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text bg-primary text-white">$</div>
                            </div>
                            <input
                                type="number"
                                className="form-control text-center"
                                id="productPz"
                                placeholder="$$$"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="prePs">Precio por 1 Kilo</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text bg-primary text-white">$</div>
                            </div>
                            <input
                                type="number"
                                className="form-control text-center"
                                id="productKg"
                                placeholder="$$$"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button
                    className="btn btn-primary"
                    data-dismiss="modal"
                    aria-label="Close"
                //onClick="updateProduct()"
                >
                    Guardar
                </button>
            </div>
        </section>
    )
}

export default ContainerModal