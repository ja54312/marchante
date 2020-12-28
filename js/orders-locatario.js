let orders = [] 
const tableOrders = document.getElementById('orders-table')
document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('loader').style.display = 'block'
    if (userData.success) {
        document.getElementById('register').style.display = 'none'
        getOrders()
    } else if (userData.success === undefined) {
        location.replace('index.html')
    }
    document.getElementById('loader').style.display = 'none'

})

const getOrders = async ( tries = 0 ) => {
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
            const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/list-order-tenant/${userData.data_user.id_user}`
            const request = await fetch( url, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            })
            const response = await request.json()
            if ( response.success ) {
                document.getElementById('loader').style.display = 'none'
                orders = response.orders
                console.log(orders)
                renderOrders()
                $(".dataTable2").DataTable({
                    language: {
                      "search": "Buscar", 
                      "lengthMenu": "",
                      "info": "",
                }})
                console.log( response )
            }
        } catch (error) {
            return getOrders( tries + 1 )
        }
    }
}

const renderOrders = ( count = 0, length = 1 ) => {
    if ( length > orders.length ) {
        return
    } else {
        const row = document.createElement( 'tr' )

        const orderNumber = document.createElement( 'td' )
        orderNumber.innerHTML = orders[count].id_detail_order

        const nameClient = document.createElement( 'th' )
        nameClient.scope = 'row'
        nameClient.innerHTML = orders[count].name_user

        const nameProduct = document.createElement( 'th' )
        nameProduct.className = 'h4 titulo'
        nameProduct.innerHTML = orders[count].name_product

        const quantityPriceContainer = document.createElement( 'td' )
        const quantitySpan = document.createElement( 'span' )
        quantitySpan.innerHTML = orders[count].price_kg === 0 ? `${orders[count].quantity} pz` : `${orders[count].quantity} kg`
        const priceSpan = document.createElement( 'span' )
        priceSpan.className = 'font-weight-bold'
        priceSpan.innerHTML = orders[count].price_kg === 0 ? ` $${ orders[count].price_pz * orders[count].quantity }` : ` $${ orders[count].price_kg * orders[count].quantity }`
        quantityPriceContainer.appendChild( quantitySpan )
        quantityPriceContainer.appendChild( priceSpan )

        const deliveryContainer = document.createElement( 'td' )
        deliveryContainer.innerHTML = 'Recoge en puesto'

        const actionsContainer = document.createElement( 'td' )
        actionsContainer.className = 'text-right'
        const readyButton = document.createElement( 'button' )
        readyButton.type = 'button'
        readyButton.className = 'btn btn-sm btn-success'
        const buttonIcon = document.createElement( 'i' )
        buttonIcon.className = 'fas fa-check'
        const buttonTitle = document.createElement( 'span' )
        buttonTitle.innerHTML = 'LISTO'
        readyButton.appendChild( buttonIcon )
        readyButton.appendChild( buttonTitle )
        actionsContainer.appendChild( readyButton )

        row.appendChild( orderNumber )
        row.appendChild( nameClient )
        row.appendChild( nameProduct )
        row.appendChild( quantityPriceContainer )
        row.appendChild( deliveryContainer )
        row.appendChild( actionsContainer )
        tableOrders.appendChild( row )
        return renderOrders( count + 1, length + 1 )
    }
}