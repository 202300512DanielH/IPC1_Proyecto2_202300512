export class User {
    codigo: number;
    nombres: string;
    apellidos: string;
    genero: string;
    facultad: string;
    carrera: string;
    correo: string;
    password: string;
    rol: string;
    cant_Publicaciones: number;

    constructor(
        codigo: number,
        nombres: string,
        apellidos: string,
        genero: string,
        facultad: string,
        carrera: string,
        correo: string,
        password: string,
        rol: string,
        cant_Publicaciones:number 

    ) {
        this.codigo = codigo;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.genero = genero;
        this.facultad = facultad;
        this.carrera = carrera;
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.cant_Publicaciones = cant_Publicaciones; // Inicializamos la cantidad de publicaciones en 0
    }
}
