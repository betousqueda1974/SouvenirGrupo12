let BASE_URL = 'http://localhost:5000';

let productos = document.querySelector("#Producto");
let productosCopia = productos.cloneNode(true);

let contenedor = document.querySelector(".grid-item");

productos.remove();

let URL_all_product = BASE_URL + '/api/products/list'

fetchDataProd (URL_all_product, 'GET', (data) => {
  // Procesamiento de la info que llega de la API
  let products = [];
  for (const product of data) {

    //Hago una copia de la copia
    let nuevoProducto = productosCopia.cloneNode(true);
    nuevoProducto.querySelector("#Nombre").innerHTML = product.nombre;
    nuevoProducto.querySelector("#Desc").innerHTML = product.descripcion;
    nuevoProducto.querySelector("#Tipo").innerHTML = product.tipo;
    nuevoProducto.querySelector("Precio").innerHTML = product.precio;
    nuevoProducto.querySelector("Cantidad").innerHTML = product.cantidad;

    products.push(nuevoProducto);

    contenedor.replaceChildren(...products);
   }
  });
/*
    //let newTask = taskTemplates[fetch_data[task_status].TaskTemplatesName].cloneNode(true);
    newTask.querySelector("h3 .titulo").innerHTML = task.nombre;
    newTask.querySelector(".descripcion").innerHTML = task.descripcion;
    newTask.querySelector(".fecha").innerHTML = task.fecha_creacion;
    newTask.querySelector(".task_id").value = task.id;

    let archivarAction = newTask.querySelector("#Archivar");
    let editarAction =newTask.querySelector("#Editar");
    let completarAction =newTask.querySelector("#Completar");
    let pasarAPendienteAction =newTask.querySelector("#Pendiente");

    if (archivarAction) {
        archivarAction.addEventListener("click", archiveTask);
        archivarAction.task_id = task.id;
    }

    if (editarAction) {
        editarAction.addEventListener("click", editTask);
        editarAction.task_id = task.id;
    }

    if (completarAction) {
        completarAction.addEventListener("click", completeTask);
        completarAction.task_id = task.id;
    }

    if (pasarAPendienteAction) {
        pasarAPendienteAction.addEventListener("click", toPendingTask);
        pasarAPendienteAction.task_id = task.id;
    }

    tasks.push(newTask);
  }

  taskContainer.replaceChildren(...tasks);
});
*/