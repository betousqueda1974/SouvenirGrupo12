let BASE_URL = 'http://localhost:5000';

let submitButton = document.querySelector("#Aceptar");

let params = new URLSearchParams(document.location.search);
let prod_id = params.get("product_id");

function update_prod(event) {
  
  let eleupd = document.getElementsByName('opciones');
  for (i = 0; i < eleupd.length; i++) {
    if (document.querySelector("#" + eleupd[i].id).checked == true){
      let valortipo = eleupd[i].value;
      console.log(valortipo);
      console.log(document.querySelector("#FormEdit #descrip").value)
    }
    /*
    if (eleupd[i].value == data.tipo){
      document.querySelector("#" + eleupd[i].id).checked = true;
    }
    */
  }

  let data = {
    'nombre': document.querySelector("#FormEdit #nombreproducto").value,
    'descripcion': document.querySelector("#FormEdit #descrip").value,
    'tipo': 'Vela',
    'precio': document.querySelector("#FormEdit #precio").value,
    'cantidad': document.querySelector("#FormEdit #stock").value
  }

  let url = BASE_URL + '/api/products/update/' + prod_id;

  fetchDataProd(url, "PUT", () => {
    document.querySelector("#FormEdit").reset();
    window.location.replace("listadodeproductos.html");
  }, 
  data);
}

function set_form_readOnly(value) {
  let form = document.querySelector("#FormEdit");
  var elements = form.elements;
  for (input of elements) { 
      input.readOnly = value;
  }
}

function update(){
  set_form_readOnly(true);

  let url = BASE_URL + '/api/products/fetch/' + prod_id;
  fetchDataProd(url, "GET", (data) => {
    document.querySelector("#nombreproducto").value = data.nombre;
    document.querySelector("#descrip").value = data.descripcion;
    document.querySelector("#precio").value = data.precio;
    document.querySelector("#stock").value = data.cantidad;

    let ele = document.getElementsByName('opciones');
    for (i = 0; i < ele.length; i++) {
      if (ele[i].value == data.tipo){
        document.querySelector("#" + ele[i].id).checked = true;
      }
    }
    set_form_readOnly(false);
  });

  submitButton.addEventListener("click", update_prod);
}
update();