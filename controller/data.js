
let lista_Usuarios = [];
let lista_Publicaciones = [];
let lista_Usuarios_Publicaciones = [];

function get_Usuarios(){
    return lista_Usuarios;
}

function get_Publicaciones(){
    return lista_Publicaciones
}

function get_Usuarios_Publicaciones(){
    return lista_Usuarios_Publicaciones;
}

function actualizar_Usuarios(lista){
    lista_Usuarios = lista;
}

function actualizar_Publicaciones(lista){
    lista_Publicaciones = lista;
}

function actualizar_Usuario_Publicacion(lista){
    lista_Usuarios_Publicaciones = lista;
}

module.exports = {
    get_Usuarios,
    get_Publicaciones,
    get_Usuarios_Publicaciones,
    actualizar_Usuarios,
    actualizar_Publicaciones,
    actualizar_Usuario_Publicacion
}