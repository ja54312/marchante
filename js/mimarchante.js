/*****************
    TAM OSORNIO
*****************/
        
$(document).ready(function() {

    //dataTable();

});


  // DataTable JS
    /*function dataTable(){

      $(".dataTable").DataTable({
      language: {
        "search": "Buscar", 
        "lengthMenu": "",
        "info": "",
      }
    });

    }*/

  // DatePicker JQ UI
    /*$('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true
    });*/

  function signOut() {
    localStorage.setItem('userCredentials', JSON.stringify({}))
    localStorage.setItem('cart', JSON.stringify({}))
    location.replace('index.html')
    document.getElementById('logOut').style.display = 'none'
  }
  const setNumberOfProducts = () => {
    const { cart } = JSON.parse( localStorage.getItem( 'cart' ) )
    if ( cart !== undefined ) {
      document.getElementById( 'cart-length' ).innerHTML = cart.length
    }
    //console.log( cart )
  }
   // Validate Bootstrap
    'use strict';
    window.addEventListener('load', async function() {
      const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
      if ( userCredentials !== null ) {
          document.getElementById('register').style.display = 'none'
          document.getElementById('user-name').innerHTML = userData.data_user.name_user
          await validateToken( userCredentials.token )
      } else {
        document.getElementById('logOut').style.display = 'none'
        document.getElementById('register').style.display = 'block'
        location.replace( 'index.html' )
      }
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
    const validateToken = async ( token ) => {
      const url = 'https://vyw6a2f0fj.execute-api.us-east-2.amazonaws.com/Prod/get-postal-code/tianguis'
      const request = await fetch( url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } )
      const response = await request.json()
      if( !response.success ) {
        if (response.msg === "No se encontraron datos") {
          console.log('No se encontraron datos')
        } else {
            localStorage.setItem('userCredentials', JSON.stringify({}))
            localStorage.setItem( 'cart', JSON.stringify({}) )
            location.replace('index.html')
        }
      }
    }
  // Animación Movimiento
    new WOW().init();

    setNumberOfProducts()