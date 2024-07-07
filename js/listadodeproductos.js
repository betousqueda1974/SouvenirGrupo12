let BASE_URL = 'http://127.0.0.1:5000';

let productos = document.querySelector("#Producto");
let productosCopia = productos.cloneNode(true);

let contenedor = document.querySelector(".grid-item");

productos.remove();

function editProd(event) {
  let id = event.currentTarget.product_id;
  window.location.replace("editarprod2.html?product_id=" + id);
}

let URL_all_product = BASE_URL + '/api/products/list';

fetchDataProd(URL_all_product, "GET", (data) => {
  // Procesamiento de la info que llega de la API
  let products = [];
  for (const product of data) {

    //Hago una copia de la copia
    let nuevoProducto = productosCopia.cloneNode(true);
    nuevoProducto.querySelector("#Nombre").innerHTML = product.nombre;
    nuevoProducto.querySelector("#Desc").innerHTML = product.descripcion;
    nuevoProducto.querySelector("#Tipo").innerHTML = product.tipo;
    nuevoProducto.querySelector("#Precio").innerHTML = product.precio;
    nuevoProducto.querySelector("#Cantidad").innerHTML = product.cantidad;
    nuevoProducto.querySelector("#Product_id").value = product.id;

    let editarProducto = nuevoProducto.querySelector("#Editar");
  
    editarProducto.addEventListener("click", editProd);
    editarProducto.product_id = product.id;

    contenedor.appendChild(nuevoProducto);
   }
  })