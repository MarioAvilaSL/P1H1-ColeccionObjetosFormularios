import { Producto } from "../entidades/Prodcuto";
export { ListaProductos }

let ListaProductos: Producto[] = [];

const productosGuardados = localStorage.getItem("ListaProductos");
if (productosGuardados) {
    ListaProductos = JSON.parse(productosGuardados);
} else {
    ListaProductos = [
        { Codigo: 1, Nombre: "Laptop", Precio: 800, Stock: 10, Categoria: "Electrónica", Img: "/laptop.png" },
        { Codigo: 2, Nombre: "Camiseta", Precio: 20, Stock: 50, Categoria: "Ropa", Img: "/camiseta.png" },
        { Codigo: 3, Nombre: "Café", Precio: 5, Stock: 100, Categoria: "Alimentos", Img: "/cafe.jpg" }
    ];
    localStorage.setItem("ListaProductos", JSON.stringify(ListaProductos));
}

// Función para insertar productos
export function Insertar() {
    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value);
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value;
    let pre = Number((<HTMLInputElement>document.getElementById("precio")).value);
    let sto = Number((<HTMLInputElement>document.getElementById("stock")).value);
    let cat = (<HTMLInputElement>document.getElementById("categoria")).value;
    let imagenInput = <HTMLInputElement>document.getElementById("imagen");
    let imgUrl: string | undefined;

    const agregarProducto = () => {
        const prod = new Producto(cod, nom, pre, sto, cat, imgUrl);
        ListaProductos.push(prod);
        localStorage.setItem("ListaProductos", JSON.stringify(ListaProductos));
        Listar(); // Actualiza la tabla inmediatamente
    };

    if (imagenInput.files && imagenInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgUrl = e.target?.result as string;
            agregarProducto();
        };
        reader.readAsDataURL(imagenInput.files[0]);
    } else {
        agregarProducto();
    }
}

// Función editar producto
export function Editar(codigo: number) {
    const producto = ListaProductos.find(p => p.Codigo === codigo);
    if (!producto) {
        console.error("Producto no encontrado.");
        return;
    }
    localStorage.setItem("productoEditando", JSON.stringify(producto));
    window.location.href = "editar.html"; 
}

// Función eliminar producto
export function Eliminar(codigo: number) {
    const index = ListaProductos.findIndex(op => op.Codigo === codigo);
    if (index >= 0) {
        ListaProductos.splice(index, 1);
        localStorage.setItem("ListaProductos", JSON.stringify(ListaProductos))
    }
    Listar();
}

// Función listar productos
export function Listar() {
    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-h");
    for (let i = 0; i < ListaProductos.length; i++) {
        const imgHtml = ListaProductos[i].Img 
            ? `<img src="${ListaProductos[i].Img}" alt="Imagen de ${ListaProductos[i].Nombre}" class="img-producto">` 
            : "";
        lis += "<tr>" +
            `<td>${ListaProductos[i].Codigo}</td>` +
            `<td>${ListaProductos[i].Nombre}</td>` +
            `<td>${ListaProductos[i].Precio}</td>` +
            `<td>${ListaProductos[i].Stock}</td>` +
            `<td>${ListaProductos[i].Categoria}</td>` +
            `<td>${imgHtml}</td>` +
            `<td><button class="editar">Editar</button> <button class="eliminar">Eliminar</button></td>` +
            "</tr>";
    }
    lista.innerHTML = lis;
}
