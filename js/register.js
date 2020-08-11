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
let check=document.getElementById('check')
let mail_forgot_pass=document.getElementById('forgotPassEmail')
let customerValue='Cliente'
document.addEventListener('DOMContentLoaded',async function () {
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    const emailUser=JSON.parse(localStorage.getItem('userMail'))
    mailLogin.value=emailUser
    console.log(emailUser)
    if(customerValue='Cliente'){
        document.getElementById('disapearCustommer').style.display='block'
    }
    if(userCredentials.success && userCredentials.data_user.id_rol===1 || userCredentials.success){
        document.getElementById('registroLogin').style.display='none'
        document.getElementById('buttonRegister').style.display='none'
        document.getElementById('buttonLogin').style.display='none'
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
function checkType(){
    isCustomer()
    if(customerValue===2){
        document.getElementById('disapearCustommer').style.display='none'
    }else{
        document.getElementById('disapearCustommer').style.display='block'
    }
}
function checkPass(){
    if(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(pass.value)===false){
        swal({
            title: "Contraseña inválida",
            text: "Al menos 1 mayúscula, minúscula, número y carácter especial",
            icon: "error",
            button: "Aceptar",
        })
    }
    checkData()
}
function checkData(){
    console.log(market.value)
    isCustomer()
    if( name.value!=='' && mail.value!=='' && pass.value!=='' && /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(pass.value)){
        document.getElementById('submit').removeAttribute('disabled')
    }
    else{
        document.getElementById('submit').setAttribute('disabled', true)
    }
}
function checkDataLogin(){
    if( mailLogin.value!=='' && passLogin.value!=='' ){
        document.getElementById('submitLogin').removeAttribute('disabled')
    }else{
        document.getElementById('submitLogin').setAttribute('disabled', true)
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
    const url='https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/login/'
    
    if(register){
        const check=document.getElementById('check')
        if(check.value){
            localStorage.setItem('userMail',JSON.stringify(mail.value))
        }
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
            document.getElementById('loader').style.display='none'
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
        document.getElementById('loader').style.display='block'
        const checkLogin=document.getElementById('checkLogin')
        if(checkLogin.value){
            localStorage.setItem('userMail',JSON.stringify(mailLogin.value))
        }
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
            document.getElementById('loader').style.display='none'
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
    document.getElementById('loader').style.display='block'
    const url='https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/register/'

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
    }else if(response.msg===`El usuario ${mail.value} ya ha sido registrado.`){
        document.getElementById('loader').style.display='none'
        swal({
            title: "Upss",
            text: "El usuario ya ha sido registrado",
            icon: "info",
            button: "Aceptar",
        })
    }
    console.log(response)
}
function disableButton(){
    if(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(pass.value)){
        checkData()
    }else{
        document.getElementById('submit').setAttribute('disabled', true)
    }
}
function redirect(){
    window.location.href('panel_locatario.html')
}
function checkDataForgot(){
    if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(mail_forgot_pass.value)){
        document.getElementById('forgotPassButton').removeAttribute('disabled')
    }else{
        document.getElementById('forgotPassButton').setAttribute('disabled',true)
    }
}
async function sendForgotPass(){
    document.getElementById('loader').style.display='block'
    const url='https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/forgot-password/'
    const data={
        mail:mail_forgot_pass.value
    }
    const request=await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    })
    const response=await request.json()
    console.log(response)
    if(response.success){
        document.getElementById('loader').style.display='none'
        swal({
            title: "Listo",
            text: 'Mensaje enviado. Por favor revisa tu correo.',
            icon: "success",
            button: "Aceptar",
        })
    }else{
        swal({
            title: "Upss",
            text: response.msg,
            icon: "error",
            button: "Aceptar",
        })
    }
}
document.getElementById('password').addEventListener('keyup',checkData)
document.getElementById('email').addEventListener('keyup',checkData)
document.getElementById('name').addEventListener('keyup',checkData)
document.getElementById('loginEmail').addEventListener('keyup',checkDataLogin)
document.getElementById('loginPassword').addEventListener('keyup',checkDataLogin)
document.getElementById('forgotPassEmail').addEventListener('keyup',checkDataForgot)