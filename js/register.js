let customer=document.getElementById('tipoCliente')
let type_market=document.getElementById('mercadoTianguis')
let zone=document.getElementById('zonaRegistro')
let market=document.getElementById('mercado')
let local=document.getElementById('local')
let name=document.getElementById('name')
let mail=document.getElementById('email')
let pass=document.getElementById('password')
let mailLogin=document.getElementById('loginEmail')
let passLogin=document.getElementById('loginPassword')
let customerValue
document.addEventListener('DOMContentLoaded',async function () {
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    if(userCredentials.success && userCredentials.data_user.id_rol===1 || userCredentials.success){
        document.getElementById('registroLogin').style.display='none'
        document.getElementById('mercadoPostalCode').style.display='block'
        document.getElementById('tianguisPostalCode').style.display='block'
        document.getElementById('panelLocatario').style.display='block'
    }else if(userCredentials.success===undefined){
        document.getElementById('registroLogin').style.display='block'
        document.getElementById('mercadoPostalCode').style.display='none'
        document.getElementById('tianguisPostalCode').style.display='none'
    }
    console.log(userCredentials)
});
function checkData(){
    console.log(market.value)
    isCustomer()
    if( name.value!=='' && mail.value!=='' && pass.value!=='' && /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(pass.value)){
        document.getElementById('submit').removeAttribute('disabled')
    }else{
        document.getElementById('submit').setAttribute('disabled')
    }
}

function checkDataLogin(){
    if( mailLogin.value!=='' && passLogin.value!=='' ){
        document.getElementById('submitLogin').removeAttribute('disabled')
    }else{
        document.getElementById('submitLogin').setAttribute('disabled')
    }
}
function isCustomer(){
    if(customer.value==='Cliente'){
        customerValue=2
    }else{
        customerValue=1
    }
}
let userData={
    customer:0,
    type_market:'',
    zone:'',
    market:'',
    local:'',
    name:'',
    mail:'',
    pass:''
}
async function login(register){
    const url='https://cors-anywhere.herokuapp.com/https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/login/'
    
    if(register){
        console.log('Hola')
        const request=await fetch(url,{
            method:'POST',
            header:{'Authorization':'Basic '+ btoa(mail.value + ':' + pass.value)},
            headers:{
                'Authorization':'Basic '+ btoa(mail.value + ':' + pass.value),
                'Content-Type': 'application/json'
            }
        })
        const response= await request.json()
        if(response.success){
            localStorage.setItem('userCredentials', JSON.stringify(response))
            document.getElementById('registroLogin').style.display='none'
            document.getElementById('buttonRegister').style.display='none'
            document.getElementById('buttonLogin').style.display='none'
            document.getElementById('mercadoPostalCode').style.display='block'
            document.getElementById('tianguisPostalCode').style.display='block'
            if(response.data_user.id_rol===1){
                document.getElementById('panelLocatario').style.display='block'
            }
        }
        console.log(response)
    }else{
        const request=await fetch(url,{
            method:'POST',
            header:{'Authorization':'Basic '+ btoa(mailLogin.value + ':' + passLogin.value)},
            headers:{
                'Authorization':'Basic '+ btoa(mailLogin.value + ':' + passLogin.value),
                'Content-Type': 'application/json'
            }
        })
        const response= await request.json()
        if(response.success){
            localStorage.setItem('userCredentials', JSON.stringify(response))
            document.getElementById('registroLogin').style.display='none'
            document.getElementById('buttonRegister').style.display='none'
            document.getElementById('buttonLogin').style.display='none'
            document.getElementById('mercadoPostalCode').style.display='block'
            document.getElementById('tianguisPostalCode').style.display='block'
            if(response.data_user.id_rol===1){
                document.getElementById('panelLocatario').style.display='block'
            }
        }
        console.log(response)
    }
}
async function register(){
    const url='https://cors-anywhere.herokuapp.com/https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/register/'
    userData={
        customer:customerValue.toString(),
        type_market:type_market.value,
        zone:zone.value,
        market:market.value,
        local:local.value,
        name:name.value,
        mail:mail.value,
        pass:pass.value
    }
    const request= await fetch(url,{
        method:'POST',
        body:JSON.stringify(userData)
    })
    const response= await request.json()
    if(response.success){
        login(true)
    }
    console.log(response)
}
function redirect(){
    window.location.href('panel_locatario.html')
}