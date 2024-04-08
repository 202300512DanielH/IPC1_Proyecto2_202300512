'use strict'

const Publicacion = require('../models/publicacion.model');
const Comentario = require('../models/comentario.model');
const user_Controller = require('./user.controller');
const data = require('./data');
const file_System = require('fs');
const path = require('path');

function publicacion_Nueva(descripcion, categoria, anonimo, imagen, user){
    let nueva_Publicacion = new Publicacion();
    let lista_Publicaciones = data.get_Publicaciones();

    if(lista_Publicaciones.length > 0){
        let index = lista_Publicaciones.length - 1;
        let id_Publicacion = lista_Publicaciones[index].id_Publicacion + 1;
        nueva_Publicacion.id_Publicacion = id_Publicacion;
    }else{
        nueva_Publicacion.id_Publicacion = 0;
    }

    nueva_Publicacion.codigo = user.codigo;
    nueva_Publicacion.descripcion = descripcion;
    nueva_Publicacion.categoria = categoria;
    nueva_Publicacion.fecha_Hora = obtener_Hora_Fecha();

    if(typeof anonimo === "string"){
        nueva_Publicacion.anonimo = (anonimo === "true");
    }else{
        nueva_Publicacion.anonimo = anonimo;
    }
    
    if(imagen !== undefined){
        nueva_Publicacion.imagen = convertir_Base64(params.imagen);
    }else{
        nueva_Publicacion.imagen = '';
    }

    let lista_Usuarios_Publicacion = data.get_Usuarios_Publicaciones();
    const userFind = lista_Usuarios_Publicacion.find(usuario => usuario.codigo === user.codigo);
    if(!userFind){
        lista_Usuarios_Publicacion.push(user);
        data.actualizar_Usuario_Publicacion(lista_Usuarios_Publicacion);
    }

    return nueva_Publicacion;

}

function crear_Publicacion(req, res){
    
    const params = req.body;
    if(params.descripcion && params.categoria && params.anonimo){
        
        let user = user_Controller.get_Usuario_Logueado();
        let nueva_Publicacion = publicacion_Nueva(
            params.descripcion,
            params.categoria,
            params.anonimo,
            params.imagen,
            user
        );
        let lista_Publicaciones = data.get_Publicaciones();
        lista_Publicaciones.push(nueva_Publicacion);
        data.actualizar_Publicaciones(lista_Publicaciones);
        user_Controller.incremetar_Publicaciones(user.codigo);
        return res.status(201).send({message:'Se ha creado la publicaion con exito', usuario:user});
    }else{
        return res.status(401).send({message:'Envia todos los parametros obligatorios'});
    }
    
}

function obtener_Hora_Fecha(){

    let fecha_Actual = new Date();
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
    let fecha_Hora = fechaEnTexto + ' ' + horaYMinutos;
    return fecha_Hora;
}

function convertir_Base64(file_Path){
    //Leer el contenido de la imagen en formato binario
    const imagen_Binaria = file_System.readFileSync(file_Path);
    //convertir la imagen en base 64
    const imagen_Base64 = Buffer.from(imagen_Binaria).toString('base64');
    return imagen_Base64;
}

function mostrar_Publicaciones(req, res){
    let lista_Publicaciones = data.get_Publicaciones();
    let lista_Usuario_Publicacion = data.get_Usuarios_Publicaciones();

    return res.status(200).send({message:"Los datos se han cargado con exito", publicacion:lista_Publicaciones, usuarios:lista_Usuario_Publicacion});
}

function dar_Like(req, res){
    const params = req.body;

    if(params.id_Publicacion){
        let lista_Publicaciones = data.get_Publicaciones();
        const index = lista_Publicaciones.findIndex(publicacion => publicacion.id_Publicacion === parseInt(params.id_Publicacion));
        if(index != -1){
            lista_Publicaciones[index].incremetar_Cantidad_No_Likes();
            data.actualizar_Publicaciones(lista_Publicaciones);
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
        let lista_Publicaciones = data.get_Publicaciones();
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
            data.actualizar_Publicaciones(lista_Publicaciones);
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
    let lista_Publicaciones = data.get_Publicaciones();
    for(let i = 0; i < lista_Publicaciones.length; i++){
        let cant_Likes = lista_Publicaciones[i].no_Likes;
        let cant_Comentarios = lista_Publicaciones[i].no_Comentarios;

        lista_Publicaciones[i].suma_Likes_Comentarios = cant_Likes + cant_Comentarios;
    }
    data.actualizar_Publicaciones(lista_Publicaciones);

    //Se ordena la lista de manera descendente por medio de la suma_Likes_Comentarios
    let lista_Ordenada = lista_Publicaciones.sort((a, b) => b.suma_Likes_Comentarios - a.suma_Likes_Comentarios).slice(0, 10);
    return res.status(201).send({message:'Se han ordenado las publicaciones con exito', tendencias:lista_Ordenada})
}

function carga_Masiva(req, res){
    const param = req.body;
    let lista_Publicaciones = data.get_Publicaciones();

    try{
        if(!param.path){
            return res.status(401).send({message:'No se ha proporcionado ningun archivo JSON'});
        }
        const data_JSON = file_System.readFileSync(param.path, 'utf-8');
        const publicaciones = JSON.parse(data_JSON);
        const lista_Usuarios = data.get_Usuarios();

        publicaciones.forEach(publicacion => {
            let user = lista_Usuarios.find(usuario => usuario.codigo === publicacion.codigo);
            if(user === undefined){
                return res.status(404).send({message:'El usuario al que le intentas asignar una publicacion, no existe -> id: '+publicacion.codigo});
            }else{
                const nueva_Publicacion = publicacion_Nueva(
                    publicacion.descripcion,
                    publicacion.categoria,
                    publicacion.anonimo,
                    publicacion.imagen,
                    user
                );
                lista_Publicaciones.push(nueva_Publicacion);
                user_Controller.incremetar_Publicaciones(user.codigo);
            }
        });
        data.actualizar_Publicaciones(lista_Publicaciones);
        data.actualizar_Usuarios(lista_Usuarios);
        return res.status(404).send({message:'La carga de archivos han sido un exito', Publicaciones:lista_Publicaciones});
    }catch(error){
        console.error('Error al leer el archivo JSON publicaciones');
        return res.status(404).send({message:'Hubo un problema al leer el archivo!\n'+error});
    }
}

function eliminar_Publicacion(req, res){
    const id_Publicacion = parseInt(req.params.id);

    let lista_Publicaciones = data.get_Publicaciones();
    let lista_Usuarios = data.get_Usuarios();
    let publicacion_Find = lista_Publicaciones.find(publicacion => publicacion.id_Publicacion === id_Publicacion);
    if(publicacion_Find){
        lista_Publicaciones = lista_Publicaciones.filter(publicacion => publicacion.id_Publicacion !== id_Publicacion);
        data.actualizar_Publicaciones(lista_Publicaciones);

        let index = lista_Usuarios.findIndex(usuario => usuario.codigo === publicacion_Find.codigo);
        lista_Usuarios[index].decrementarCantidadPublicaciones();
        data.actualizar_Usuarios(lista_Usuarios);

        if(lista_Usuarios[index].cant_Publicaciones === 0 ){
            let lista_Usuario_Publicacion = data.get_Usuarios_Publicaciones();
            lista_Usuario_Publicacion = lista_Usuario_Publicacion.filter(usuario => usuario.codigo !== publicacion_Find.codigo);
            data.actualizar_Usuario_Publicacion(lista_Usuario_Publicacion);
        }
        return res.status(201).send({message:'La publicacion se ha eliminado con exito', publicaciones:lista_Publicaciones})
    }else{
        return res.status(401).send({message:'La publicacion que quieres eliminar no existe'});
    }
}

function mostrar_Publicacion_Unico(req, res){
    let id_Publicacion = parseInt(req.params.id);
    let lista_Publicaciones = data.get_Publicaciones();
    let publicacion_Find = lista_Publicaciones.find(publicacion => publicacion.id_Publicacion === id_Publicacion);
    if(publicacion_Find){
        return res.status(201).send({message:'publicacion encontrada!', publicacion:publicacion_Find});
    }else{
        return res.status(401).send({message:'publicacion no encontrada!'});
    }
}

function publicacion_CSV(req, res){
    let params = req.body;
    if(params.id_Publicacion){
        let id_Publicacion = parseInt(params.id_Publicacion);
        let lista = data.get_Publicaciones();
        let publicacionFind = lista.find(publicacion => publicacion.id_Publicacion === id_Publicacion);
        if(publicacionFind){
            const headers = Object.keys(publicacionFind);
            const values = Object.values(publicacionFind);
            const headerRow = '"' + headers.join('","') + '"';
            const valueRow = '"' + values.join('","') + '"';
            let csv_format = headerRow + '\n' + valueRow;
            const downloadsFolder = path.join(require('os').homedir(), 'Downloads');
            const filePath = path.join(downloadsFolder, 'publicacion_' + params.id_Publicacion + '.csv');
            file_System.writeFile(filePath, csv_format, (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo CSV:', err);
                    return res.status(404).send({message:'Hubo un error al generar el archivo CSV'});
                } else {
                    return res.status(201).send({message:'Se ha generado el archivo CSV con exito en '+ filePath});
                }
            })
        }else{
            return res.status(401).send({message:'El codigo de la publicacion no pertenece a ninguna publicacion'});
        }
    }else{
        return res.status(401).send({message:'Proporciona todos los parametros minimos'});
    }
}

module.exports = {
    crear_Publicacion,
    mostrar_Publicaciones,
    dar_Like,
    agregar_Comentario,
    mostrar_Tendencias,
    carga_Masiva,
    eliminar_Publicacion,
    mostrar_Publicacion_Unico,
    publicacion_CSV
}
