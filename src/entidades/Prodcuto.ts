export class Producto {
    Codigo: number;
    Nombre: string;
    Precio: number;
    Stock: number;
    Categoria: string;
    Img?: string;  // Propiedad  para la imagen

    constructor(cod: number, nom: string, pre: number, sto: number, cat: string, img?: string) {
        this.Codigo = cod;
        this.Nombre = nom;
        this.Precio = pre;
        this.Stock = sto;
        this.Categoria = cat;
        this.Img = img;
    }
}
