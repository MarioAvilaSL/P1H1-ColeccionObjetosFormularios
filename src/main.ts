import './style.css'

import { ListaProductos } from "./controlador/TLista";
import { Listar, Insertar, Editar, Eliminar } from "./controlador/TLista"

let productoEditando: any | null = null;

Listar();
console.log(ListaProductos);

// Declaración de variables
const tabla = document.getElementById("tabla-P")! as HTMLTableElement;
const modal = document.getElementById("container-form")! as HTMLDivElement;
let button = document.getElementById("btn")! as HTMLButtonElement;
let buttonCancel = document.getElementById("btn-cancel")! as HTMLButtonElement;
let buttonAdd = document.getElementById("btn-add")! as HTMLButtonElement;
let primerValor = 0;
let opcion = '';

// Eventos de botones
button.addEventListener("click", save);
buttonAdd.addEventListener("click", openModal);

buttonCancel.addEventListener("click", () => {
  modal.classList.remove('active'); // Oculta el modal
  limpiar(); // Limpia los campos
  primerValor = 0;
  opcion = "";
  console.log("Modal cancelado");
});

// Función abrir modal
function openModal() {
    modal.classList.add('active');
    console.log("Abrir modal");
    modal.onclick = (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (target.className.indexOf("container-form") !== -1) {
            modal.classList.remove("active");
            primerValor = 0;
            limpiar();
            opcion = "";
        }
    };
}

// Función limpiar campos
function limpiar() {
    (<HTMLInputElement>document.getElementById("codigo")!).value = '';
    (<HTMLInputElement>document.getElementById("nombre")!).value = '';
    (<HTMLInputElement>document.getElementById("precio")!).value = '';
    (<HTMLInputElement>document.getElementById("stock")!).value = '';
    (<HTMLInputElement>document.getElementById("categoria")!).value = '';
    (<HTMLInputElement>document.getElementById("imagen")!).value = '';
}

// Se llama a la función Insertar o Editar
function save(e: Event): void {
    e.preventDefault();
    if (opcion == "editar") {
        Editar(primerValor); 
        primerValor = 0;
        limpiar();
        opcion = "";
    } else {
        Insertar();
        primerValor = 0;
        limpiar();
    }
    modal.classList.remove("active");
}

// Se obtiene el código para editar
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode!.parentNode!);
    if (target.classList.contains("editar")) {
        openModal();
        const fila = parent;
        primerValor = Number(fila.children[0].innerHTML);
        opcion = "editar";
        productoEditando = ListaProductos.find(prod => prod.Codigo === primerValor) || null;

        (<HTMLInputElement>document.getElementById("codigo")!).value = fila.children[0].innerHTML;
        (<HTMLInputElement>document.getElementById("nombre")!).value = fila.children[1].innerHTML;
        (<HTMLInputElement>document.getElementById("precio")!).value = fila.children[2].innerHTML;
        (<HTMLInputElement>document.getElementById("stock")!).value = fila.children[3].innerHTML;
        (<HTMLInputElement>document.getElementById("categoria")!).value = fila.children[4].innerHTML;

        const imgElement = fila.children[5].querySelector("img");
        (<HTMLInputElement>document.getElementById("imagen")!).value = imgElement ? imgElement.getAttribute("src")! : '';

        console.log("Editando", productoEditando);
    }
});

// Función Eliminar
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode!.parentNode!);
    if (target.classList.contains("eliminar")) {
        const fila = parent;
        primerValor = Number(fila.children[0].innerHTML);
        Eliminar(primerValor);
        console.log("Eliminado");
        primerValor = 0;
    }
});
