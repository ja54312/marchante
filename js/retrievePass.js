let newPass=document.getElementById('inputPassword1')
let confirmNewPass=document.getElementById('inputPassword2')
let buttonNewPass=document.getElementById('submitforgotPass')
let mail=document.getElementById('mail')

document.addEventListener('DOMContentLoaded', async () => {
    await validateCode()
})
function checkNewPass(){
    if(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(newPass.value) && newPass.value===confirmNewPass.value){
        buttonNewPass.removeAttribute('disabled')
    }else{
        buttonNewPass.setAttribute('disabled',true)
    }
}
function checkPass(){
    if(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(newPass.value)){
        return false
    }else{
        swal({
            title: "Upss",
            text: 'La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 número, caracter especial',
            icon: "info",
            button: "Aceptar",
        })
    }
}
async function sendNewPass(){
    document.getElementById('loader').style.display='block'
    const url='https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/change-pass/'
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const mail= urlParams.get('mail')
    console.log(code)
    console.log(mail)
    const data={
        mail:mail,
        pass:newPass.value,
        confirm_pass:confirmNewPass.value,
        code_update:code
    }
    const request= await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    })
    const response= await request.json()
    console.log(response)
    if(response.success){
        document.getElementById('loader').style.display='none'
        swal({
            title: "Hecho",
            text: "Contraseña actualizado",
            icon: "success",
            button: "Aceptar",
          })
          .then(()=>{
            location.replace('index.html')
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

const validateCode = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const url = `https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/verify-code-pass/${code}`
    const request = await fetch(url)
    const response = await request.json()
    console.log(response)
    if ( response.success ) {
        return
    } else {
        window.location.replace('index.html')
    }
}
document.getElementById('inputPassword1').addEventListener('keyup',checkNewPass)
document.getElementById('inputPassword2').addEventListener('keyup',checkNewPass)
