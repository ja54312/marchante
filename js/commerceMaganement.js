const userAccount = JSON.parse( localStorage.getItem('userCredentials') )
const cpMercado = document.getElementById('cpMercados')
const cpTianguis = document.getElementById('cpTianguis')
const mercados = document.getElementById('mercados')
const tianguis = document.getElementById('tianguis')
const mercadosSuggestionsContainer = document.getElementById('suggestions-mercados')
const tianguisSuggestionsContainer = document.getElementById('suggestions-tianguis')
const enterMercadoButton = document.getElementById('enter-mercado')
const enterTianguisButton = document.getElementById('enter-tianguis')
let marketData 
let marketSuggestions
let cpSuggestions = []
const CPs = {}
let cpToFind
document.addEventListener( 'DOMContentLoaded', async function () {
    enterMercadoButton.addEventListener('click', e => findSellers( e, 'mercado' ))
    enterTianguisButton.addEventListener('click', e => findSellers( e, 'tianguis' ))
    await getCPs()
})
const findSellers = ( e, about ) => {
    e.preventDefault()
    if( about === 'mercado' ) {
        if( mercados.value === '' ){
            swal({
                title: "Upss",
                text: "Debe haber una opción seleccionada",
                icon: "info",
                button: "Aceptar",
            })
        } else {
            const marketData = marketSuggestions.filter( market => market.id_product.toString() === mercados.value ) 
            localStorage.setItem('id_market', JSON.stringify( { type: 'mercado', marketData: marketData[0] } ))
            window.location.href = 'mandado.html'
        }
    } else {
        if( tianguis.value === '' ) {
            swal({
                title: "Upss",
                text: "Debe haber una opción seleccionada",
                icon: "info",
                button: "Aceptar",
            })
        }else {
            const marketData = marketSuggestions.filter( market => market.id_product.toString() === tianguis.value ) 
            localStorage.setItem('id_market', JSON.stringify( { type: 'tianguis', marketData: marketData[0] } ))
            window.location.href = 'mandado.html'
        }
    }
}

const getCPs = async () => {
    const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-postal-code/'
    const requestcpMercados = await fetch( url + 'mercado', {
        headers: {
            'Authorization': `Bearer ${ userAccount.token }`
        }
    } )
    const resultsMercados = await requestcpMercados.json()
    if( resultsMercados.success ) {
        CPs.mercados = resultsMercados.row
        const requestcpTianguis = await fetch( url + 'tianguis', {
            headers: {
                'Authorization': `Bearer ${ userAccount.token }`
            }
        })
        const resultsTianguis = await requestcpTianguis.json()
        if( resultsTianguis.success ) {
            CPs.tianguis = resultsTianguis.row
        }
    }
}

const findSuggestions = about => {
    if( about === 'mercado' ) {
        const regex = new RegExp(`${cpMercado.value}`, 'i')
        const suggestions = CPs.mercados.filter( cp => regex.test( cp.name ) )
        cpSuggestions = suggestions
        removeSuggestions( 'mercado' )
    } else {
        const regex = new RegExp(`${cpTianguis.value}`, 'i')
        const suggestions = CPs.tianguis.filter( cp => regex.test( cp.name ) )
        cpSuggestions = suggestions
        removeSuggestions( 'tianguis' )
    }
}

const removeSuggestions = about => {
    if( about === 'mercado' ){
        mercadosSuggestionsContainer.innerHTML = ''
        renderSuggestions('mercado')
    } else {
        tianguisSuggestionsContainer.innerHTML = ''
        renderSuggestions('tianguis')
    }
}

const findMarketsByCP = async about => {
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-cat-markets/${cpToFind}`
    const request = await fetch( url, {
        headers: {
            'Authorization': `Bearer ${ userAccount.token }`
        }
    })
    const response = await request.json()
    console.log( response )
    if( response.success ) { 
        marketSuggestions = response.row
        renderMarketSuggestions( about )
    } else {
        if( about === 'mercado' ) {
            mercados.innerHTML = ''
        } else {
            tianguis.innerHTML = ''
        }
    }
}

const renderMarketSuggestions = about => {
    if( about === 'mercado' ) {
        for ( let i = 0; i < marketSuggestions.length; i ++ ) {
            const option = document.createElement('option')
            option.innerHTML = marketSuggestions[i].name
            option.value = marketSuggestions[i].id_product
            mercados.appendChild( option )
        }
    } else {
        for ( let i = 0; i < marketSuggestions.length; i ++ ) {
            const option = document.createElement('option')
            option.innerHTML = marketSuggestions[i].name
            option.value = marketSuggestions[i].id_product
            tianguis.appendChild( option )
        }
    }
}
  
const renderSuggestions = about => {
    if( about === 'mercado' ){
        for( let i = 0; i < cpSuggestions.length; i ++ ) {
            const option = document.createElement('button')
            option.className = 'btn btn-primary btn-sm btn-block'
            option.innerHTML = cpSuggestions[i].name
            option.addEventListener('click', async e => {
                e.preventDefault()
                document.getElementById('loader').style.display = 'block'
                cpMercado.value = cpSuggestions[i].name
                cpToFind = cpSuggestions[i].id_product
                await findMarketsByCP('mercado')
                document.getElementById('loader').style.display = 'none'
                mercados.focus()
                mercadosSuggestionsContainer.innerHTML = ''
            })
            mercadosSuggestionsContainer.appendChild( option )
        }
    } else {
        for( let i = 0; i < cpSuggestions.length; i ++ ) {
            const option = document.createElement('button')
            option.className = 'btn btn-primary btn-sm btn-block'
            option.innerHTML = cpSuggestions[i].name
            option.addEventListener('click', async e => {
                e.preventDefault()
                document.getElementById('loader').style.display = 'block'
                cpTianguis.value = cpSuggestions[i].name
                cpToFind = cpSuggestions[i].id_product
                await findMarketsByCP('tianguis')
                document.getElementById('loader').style.display = 'none'
                tianguis.focus()
                tianguisSuggestionsContainer.innerHTML = ''
            })
            tianguisSuggestionsContainer.appendChild( option )
        }
    }
}