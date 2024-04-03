'use strict'

class User {
    constructor(id_User, nombres, apellidos, genero, facultad, carrera, correo, password, rol) {
        this.id_User = id_User;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.genero = genero;
        this.facultad = facultad;
        this.carrera = carrera;
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.cant_Publicaciones = 0; // Inicializamos la cantidad de publicaciones en 0
    }

    // Métodos para acceder y modificar la cantidad de publicaciones
    getCantidadPublicaciones() {
        return this.cant_Publicaciones;
    }

    incrementarCantidadPublicaciones() {
        this.cant_Publicaciones++;
    }

    decrementarCantidadPublicaciones() {
        if (this.cant_Publicaciones > 0) {
            this.cant_Publicaciones--;
        }
    }
}

module.exports = User
