export class Publicacion {
    id_Publicacion: number;
    codigo: string;
    descripcion: string;
    categoria: string;
    imagen: string;
    anonimo: boolean;
    lista_Comentarios: string[];
    no_Likes: number;
    no_Comentarios: number;
    fecha_Hora: Date;
    suma_Likes_Comentarios: number;

    constructor(
        id_Publicacion: number,
        codigo: string,
        descripcion: string,
        categoria: string,
        imagen: string,
        anonimo: boolean,
        lista_Comentarios: string[],
        no_Likes: number,
        no_Comentarios: number,
        fecha_Hora: Date,
        suma_Likes_Comentarios: number
    ) {
        this.id_Publicacion = id_Publicacion;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
        this.anonimo = anonimo;
        this.lista_Comentarios = lista_Comentarios;
        this.no_Likes = no_Likes;
        this.no_Comentarios = no_Comentarios;
        this.fecha_Hora = fecha_Hora;
        this.suma_Likes_Comentarios = suma_Likes_Comentarios;
    }
}
