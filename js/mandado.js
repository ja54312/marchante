let userData
let currentProduct
let currentMarketId
let tablesData
const tableOneContent = document.getElementById('pasillo1-content')
document.addEventListener('DOMContentLoaded',async () => {
    document.getElementById('loader').style.display='block'
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    userData=userCredentials
    document.getElementById('username').innerHTML = userData.data_user.name_user
    const idMarket = JSON.parse(localStorage.getItem('id_market'))
    document.getElementById('market-title').innerHTML = idMarket.marketData.name
    console.log( idMarket )
    if( idMarket ) {
        currentMarketId = idMarket
        await getProductsMarket()
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

const renderData = ( menu, toMenu ) => {
    /*for ( let i = 0; i < tablesData.length; i ++ ) {
        const tableContainer = document.createElement( 'div' )
        tableContainer.className = 'card border-info'
        const cardHeader = document.createElement( 'div' )

    }*/
    document.getElementById( toMenu ).innerHTML = ''
    for ( let i = 0; i < tablesData[menu].tenants_array.length; i ++ ) {
        const tableRow = document.createElement( 'tr' )
        const localNumber = document.createElement( 'th' )
        localNumber.scope = 'row'
        localNumber.innerHTML = tablesData[menu].tenants_array[i].local_number
        const nameTenant = document.createElement( 'td' )
        nameTenant.innerHTML = tablesData[menu].tenants_array[i].name_tenenant
        const category = document.createElement( 'td' )
        category.innerHTML = 'Frutas'
        const buy = document.createElement( 'td' )
        const buyButton = document.createElement( 'a' )
        buyButton.addEventListener('click', async e => {
            e.preventDefault()
            const tenant_data = tablesData[menu].tenants_array[i]
            await getProductsToBuy( tenant_data )
            console.log( tenant_data )
            //window.location.href = 'local.html'
        })
        buyButton.className = 'btn btn-block btn-outline-primary'
        buyButton.innerHTML = 'PEDIR'
        const buttonSpan = document.createElement( 'span' )
        buttonSpan.className = 'badge badge-success'
        const buttonI = document.createElement( 'i' )
        buttonI.className = 'fas fa-check'
        buyButton.appendChild( buttonSpan )
        buyButton.appendChild( buttonI )
        buy.appendChild( buyButton )
        tableRow.appendChild( localNumber )
        tableRow.appendChild( nameTenant )
        tableRow.appendChild( category )
        tableRow.appendChild( buy )
        document.getElementById( toMenu ).appendChild( tableRow )
    }
}

const getProductsToBuy = async ( tenant_data, tries = 0 ) => {
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-products/${tenant_data.id_tenant}`
    console.log( 'Getting response' )
    try {
        const request = await fetch( url, {
            headers: {
                'Authorization': `Bearer ${userData.token}`
            }
        })
        const response = await request.json()
        if( response.success ) {
            localStorage.setItem( 'products', JSON.stringify( response.row ) )
            localStorage.setItem( 'id_tenant', tenant_data.id_tenant )
            window.location.href = 'local.html'
        }
    } catch (error) {
        if( tries === 5 ) {
            return(
                swal({
                    title: "Ooooops",
                    text: "Asegurate de tener conexión a internet",
                    icon: "info",
                    button: "Aceptar",
                })
            )
        } else {
            return getProductsToBuy( tenant_data, tries + 1 )
        }
    }
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
    if( response.success ) {
        console.log( response.row )
        tablesData = response.row
    }
}