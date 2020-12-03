let userData
let currentProduct
let cart
const table = document.getElementById( 'table-data' )
const inputAddQuantity = document.getElementById( 'add-quantity' )
const removeButton = document.getElementById( 'remove' )
const addButton = document.getElementById( 'add' )
const saveButton = document.getElementById( 'save-changes' )
document.addEventListener('DOMContentLoaded',async function () {
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
    userData = userCredentials
    const user_cart = JSON.parse( localStorage.getItem( 'cart' ) )
    cart = user_cart
    if ( cart.cart === undefined ) {
        location.replace( 'mandado.html' )
    }
    if ( userData.success ) {
        document.getElementById('register').style.display = 'none'
        document.getElementById( 'user-name' ).innerHTML = userData.data_user.name
        showTotalPay()
        renderCartProducts()
    } else if ( userData.success === undefined ) {
        location.replace('index.html')
    }
});

const showTotalPay = () => {
    let parcialTotal = 0
    let totalProducts = []
    cart.cart.map( product => {
        let price = 0
        price = product.price_kg === 0 ? price + ( product.price_pz * parseInt( product.quantity ) ) : price + ( product.price_kg * parseInt( product.quantity ) )
        totalProducts.push( price )
    } )
    for( let i = 0; i < totalProducts.length; i ++ ) {
        parcialTotal = parcialTotal + totalProducts[i]
    }
    document.getElementById('total-parcial').innerHTML = `$${parcialTotal}`
    document.getElementById( 'total-pedido' ).innerHTML = `$${ parcialTotal + 25 }`
    document.getElementById( 'total-parcial-nenvio' ).innerHTML = `$${parcialTotal}`
    document.getElementById( 'total-pedido-nenvio' ).innerHTML = `$${ parcialTotal }`
    console.log( parcialTotal )
}

const renderCartProducts = ( count = 0, length = 1 ) => {
    if( length > cart.cart.length ) {
        return
    } else {
        const row = document.createElement( 'tr' )

        const productTitle = document.createElement( 'th' )
        productTitle.className = 'titulo h4'
        productTitle.scope = 'row'
        productTitle.innerHTML = cart.cart[count].name

        const quantityContainer = document.createElement( 'td' )
        quantityContainer.innerHTML = cart.cart[count].price_pz === 0 ? `${ cart.cart[count].quantity } kg` : `${ cart.cart[count].quantity } pz`

        const parcialContainer = document.createElement( 'td' )
        parcialContainer.className = 'titulo h4'
        parcialContainer.innerHTML = cart.cart[count].price_pz === 0 ? `$ ${cart.cart[count].price_kg * parseInt( cart.cart[count].quantity )}` : `$ ${cart.cart[count].price_pz * parseInt( cart.cart[count].quantity )}`

        const actionsContainer = document.createElement( 'td' )
        const editButton = document.createElement( 'button' )
        editButton.type = 'button'
        editButton.className = 'btn btn-warning btn-sm'
        editButton.setAttribute("data-toggle", "modal")
        editButton.setAttribute("data-target", "#exampleModalPdt1")
        const editButtonIcon = document.createElement( 'i' )
        editButtonIcon.className = 'fas fa-edit'
        editButtonIcon.style.marginRight = '5px'
        const editButtonTitle = document.createElement( 'i' )
        editButtonTitle.innerHTML = 'EDITAR'
        editButton.appendChild( editButtonIcon )
        editButton.appendChild( editButtonTitle )
        editButton.addEventListener( 'click', e => handleClick( e, cart.cart[count] ) )

        const deleteButton = document.createElement( 'button' )
        deleteButton.type = 'button'
        deleteButton.className = 'btn btn-danger btn-sm'
        const deleteButtonIcon = document.createElement( 'i' )
        deleteButtonIcon.className = 'fas fa-trash-alt'
        deleteButtonIcon.style.marginRight = '5px'
        const deleteButtonTitle = document.createElement( 'i' )
        deleteButtonTitle.innerHTML = 'ELIMINAR'
        deleteButton.appendChild( deleteButtonIcon )
        deleteButton.appendChild( deleteButtonTitle )
        deleteButton.addEventListener( 'click', e => deleteProduct( e, cart.cart[count] ) )

        actionsContainer.appendChild( editButton )
        actionsContainer.appendChild( deleteButton )

        row.appendChild( productTitle )
        row.appendChild( quantityContainer )
        row.appendChild( parcialContainer )
        row.appendChild( actionsContainer )
        table.appendChild( row )
        return renderCartProducts( count + 1, length + 1  )
    }
}

const deleteProduct = ( e, product ) => {
    e.preventDefault()
    cart.cart = cart.cart.filter( accepted => accepted !== product )
    localStorage.setItem( 'cart', JSON.stringify( cart ) )
    table.innerHTML = ''
    renderCartProducts()
    showTotalPay()
}

const handleClick = ( e, product ) => {
    e.preventDefault()
    currentProduct = product
    inputAddQuantity.value = currentProduct.quantity
    console.log( currentProduct )
}
removeButton.addEventListener( 'click', () => {
    const value = parseInt( inputAddQuantity.value )
    if( value === 1 ) {
        return
    } else {
        inputAddQuantity.value =  parseInt( inputAddQuantity.value ) - 1
        let inCartProduct = cart.cart.find( element => element.id_product === currentProduct.id_product )
        if ( inCartProduct ) {
            inCartProduct = { ...inCartProduct, quantity: parseInt( inputAddQuantity.value ) }
        }
    }
} )
addButton.addEventListener( 'click', () => {
    const value = parseInt( inputAddQuantity.value )
    if( value === 50 ) {
        return
    } else {
        inputAddQuantity.value =  parseInt( inputAddQuantity.value ) + 1
        let inCartProduct = cart.cart.find( element => element.id_product === currentProduct.id_product )
        if ( inCartProduct ) {
            inCartProduct = { ...inCartProduct, quantity: parseInt( inputAddQuantity.value ) }
        }
    }
} )

saveButton.addEventListener( 'click', e => saveChanges( e ) )

const saveChanges = e => {
    e.preventDefault()
    let inCartProduct = cart.cart.find( element => element.id_product === currentProduct.id_product )
    if ( inCartProduct ) {
        inCartProduct = { ...inCartProduct, quantity: parseInt( inputAddQuantity.value ) }
        console.log( inCartProduct )
        for ( let i = 0; i < cart.cart.length; i ++ ) {
            if( cart.cart[i].id_product === inCartProduct.id_product ) {
                cart.cart[i] = inCartProduct
            }
        }
        localStorage.setItem( 'cart', JSON.stringify( cart ) )
        table.innerHTML = ''
        renderCartProducts()
        showTotalPay()
        console.log( cart.cart )
    }
}