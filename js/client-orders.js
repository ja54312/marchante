let userData
let orders
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

        const totalOrder = document.createElement( 'td' )
        totalOrder.className = 'h4 titulo'
        totalOrder.innerHTML = `$ ${orders[count].total}`

        row.appendChild( idOrder )
        row.appendChild( orderDate )
        row.appendChild( mercadoTianguis )
        row.appendChild( orderStatus )
        row.appendChild( totalOrder )
        table.appendChild( row )

        return renderOrdersClient( count + 1, length + 1 )
    }
}