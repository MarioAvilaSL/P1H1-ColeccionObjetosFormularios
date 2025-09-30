import '../style.css'

import { Insertar } from "../controlador/TLista";

let buttonCancel = document.getElementById("btn-cancel") as HTMLButtonElement;
let button = document.getElementById("btn") as HTMLButtonElement;

// Botón cancelar vuelve a la lista
buttonCancel.addEventListener("click", (e) => {
    window.location.href = "listar.html";
});

// Botón guardar inserta el producto
button.addEventListener("click", (e) => {
    e.preventDefault();
    Insertar();
    alert("Producto insertado correctamente.");
    window.location.href = "listar.html"
});
