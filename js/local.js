let userData
let currentProduct
let products
let id_tenant
let id_market
let user_cart = {}

let cart = []
const table = document.getElementById( 'table-data' )
document.addEventListener('DOMContentLoaded',async function () {
    const userCredentials = JSON.parse( localStorage.getItem( 'userCredentials' ) )
    userData = userCredentials
    renderTenantData()
    document.getElementById('user-name').innerHTML = userData.data_user.name_user
    products = JSON.parse( localStorage.getItem( 'products' ) )
    id_tenant = localStorage.getItem( 'id_tenant' )
    const retrieve_cart = JSON.parse( localStorage.getItem( 'cart' ) )
    console.log( retrieve_cart )
    if ( retrieve_cart !== null ) {
        user_cart = retrieve_cart
        cart = retrieve_cart.cart
    }
    console.log( user_cart )
    const idMarket = JSON.parse(localStorage.getItem('id_market'))
    id_market = idMarket
    document.getElementById('market-title').innerHTML = idMarket.marketData.name
    recursiveRender()
    if( userData.success ) {
        document.getElementById( 'register' ).style.display = 'none'
    }else if( userData.success === undefined ) {
        console.log( 'No access' )
        //location.replace( 'index.html' )
    }
    console.log( id_market, user_cart, cart )
})

const renderTenantData = () => {
    const tenant = JSON.parse(localStorage.getItem('tenant_data'))
    const icons = JSON.parse(localStorage.getItem('icons'))
    const icon1 = document.createElement('i')
    icon1.className = icons[0]
    const icon2 = document.createElement('i')
    icon2.className = icons[1]
    const p = document.createElement('i')
    p.innerHTML = `Local ${tenant.local_number} - ${tenant.name_tenenant}`
    const dataContainer = document.getElementById('tenant-data')
    dataContainer.appendChild(icon1)
    dataContainer.appendChild(icon2)
    dataContainer.appendChild(p)
}

const recursiveRender = ( count = 0, length = 1 ) => {
    if( length > products.length ) {
        return
    } else {
        const product = {}
        const row = document.createElement( 'tr' )
        const productName = document.createElement( 'th' )
        productName.scope = 'row'
        productName.className = 'titulo'
        productName.innerHTML = products[count].name
        const formColumn = document.createElement( 'td' )
        const formRadios = document.createElement( 'form' )
        formRadios.modality = 'pz'
        const radioPzContainer = document.createElement( 'div' )
        radioPzContainer.className = 'custom-control custom-radio'
        const radioPz = document.createElement( 'input' )
        radioPz.type = 'radio'
        radioPz.className = 'custom-control-input'
        radioPz.id = products[count].id_product + 'pz'
        radioPz.name = "radio-stacked"
        radioPz.value = 'pz'
        radioPz.name = 'radio-stacked'
        radioPz.required = true
        radioPz.checked = true
        
        const labelPz = document.createElement( 'label' )
        labelPz.className = 'custom-control-label'
        labelPz.htmlFor =  products[count].id_product + 'pz'
        labelPz.innerHTML = 'Pieza'

        const radioKgContainer = document.createElement( 'div' )
        radioKgContainer.className = 'custom-control custom-radio'
        const radioKg = document.createElement( 'input' )
        radioKg.type = 'radio'
        radioKg.className = 'custom-control-input'
        radioKg.id = products[count].id_product + 'kg'
        radioKg.name = "radio-stacked"
        radioKg.value = 'kg'
        radioKg.name = 'radio-stacked'
        radioKg.required = true
        const labelKg = document.createElement( 'label' )
        labelKg.className = 'custom-control-label'
        labelKg.htmlFor =  products[count].id_product + 'kg'
        labelKg.innerHTML = 'Peso'

        const quantityContainer = document.createElement( 'td' )
        const formQuantity = document.createElement( 'form' )
        formQuantity.addEventListener( 'submit', e => {
            e.preventDefault()
        } )
        if ( products[count].price_kg <= 0 ) {
            radioKg.style.display = 'none'
            labelKg.style.display = 'none'
        }

        if ( products[count].price_pz <= 0 ) {
            radioPz.style.display = 'none'
            labelPz.style.display = 'none'
        }
        const selectQuantityContainer = document.createElement( 'div' )
        selectQuantityContainer.className = 'form-group'
        const labelQuantity = document.createElement( 'label' )
        labelQuantity.htmlFor = products[count].id_product + 'quantity'
        labelQuantity.innerHTML = 'Cantidad'
        const quantityInput = document.createElement( 'input' )
        quantityInput.type = 'number'
        quantityInput.min = '1'
        quantityInput.max = '50'
        quantityInput.step = '1'
        quantityInput.className = 'form-control'
        quantityInput.defaultValue = 1
        quantityInput.addEventListener( 'change', function() {
            if( this.value <= 50 ) {
                this.value = this.value
            } else if ( this.value < 1 ) {
                this.value = 1
            } else {
                this.value = 50
            }
        } )

        const priceColumn = document.createElement( 'td' )
        priceColumn.className = 'titulo h4'
        priceColumn.innerHTML = `$ ${products[count].price_pz}/pz` 

        const addToCartColumn = document.createElement( 'td' )
        const addToCartButton = document.createElement( 'a' )
        addToCartButton.className = 'btn btn-block btn-outline-primary'
        addToCartButton.innerHTML = 'AGREGAR'
        addToCartButton.style.color = '#3b9aff'
        const buttonSpan = document.createElement( 'span' )
        buttonSpan.className = 'badge badge-success'
        buttonSpan.style.marginLeft = '4px'
        const buttonI = document.createElement( 'i' )
        buttonI.className = 'fas fa-check'
        buttonSpan.appendChild( buttonI )
        addToCartButton.appendChild( buttonSpan )
        //<span class="badge badge-success"><i class="fas fa-check"></i></span>

        radioKg.addEventListener( 'change', function() {
            console.log( this.value )
            formRadios.modality = this.value
            console.log( formRadios.modality )
            priceColumn.innerHTML = `$ ${products[count].price_kg}/kg` 
            quantityInput.step = 'any'
        } )

        radioPz.addEventListener( 'change', function() {
            console.log( this.value )
            formRadios.modality = this.value
            console.log( formRadios.modality )
            priceColumn.innerHTML = `$ ${products[count].price_pz}/pz`
            quantityInput.step = '1'
            quantityInput.value = Math.round( quantityInput.value )
        } )

        addToCartButton.addEventListener( 'click', () => {
            product.quantity = formRadios.modality === 'kg' ? parseFloat( quantityInput.value ) : parseInt( quantityInput.value )
            product.id_product =  parseInt( products[count].id_product )
            product.id_tenant = parseInt( id_tenant )
            product.price_pz = formRadios.modality === 'pz' ? parseInt( products[count].price_pz ) : 0
            product.price_kg = formRadios.modality === 'kg' ? parseInt( products[count].price_kg ) : 0
            product.name = products[count].name
            addToCart( products[count].id_product, product )
        } )

        addToCartColumn.appendChild( addToCartButton )
        selectQuantityContainer.appendChild( labelQuantity )
        selectQuantityContainer.appendChild( quantityInput )
        formQuantity.appendChild( selectQuantityContainer )
        quantityContainer.appendChild( formQuantity )
        radioPzContainer.appendChild( radioPz )
        radioPzContainer.appendChild( labelPz )
        radioKgContainer.appendChild( radioKg )
        radioKgContainer.appendChild( labelKg )
        formRadios.appendChild( radioPzContainer )
        formRadios.appendChild( radioKgContainer )
        formColumn.appendChild( formRadios )
        row.appendChild( productName )
        row.appendChild( formColumn )
        row.appendChild( quantityContainer )
        row.appendChild( priceColumn )
        row.appendChild( addToCartColumn )
        table.appendChild( row )
        return recursiveRender( count + 1, length + 1  )
    }
}
const addToCart = ( id_product, product ) => {
    console.log( id_market )
    if (  cart === undefined ||  cart.length < 1 ) {
        cart = []
        user_cart.id_market = id_market.marketData.id_product
        product.id_category = JSON.parse( localStorage.getItem('id-category') )
        cart.push ( product )
        user_cart.cart = cart
        //user_cart.id_user = userData.data_user.id_user
        localStorage.setItem( 'cart', JSON.stringify( user_cart ) )
        swal({
            title: "Okay",
            text: "El producto se ha agregado a tu carrito",
            icon: "success",
            button: "Aceptar",
        }).then(() => window.location.reload())
        console.log( cart )
    } else {   
        if ( user_cart.id_market === id_market.marketData.id_product ) {
            let inCartProduct = cart.find( element => element.id_product === id_product )
        if ( inCartProduct ) {
            inCartProduct = { ...inCartProduct, quantity: product.quantity }
        } else {
            //user_cart.id_market = id_market.marketData.id_product
            product.id_category = JSON.parse( localStorage.getItem('id-category') )
            cart.push( product )
            user_cart.cart = cart
            //user_cart.id_user = userData.data_user.id_user
            localStorage.setItem( 'cart', JSON.stringify( user_cart ) )
            swal({
                title: "Okay",
                text: "El producto se ha agregado a tu carrito",
                icon: "success",
                button: "Aceptar",
            }).then(() => window.location.reload())
        }
        } else {
            swal({
                title: "Upss",
                text: "No se puede agregar un producto de otro mercado/tianguis. Los productos en tu carrito deben ser del mismo mercado/tianguis",
                icon: "info",
                button: "Aceptar",
            })
        }
    }
    console.log( user_cart )
}
