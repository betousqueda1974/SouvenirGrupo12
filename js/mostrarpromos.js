let personajes = document.querySelector("#Personaje");
let personajeCopia = personajes.cloneNode(true);

let contenedor = document.querySelector("#Caja");

personajes.remove();

fetch("https://dragonball-api.com/api/characters/")
  .then(response => response.json())
  .then(data => {
      // Procesamiento de la info que llega de la API
      console.log(data);
  
      for(i = 0; i < 8; i++){
        console.log(data.items[i].name);
        console.log(data.items[i].image);

        //Hago una copia de la copia
        let nuevoPersonaje = personajeCopia.cloneNode(true);

        nuevoPersonaje.querySelector("#Foto").src = data.items[i].image;
        nuevoPersonaje.querySelector("#Foto").alt = "foto DragonBall";
        nuevoPersonaje.querySelector("#Nombre").innerHTML = data.items[i].name;
        contenedor.appendChild(nuevoPersonaje);
      }
     })
