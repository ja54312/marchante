let userData
let currentProduct
document.addEventListener('DOMContentLoaded',async function () {
    const userCredentials=JSON.parse(localStorage.getItem('userCredentials'))
    userData=userCredentials
    if(userData.success){
        document.getElementById('register').style.display='none'
    }else if(userData.success===undefined){
        location.replace('index.html')
    }
});