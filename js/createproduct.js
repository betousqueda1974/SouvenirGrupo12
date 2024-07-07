let BASE_URL = 'http://localhost:5000';

let submitButton = document.querySelector("#Aceptar");

let params = new URLSearchParams(document.location.search);
let prod_id = params.get("product_id");

function new_prod(event) {
  submitButton.addEventListener("click", new_prod);
  let data = {
    'nombre': document.querySelector("#FormCreate #nombreproducto").value,
    'descripcion': document.querySelector("#FormCreate #descrip").value,
    'tipo': 'Llavero',
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