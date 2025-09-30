import '../style.css'
import { ListaProductos, Listar, Editar, Eliminar } from "../controlador/TLista";

let buttonAdd = document.getElementById("btn-add") as HTMLButtonElement;
let buttonVolver = document.getElementById("btn-volver") as HTMLButtonElement;
const tabla = document.getElementById("tabla-P") as HTMLTableElement;

buttonAdd.addEventListener("click", () => {
    window.location.href = "insertar.html";
})

buttonVolver.addEventListener("click", () => {
    window.location.href = "/index.html";
})

Listar();

// Delegación de eventos para editar
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains("editar")) {
        const fila = target.closest("tr")!;
        const codigo = Number(fila.children[0].textContent);
        Editar(codigo);
    } else if (target.classList.contains("eliminar")) {
        const fila = target.closest("tr")!;
        const codigo = Number(fila.children[0].textContent);
        Eliminar(codigo);
    }
});
