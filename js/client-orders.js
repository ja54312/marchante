let userData
let orders
const detailsOrder = document.getElementById( 'details-order' )
const table = document.getElementById( 'user-orders' )
document.addEventListener('DOMContentLoaded',async () => {
    document.getElementById('loader').style.display = 'block'
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    userData = userCredentials
    document.getElementById('user-name').innerHTML = userData.data_user.name_user
    if( !userData.success ){
        document.getElementById('loader').style.display='none'
        location.replace('index.html')
    } else {
        await getUserOrders()
        //renderOrdersClient()
        document.getElementById('loader').style.display='none'
    }
})

const getUserOrders = async ( tries = 0 ) => {
    if ( tries === 5 ) {
        return(
            swal({
                title: "Oooops",
                text: "Asegurate de tener conexión a internet",
                icon: "info",
                button: "Aceptar",
            })
        )
    } else {
        try {
            const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/list-orders-clients/${userData.data_user.id_user}`
            const request = await fetch( url, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            } )
            const response = await request.json()
            if ( response.success ) {
                orders = response.orders
                console.log( response.orders )
                renderOrdersClient()
                $(".dataTable2").DataTable({
                    language: {
                      "search": "Buscar", 
                      "lengthMenu": "",
                      "info": "",
                }})
                console.log( response.orders )
            }
        } catch (error) {
            return getUserOrders( tries + 1 )
        }
    }
}

const renderOrdersClient = ( count = 0, length = 1 ) => {
    if ( length > orders.length ) {
        return
    } else {
        const row = document.createElement( 'tr' )

        const idOrder = document.createElement( 'td' )
        idOrder.innerHTML = orders[count].id_order

        const orderDate = document.createElement( 'td' )
        orderDate.innerHTML = orders[count].created_at

        const mercadoTianguis = document.createElement( 'th' )
        mercadoTianguis.className = 'h4 titulo'
        mercadoTianguis.scope = 'row'
        mercadoTianguis.innerHTML = orders[count].name_market

        const orderStatus = document.createElement( 'td' )
        orderStatus.innerHTML = orders[count].name_status

        const tenants = document.createElement( 'td' )

        for ( let i = 0; i < orders[count].detail_order.length; i ++ ) {
            tenants.innerHTML = `${ tenants.innerHTML } ${ orders[count].detail_order[i].name_tenant },`
        }

        //data-toggle="modal" data-target="#domPdt1"
        const totalOrder = document.createElement( 'td' )
        totalOrder.className = 'h4 titulo'
        totalOrder.innerHTML = `$ ${orders[count].total}`

        const actionsContainer = document.createElement( 'td' )
        const buttonShowMore = document.createElement( 'button' )
        buttonShowMore.className = 'btn btn-sm btn-success'
        buttonShowMore.innerHTML = 'VER DETALLES'
        buttonShowMore.setAttribute("data-toggle", "modal")
        buttonShowMore.setAttribute("data-target", "#domPdt1")
        buttonShowMore.addEventListener( 'click', () => renderDetails(orders[count].detail_order))
        actionsContainer.appendChild( buttonShowMore )


        row.appendChild( idOrder )
        row.appendChild( orderDate )
        row.appendChild( mercadoTianguis )
        row.appendChild( orderStatus )
        row.appendChild( tenants )
        row.appendChild( totalOrder )
        row.appendChild( actionsContainer )
        table.appendChild( row )

        return renderOrdersClient( count + 1, length + 1 )
    }
}

const renderDetails = ( details, count = 0, length = 1 ) => {
    if( length > details.length ) {
        return
    } else {
        console.log( details[count] )
        const nameContainer = document.createElement( 'tr' )
        const name = document.createElement( 'td' )
        name.scope = 'row'
        name.innerHTML = details[count].name_product
        nameContainer.appendChild( name )

        const quantityContainer = document.createElement( 'tr' )
        const quantity = document.createElement( 'td' )
        quantity.scope = 'row'
        quantity.innerHTML = details[count].price_pz !== 0 ? `Cantidad: ${details[count].quantity}pz` : `Cantidad: ${details[count].quantity}kg`
        //`Cantidad: ${details[count].quantity}`
        quantityContainer.appendChild( quantity )

        const priceContainer = document.createElement( 'tr' )
        const price = document.createElement( 'td' )
        price.innerHTML = `Subtotal: $ ${details[count].subtotal}`
        priceContainer.appendChild( price )

        detailsOrder.appendChild( nameContainer )
        detailsOrder.appendChild( quantityContainer )
        detailsOrder.appendChild( priceContainer )
        return renderDetails ( details, count + 1, length + 1 )
    }
    
}