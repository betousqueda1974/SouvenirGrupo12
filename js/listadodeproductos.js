let BASE_URL = 'http://127.0.0.1:5000';

let productos = document.querySelector("#Producto");
let productosCopia = productos.cloneNode(true);

let contenedor = document.querySelector(".grid-item");

productos.remove();

function editProd(event) {
  let id = event.currentTarget.product_id;
  window.location.replace("editarprod2.html?product_id=" + id);
}

function deshabProd(event) {
  let id = event.currentTarget.product_id;

  let url = BASE_URL + '/api/products/disable/' + id;

  fetchDataProd(url, "DELETE", () => {
      location.reload();
  });
}

let URL_all_product = BASE_URL + '/api/products/list';

fetchDataProd(URL_all_product, "GET", (data) => {
  // Procesamiento de la info que llega de la API
  let contador = 0;
  let products = [];
  for (const product of data) {

    //Hago una copia de la copia
    let nuevoProducto = productosCopia.cloneNode(true);

    //Se usa para traer unas cuantas imágenes predefinidas
    contador++;
    if (contador == 7){
      contador = 1;
    } 
    nuevoProducto.querySelector("#Foto").src = "../src/img/producto"+contador+".jpg";
    nuevoProducto.querySelector("#Foto").alt = "Foto Souvenir";

    nuevoProducto.querySelector("#Nombre").innerHTML = product.nombre;
    nuevoProducto.querySelector("#Desc").innerHTML = product.descripcion;
    nuevoProducto.querySelector("#Tipo").innerHTML = product.tipo;
    nuevoProducto.querySelector("#Precio").innerHTML = product.precio;
    nuevoProducto.querySelector("#Cantidad").innerHTML = product.cantidad;
    nuevoProducto.querySelector("#Product_id").value = product.id;

    let deshabilitarProducto = nuevoProducto.querySelector("#Disable")
    let editarProducto = nuevoProducto.querySelector("#Editar");
  
    if (editarProducto) {
      editarProducto.addEventListener("click", editProd);
      editarProducto.product_id = product.id;
    }

    if (deshabilitarProducto) {
      deshabilitarProducto.addEventListener("click", deshabProd);
      deshabilitarProducto.product_id = product.id;
    }

    contenedor.appendChild(nuevoProducto);
   }
  })