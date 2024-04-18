export class Comentario {
    comentario: string;
    nombre_Completo: string;
    carrera_facultad: string;

    constructor(comentario: string, nombre_Completo: string, carrera_facultad: string) {
        this.comentario = comentario;
        this.nombre_Completo = nombre_Completo;
        this.carrera_facultad = carrera_facultad;
    }
}
