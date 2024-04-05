'use strict'

const Publicacion = require('../models/publicacion.model');
const Comentario = require('../models/comentario.model');
const user_Controller = require('./user.controller');
const file_System = require('fs');

let lista_Publicaciones = [];
let lista_Usuarios_Publicacion = [];

function crear_Publicacion(req, res){
    
    const params = req.body;
    if(params.descripcion && params.categoria && params.anonimo){
        let nueva_Publicacion = new Publicacion();
        let fecha_Actual = new Date();
        let user = user_Controller.get_Usuario_Logueado();

        if(lista_Publicaciones.length > 0){
            nueva_Publicacion.id_Publicacion = lista_Publicaciones.length;
        }else{
            nueva_Publicacion.id_Publicacion = 0;
        }

        nueva_Publicacion.codigo = user.codigo;
        nueva_Publicacion.descripcion = params.descripcion;
        nueva_Publicacion.categoria = params.categoria;
        nueva_Publicacion.anonimo = (params.anonimo === "true");
        // Obtener los componentes de la hora y los minutos
        let horas = fecha_Actual.getHours();
        let minutos = fecha_Actual.getMinutes();

        // Asegurarse de que los valores de las horas y los minutos tengan dos dígitos (agregar un cero al principio si es necesario)
        horas = horas < 10 ? '0' + horas : horas;
        minutos = minutos < 10 ? '0' + minutos : minutos;

        // Concatenar los componentes de la hora y los minutos en una cadena de texto
        let horaYMinutos = horas + ':' + minutos;

        
        // Obtener los componentes de la fecha: día, mes y año
        let dia = fecha_Actual.getDate();
        let mes = fecha_Actual.getMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11
        let anio = fecha_Actual.getFullYear();

        // Asegurarse de que los valores del día y el mes tengan dos dígitos (agregar un cero al principio si es necesario)
        dia = dia < 10 ? '0' + dia : dia;
        mes = mes < 10 ? '0' + mes : mes;

        // Concatenar los componentes de la fecha en una cadena de texto con el formato dd/mm/yyyy
        let fechaEnTexto = dia + '/' + mes + '/' + anio;
        nueva_Publicacion.fecha_Hora = fechaEnTexto + ' ' + horaYMinutos;

        if(params.imagen !== undefined){
            nueva_Publicacion.imagen = convertir_Base64(params.imagen);
        }else{
            nueva_Publicacion.imagen = '';
        }

        const userFind = lista_Usuarios_Publicacion.find(usuario => usuario.codigo === user.codigo);
        if(!userFind){
            lista_Usuarios_Publicacion.push(user);
        }
        lista_Publicaciones.push(nueva_Publicacion);
        user_Controller.incremetar_Publicaciones();
        return res.status(201).send({message:'Se ha creado la publicaion con exito', usuario:user});
    }else{
        return res.status(401).send({message:'Envia todos los parametros obligatorios'});
    }
    
}

function convertir_Base64(file_Path){
    //Leer el contenido de la imagen en formato binario
    const imagen_Binaria = file_System.readFileSync(file_Path);
    //convertir la imagen en base 64
    const imagen_Base64 = Buffer.from(imagen_Binaria).toString('base64');
    return imagen_Base64;
}

function mostrar_Publicaciones(req, res){
    let lista_Publicaciones = obtener_Lista_Publicaciones();
    let lista_Usuario_Publicacion = obtener_Lista_Usuario_Ordenado();

    return res.status(200).send({message:"Los datos se han cargado con exito", publicacion:lista_Publicaciones, usuarios:lista_Usuario_Publicacion});
}

function obtener_Lista_Publicaciones(){
    return lista_Publicaciones;
}

function obtener_Lista_Usuario_Ordenado(){
    return lista_Usuarios_Publicacion;
}

function dar_Like(req, res){
    const params = req.body;

    if(params.id_Publicacion){
        const index = lista_Publicaciones.findIndex(publicacion => publicacion.id_Publicacion === parseInt(params.id_Publicacion));
        if(index != -1){
            lista_Publicaciones[index].incremetar_Cantidad_No_Likes();
            return res.status(200).send({message:'Se ha dado me gusta', publicaciones:lista_Publicaciones});
        }else{
            return res.status(401).send({message:'no se encontro la publicacion'});    
        }
    }else{
        return res.status(401).send({message:'no se ha brindado el id de la publicacion'});
    }
}

function agregar_Comentario(req, res){
    const params = req.body;
    const user = user_Controller.get_Usuario_Logueado();
    const comentario_Nuevo = new Comentario();

    if(params.comentario && params.id_Publicacion){
        let id_Publicacion = parseInt(params.id_Publicacion);
        let index = lista_Publicaciones.findIndex(publicacion => publicacion.id_Publicacion === id_Publicacion);
        if(index != -1){
            comentario_Nuevo.comentario = params.comentario;
            let nombre_Completo = user.nombres +' '+ user.apellidos;
            comentario_Nuevo.nombre_Completo = nombre_Completo;
            let carrera_facultad = user.carrera + '(' + user.facultad + ')';
            comentario_Nuevo.carrera_facultad = carrera_facultad;
            lista_Publicaciones[index].lista_Comentarios.push(comentario_Nuevo);
            lista_Publicaciones[index].incremetar_Cantidad_No_Comentarios();
            let publicacion = lista_Publicaciones[index];
            return res.status(200).send({message:'Se ha agregado el comentario de manera satisfactoria', publicacion})
        }else{
            return res.status(400).send({message:'Fallo la creacion del comentario, no se encotro la publicacion'});
        }
    }else{
        return res.status(401).send({message:'Debes enviar todos los parametros'});
    }

}

function mostrar_Tendencias(req, res){
    //Calcular la suma de me gustas y comentarios por publicacion
    for(let i = 0; i < lista_Publicaciones.length; i++){
        let cant_Likes = lista_Publicaciones[i].no_Likes;
        let cant_Comentarios = lista_Publicaciones[i].no_Comentarios;

        lista_Publicaciones[i].suma_Likes_Comentarios = cant_Likes + cant_Comentarios;
    }

    //Se ordena la lista de manera descendente por medio de la suma_Likes_Comentarios
    let lista_Ordenada = lista_Publicaciones.sort((a, b) => b.suma_Likes_Comentarios - a.suma_Likes_Comentarios);
    return res.status(201).send({message:'Se han ordenado las publicaciones con exito', tendencias:lista_Ordenada})
}

module.exports = {
    crear_Publicacion,
    mostrar_Publicaciones,
    obtener_Lista_Publicaciones,
    obtener_Lista_Usuario_Ordenado,
    dar_Like,
    agregar_Comentario,
    mostrar_Tendencias,
}
