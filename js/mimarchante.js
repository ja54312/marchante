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
   // Validate Bootstrap
    'use strict';
    window.addEventListener('load', function() {
      const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
      if ( userCredentials.success) {
          document.getElementById('register').style.display = 'none'
          document.getElementById('user-name').innerHTML = userData.data_user.name_user
      } else {
        document.getElementById('logOut').style.display = 'none'
        document.getElementById('register').style.display = 'block'
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

  // Animación Movimiento
    new WOW().init();

