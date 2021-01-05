let userData
let currentProduct
let currentMarketId
let tablesData
const categories = []
let cart = []
const tableOneContent = document.getElementById('pasillo1-content')
document.addEventListener('DOMContentLoaded',async () => {
    document.getElementById('loader').style.display = 'block'
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    userData = userCredentials
    document.getElementById('username').innerHTML = userData.data_user.name_user
    const idMarket = JSON.parse(localStorage.getItem('id_market'))
    const user_cart = JSON.parse(localStorage.getItem('cart'))
    cart = user_cart
    document.getElementById('market-title').innerHTML = idMarket.marketData.name
    console.log( idMarket )
    if( idMarket ) {
        currentMarketId = idMarket
        await getProductsMarket()
        await getCategories()
        document.getElementById('loader').style.display='none'
    } else {
        document.getElementById('loader').style.display='none'
        window.location.replace('index.html')
    }
    if( !userData.success ){
        document.getElementById('loader').style.display='none'
        location.replace('index.html')
    }
})

const getCategories = async ( tries = 0 ) => {
    if ( tries === 5 ) {
        document.getElementById( 'loader' ).style.display = 'none'
        return (
            swal({
                title: "Ooooops",
                text: "Asegurate de tener conexión a internet",
                icon: "info",
                button: "Aceptar",
            })
        )
    } else {
        try {
            const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-category-product/${currentMarketId.type}`
            const request = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            })
            const response = await request.json()
            if ( response.success ) {
                console.log( response )
                response.row.forEach(element => {
                    categories.push( element )
                });
                //await getProductsByCategory()
            }
        } catch (error) {
            return getCategories( tries + 1 )
        }
    }
}

const hideCategories = () => {
    for (let i = 0; i < tablesData.length; i++) {
        if( tablesData[i].tenants_array === undefined ) {
            document.getElementById(`${i + 1}`).style.display = 'none'
        }
    }
}

const renderData = ( menu, toMenu, category ) => {
    /*for ( let i = 0; i < tablesData.length; i ++ ) {
        const tableContainer = document.createElement( 'div' )
        tableContainer.className = 'card border-info'
        const cardHeader = document.createElement( 'div' )

    }*/
    document.getElementById( toMenu ).innerHTML = ''
    if( tablesData[menu].tenants_array === undefined ) {
        document.getElementById(`pasillo${menu + 1}`).innerHTML = ''
        const noTenantsContainer  = document.createElement('div')
        noTenantsContainer.className = 'no-tenants--container'
        const noTenantsMessage = document.createElement('div')
        noTenantsMessage.className = 'card-title lead d-inline'
        noTenantsMessage.innerHTML = 'No hay locatarios para esta sección'
        noTenantsContainer.appendChild(noTenantsMessage)
        document.getElementById(`pasillo${menu + 1}`).appendChild(noTenantsContainer)
        return
    }
    for ( let i = 0; i < tablesData[menu].tenants_array.length; i ++ ) {
        const tenant_data = tablesData[menu].tenants_array[i]
        const tableRow = document.createElement( 'tr' )
        const localNumber = document.createElement( 'th' )
        localNumber.scope = 'row'
        localNumber.innerHTML = tablesData[menu].tenants_array[i].local_number
        const nameTenant = document.createElement( 'td' )
        nameTenant.innerHTML = tablesData[menu].tenants_array[i].name_tenenant
        const buy = document.createElement( 'td' )
        const buyButton = document.createElement( 'a' )
        buyButton.addEventListener('click', async e => {
            document.getElementById('loader').style.display = 'block'
            e.preventDefault()
            localStorage.setItem( 'tenant_data', JSON.stringify( tenant_data ) )
            const icons = [tablesData[menu].icon_1, tablesData[menu].icon_2]
            localStorage.setItem('icons' , JSON.stringify(icons))
            await getProductsToBuy( tenant_data, categories[menu].id_product )
            // console.log( categories[menu] )
            // window.location.href = 'local.html'
        })
        buyButton.className = 'btn btn-block btn-outline-primary'
        buyButton.innerHTML = 'PEDIR'
        if ( cart !== null && cart.cart !== undefined && cart.cart[0] !== undefined ) {
            console.log( cart )
            const isInCart = cart.cart.find(item => item.id_category === categories[menu].id_product && item.id_tenant === tenant_data.id_tenant)
            if ( isInCart ) {
                const buttonSpan = document.createElement( 'span' )
                buttonSpan.className = 'badge badge-success'
                const buttonI = document.createElement( 'i' )
                buttonI.className = 'fas fa-check'
                buyButton.appendChild( buttonSpan )
                buyButton.appendChild( buttonI )
            }
        }
        buy.appendChild( buyButton )
        tableRow.appendChild( localNumber )
        tableRow.appendChild( nameTenant )
        tableRow.appendChild( buy )
        document.getElementById( toMenu ).appendChild( tableRow )
    }
}

const getProductsByCategory = async ( tries = 1, id_category ) => {
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-products/${tablesData[13].id_category}`
    const request = await fetch( url, {
        headers: {
            'Authorization': `Bearer ${userData.token}`
        }
    } )
    const response = await request.json()
    console.log( response )
}

const getProductsToBuy = async ( tenant_data, id_category ) => {
    localStorage.setItem('id-category', id_category )
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-products/${tenant_data.id_tenant}/${tenant_data.id_market}/${id_category}`
    console.log( 'Getting response' )
    const request = await fetch( url, {
        headers: {
            'Authorization': `Bearer ${userData.token}`
        }
    })
    const response = await request.json()
    console.log( response )
    if( response.success ) {
        console.log( response )
        localStorage.setItem( 'products', JSON.stringify( response.row ) )
        localStorage.setItem( 'id_tenant', tenant_data.id_tenant )
        // console.log( tenant_data )
        window.location.href = 'local.html'
    }
    document.getElementById('loader').style.display = 'none'
    
}

const getProductsMarket = async () => {
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-associated-tenants/`
    const data = {
        id_market: parseInt( currentMarketId.marketData.id_product ),
        type_market: currentMarketId.type
    }
    const request = await fetch( url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify( data )
    })
    const response = await request.json()
    console.log(response)
    if( response.success ) {
        console.log( response.row )
        tablesData = response.row
        hideCategories()
    }
}