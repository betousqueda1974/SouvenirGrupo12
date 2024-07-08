let BASE_URL = 'http://localhost:5000';

let submitButton = document.querySelector("#Aceptar");

let params = new URLSearchParams(document.location.search);
let prod_id = params.get("product_id");

let valortipo;

function new_prod(event) {
  let eleupd = document.getElementsByName('opciones');
  for (i = 0; i < eleupd.length; i++) {
    if (document.querySelector("#" + eleupd[i].id).checked == true){
      valortipo = eleupd[i].value;
    }
  }
  let data = {
    'nombre': document.querySelector("#FormCreate #nombreproducto").value,
    'descripcion': document.querySelector("#FormCreate #descrip").value,
    'tipo': valortipo,
    'precio': document.querySelector("#FormCreate #precio").value,
    'cantidad': document.querySelector("#FormCreate #stock").value
  }

  let url = BASE_URL + '/api/products/create';

  fetchDataProd(url, "POST", () => {
    document.querySelector("#FormCreate").reset();
    window.location.replace("listadodeproductos.html");
  }, 
  data);
}

function add(){
  submitButton.addEventListener("click", new_prod);
}

add();