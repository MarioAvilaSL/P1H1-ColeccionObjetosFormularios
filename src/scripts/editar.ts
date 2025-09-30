import '../style.css'

import { ListaProductos } from "../controlador/TLista";

// Recuperar el producto que se está editando
const productoEditandoStr = localStorage.getItem("productoEditando");
let button = document.getElementById("btn") as HTMLButtonElement;
let buttonCancel = document.getElementById("btn-cancel") as HTMLButtonElement;

buttonCancel.addEventListener("click", (e) => {
    window.location.href = "listar.html";
});

if (!productoEditandoStr) {
    alert("No hay ningún producto seleccionado para editar.");
    window.location.href = "listar.html"; // Redirige si no hay producto
} else {
    const productoEditando = JSON.parse(productoEditandoStr);
    
    // Prellenar el formulario con los datos del producto
    (document.getElementById("codigo") as HTMLInputElement).value = productoEditando.Codigo.toString();
    (document.getElementById("nombre") as HTMLInputElement).value = productoEditando.Nombre;
    (document.getElementById("precio") as HTMLInputElement).value = productoEditando.Precio.toString();
    (document.getElementById("stock") as HTMLInputElement).value = productoEditando.Stock.toString();
    (document.getElementById("categoria") as HTMLInputElement).value = productoEditando.Categoria;
}

button.addEventListener("click", (event) => {
    event.preventDefault();
    const codigo = Number((document.getElementById("codigo") as HTMLInputElement).value);
    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const precio = Number((document.getElementById("precio") as HTMLInputElement).value);
    const stock = Number((document.getElementById("stock") as HTMLInputElement).value);
    const categoria = (document.getElementById("categoria") as HTMLInputElement).value;
    const imagenInput = document.getElementById("imagen") as HTMLInputElement;

    const index = ListaProductos.findIndex(p => p.Codigo === codigo);
    if (index !== -1) {
        const producto = ListaProductos[index];
        producto.Nombre = nombre;
        producto.Precio = precio;
        producto.Stock = stock;
        producto.Categoria = categoria;

        if (imagenInput.files && imagenInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                producto.Img = e.target?.result as string;
                localStorage.setItem("ListaProductos", JSON.stringify(ListaProductos)); // Actualiza almacenamiento
            };
            reader.readAsDataURL(imagenInput.files[0]);
        } else {
            localStorage.setItem("ListaProductos", JSON.stringify(ListaProductos)); // Actualiza almacenamiento
        }

        alert("Producto editado correctamente.");
        localStorage.removeItem("productoEditando"); // Limpia el almacenamiento local
        window.location.href = "listar.html";
    } else {
        alert("Error al guardar los cambios: producto no encontrado.");
    }
});
