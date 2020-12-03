let userData
let currentProduct
let cart
const addressForm = document.getElementById( 'address-form' )
const table = document.getElementById('products-table')
document.addEventListener( 'DOMContentLoaded', async function () {
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    userData=userCredentials
    const user_cart = JSON.parse( localStorage.getItem( 'cart' ) )
    cart = user_cart
    if ( cart.cart === undefined ) {
        location.replace( 'mandado.html' )
    }
    //console.log( cart )
    if ( userData.success ) {
        document.getElementById( 'register' ).style.display = 'none'
        document.getElementById( 'user-name' ).innerHTML = userData.data_user.name
        document.getElementById( 'current-date' ).innerHTML = moment().format('L')
    } else if ( userData.success === undefined ) {
        location.replace('index.html')
    }
    renderDetails()
});

const renderDetails = ( count = 0, length = 1 ) => {
    if( length > cart.cart.length ) {
        return
    } else {
        const row = document.createElement( 'tr' )
        const productName = document.createElement( 'th' )
        productName.scope = 'row'
        productName.innerHTML = cart.cart[count].name

        const quantityContainer = document.createElement( 'td' )
        quantityContainer.innerHTML = cart.cart[count].price_pz === 0 ? `${ cart.cart[count].quantity } kg` : `${ cart.cart[count].quantity } pz`

        const parcialPriceContaier = document.createElement( 'td' )
        parcialPriceContaier.innerHTML = cart.cart[count].price_pz === 0 ? `$ ${cart.cart[count].price_kg * parseInt( cart.cart[count].quantity )}` : `$ ${cart.cart[count].price_pz * parseInt( cart.cart[count].quantity )}`

        row.appendChild( productName )
        row.appendChild( quantityContainer )
        row.appendChild( parcialPriceContaier )
        table.appendChild( row )
        return renderDetails( count + 1, length + 1  )
    }
}

addressForm.addEventListener( 'submit', function( e ) {
    let error = false
    e.preventDefault()
    const keys = Object.keys( this )
    console.log( keys )
    for( let i = 0; i < this.length - 1; i ++ ) {
        if( this[i].value === '' || null || undefined ) {
            error = true
        }
    }
    if ( !error ) {
        createOrder()
    }
} )

const createOrder = async ( tries = 0 ) => {
    document.getElementById('loader').style.display = 'block'
    if( tries === 5 ) {
        document.getElementById('loader').style.display = 'none'
        return (
            swal({
                title: "Oooops",
                text: "Asegurate de tener conexión a internet",
                icon: "info",
                button: "Aceptar",
            })
        )
    } else {
        try {
            const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/create-order/'
            const request = await fetch( url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                },
                body: JSON.stringify( cart )
            } )
            const response = await request.json()
            if( response.success ) {
                document.getElementById('loader').style.display = 'none'
                swal({
                    title: "Wuuuuu",
                    text: response.msg,
                    icon: "success",
                    button: "Aceptar",
                }).then(() => {
                    cart = {}
                    localStorage.setItem('cart', JSON.stringify( cart ))
                    table.innerHTML = ''
                })
            }
            //console.log( response )
        } catch (error) {
            return createOrder( tries + 1 )
        }
        
    }
}