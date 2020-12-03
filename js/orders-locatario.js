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
                renderOrders()
                console.log( response )
            }
        } catch (error) {
            return getOrders( tries + 1 )
        }
    }
}

const renderOrders = ( count = 0, length = 1 ) => {
    if ( length > orders.length ) {
        $(".dataTable").DataTable({
            language: {
              "search": "Buscar", 
              "lengthMenu": "",
              "info": "",
        }})
        return
    } else {
        const row = document.createElement( 'tr' )

        const orderNumber = document.createElement( 'td' )
        orderNumber.innerHTML = orders[count].id_detail_order

        const nameClient = document.createElement( 'th' )
        nameClient.scope = 'row'
        nameClient.innerHTML = 'Carlitos'

        const nameProduct = document.createElement( 'th' )
        nameProduct.className = 'h4 titulo'
        nameProduct.innerHTML = orders[count].name_product

        row.appendChild( orderNumber )
        row.appendChild( nameClient )
        row.appendChild( nameProduct )
        tableOrders.appendChild( row )
    }
}