let id_user
let id_roll
let name = document.getElementById('product')
let price_pz = document.getElementById('prePz')
let price_kg = document.getElementById('prePs')
let edited_name = document.getElementById('productName')
let edited_pz = document.getElementById('productPz')
let edited_kg = document.getElementById('productKg')
let id_type_category = document.getElementById('productCategory')
let categories
let userData
let currentProduct
document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('loader').style.display = 'block'
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
    userData = userCredentials
    console.log(userData)
    if (userData.success) {
        document.getElementById('register').style.display = 'none'
        document.getElementById('user-name').innerHTML = userData.data_user.name_user
    } else if (userData.success === undefined) {
        location.replace('index.html')
    }
    await getProducts()
    await getCategories()
    document.getElementById('loader').style.display = 'none'

});
const renderOptions = () => {
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = categories[i].name
        option.value = categories[i].id_product
        id_type_category.appendChild(option)
    }
}
const getCategories = async () => {
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-category-product/${userData.data_user.type_market}`
    const request = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${userData.token}`
        }
    })
    const response = await request.json()
    if (response.success) {
        categories = response.row
        renderOptions()
    }
}
async function activateProduct() {
    document.getElementById('loader').style.display = 'block'
    const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/disabled-product/'
    const data = {
        id_product: currentProduct.id_product,
        id_user: userData.data_user.id_user,
        active: 1
    }
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + userData.token
        },
        body: JSON.stringify(data)
    })
    const response = await request.json()
    console.log(response)
    if (response.success) {
        document.getElementById('loader').style.display = 'none'
        location.reload()
    } else {
        document.getElementById('loader').style.display = 'none'
        swal({
            title: "Upss",
            text: "A ocurrido un error",
            icon: "error",
            button: "Aceptar",
        })
    }
}
async function desactivateProduct() {
    document.getElementById('loader').style.display = 'block'
    const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/disabled-product/'
    const data = {
        id_product: currentProduct.id_product,
        id_user: userData.data_user.id_user,
        active: 0
    }
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + userData.token
        },
        body: JSON.stringify(data)
    })
    const response = await request.json()
    console.log(response)
    if (response.success) {
        document.getElementById('loader').style.display = 'none'
        location.reload()
    } else {
        document.getElementById('loader').style.display = 'none'
        swal({
            title: "Upss",
            text: "A ocurrido un error",
            icon: "error",
            button: "Aceptar",
        })
    }
}
async function updateProduct() {
    document.getElementById('loader').style.display = 'block'
    const data = {
        id_product: currentProduct.id_product,
        id_user: userData.data_user.id_user,
        name: edited_name.value,
        price_pz: parseFloat(edited_pz.value),
        price_kg: parseFloat(edited_kg.value)
    }
    const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/update-product/'
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + userData.token
        },
        body: JSON.stringify(data)

    })
    const response = await request.json()
    if (response.success) {
        document.getElementById('loader').style.display = 'none'
        swal({
            title: "Hecho",
            text: "Producto actualizado",
            icon: "success",
            button: "Aceptar",
        })
            .then(() => {
                location.reload()
            })
    } else {
        document.getElementById('loader').style.display = 'none'
        swal({
            title: "Upss",
            text: "A ocurrido un error",
            icon: "error",
            button: "Aceptar",
        })
    }
}
function setData(product) {
    edited_name.value = product.name
    edited_pz.value = product.price_pz
    edited_kg.value = product.price_kg
}
function checkData() {
    if (name.value !== '' && price_pz.value !== '' && price_kg.value !== '') {
        document.getElementById('saveProduct').removeAttribute('disabled')
    } else {
        document.getElementById('saveProduct').setAttribute('disabled', true)
    }
}
async function getProducts() {
    let url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-products/${userData.data_user.id_user}/${userData.data_user.id_market}`
    const request = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + userData.token
        }
    })
    const response = await request.json()
    if (response.success) {
        document.getElementById('product-table').style.display = 'block'
        document.getElementById('no-products').style.display = 'none'
        for (let i = 0; i < response.row.length; i++) {
            let tr = document.createElement('tr')
            let th = document.createElement('th')
            let td1 = document.createElement('td')
            td1.innerHTML = response.row[i].price_pz
            let td2 = document.createElement('td')
            td2.innerHTML = response.row[i].price_kg
            let td3 = document.createElement('td')
            td3.className = 'text-right'
            th.className = 'h4 titulo'
            th.innerHTML = response.row[i].name
            th.scope = 'row'
            tr.append(th)
            tr.append(td1)
            tr.append(td2)
            tr.append(td3)
            if (response.row[i].active === 1) {
                let button1 = document.createElement('button')
                button1.type = 'button'
                button1.className = 'btn btn-sm btn-warning'
                button1.setAttribute("data-toggle", "modal")
                button1.setAttribute("data-target", "#editPdt1")
                let button2 = document.createElement('button')
                button2.className = 'btn btn-sm btn-secondary'
                button2.type = 'button'
                button2.innerHTML = 'SUSPENDER'
                let i1 = document.createElement('i')
                i1.className = 'fas fa-edit'
                button1.appendChild(i1)
                button1.append('EDITAR')
                button1.onclick = function () {
                    setData(response.row[i])
                    currentProduct = response.row[i]
                }
                button2.onclick = function () {
                    currentProduct = response.row[i]
                    desactivateProduct()
                }
                button1.style = "margin-right:10px;"
                td3.appendChild(button1)
                td3.appendChild(button2)
            } else {
                let button1 = document.createElement('button')
                button1.type = 'button'
                button1.className = 'btn btn-sm btn-warning'
                button1.setAttribute("data-toggle", "modal")
                button1.setAttribute("data-target", "#editPdt1")
                tr.className = 'alert-secondary text-black-50'
                let button3 = document.createElement('button')
                button3.className = 'btn btn-sm btn-success'
                button3.type = 'button'
                let i1 = document.createElement('i')
                i1.className = 'fas fa-edit'
                button1.appendChild(i1)
                button1.onclick = function () {
                    setData(response.row[i])
                    currentProduct = response.row[i]
                }
                button1.append('EDITAR')
                button3.style = "margin-left: 10px;"
                let i2 = document.createElement('i')
                i2.className = 'fas fa-check'
                button3.appendChild(i2)
                button3.append('ACTIVAR')
                button3.onclick = function () {
                    currentProduct = response.row[i]
                    activateProduct()
                }
                td3.appendChild(button1)
                td3.appendChild(button3)
            }

            document.getElementById('table-body').append(tr)
        }
        $(".dataTable").DataTable({
            language: {
                "search": "Buscar",
                "lengthMenu": "",
                "info": "",
            }
        });
    } else if (response.msg === "No se encontraron datos") {
        console.log('No se encontraron datos')
    } else {
        localStorage.setItem('userCredentials', JSON.stringify({}))
        location.replace('index.html')
    }
    console.log(response)
}
async function addProduct() {
    document.getElementById('loader').style.display = 'block'
    if (id_type_category.value === 'Selecciona una categoría...') {
        document.getElementById('loader').style.display = 'none'
        swal({
            title: "Upss",
            text: "Por favor selecciona una categoría",
            icon: "info",
            button: "Aceptar",
        })
    } else {
        const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/add-products/'
        const priceKg = parseFloat(price_kg.value)
        const pricePz = parseFloat(price_pz.value)
        const idCategory = parseInt( id_type_category.value )
        const data = {
            name: name.value,
            price_kg: priceKg,
            price_pz: pricePz,
            id_user: userData.data_user.id_user,
            id_roll: userData.data_user.id_rol,
            id_type_category: idCategory,
            id_market: userData.data_user.id_market
        }
        console.log( data )
        const request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + userData.token
            }
        })
        const response = await request.json()
        if (response.success) {
            document.getElementById('loader').style.display = 'none'
            swal({
                title: "Hecho",
                text: "Producto añadido",
                icon: "success",
                button: "Aceptar",
            })
                .then(() => {
                    location.reload()
                })
        } else {
            document.getElementById('loader').style.display = 'none'
            swal({
                title: "Upss",
                text: "A ocurrido un error",
                icon: "error",
                button: "Aceptar",
            })
        }
    }
}
document.getElementById('product').addEventListener('keypress', checkData)
document.getElementById('prePz').addEventListener('keypress', checkData)
document.getElementById('prePs').addEventListener('keypress', checkData)