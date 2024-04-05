'use strict'

const User = require('../models/user.model');
//EL siguiente import es para poder abrir archivos y abrirlos para realizar operaciones con ellos
const file_System = require('fs');

let lista_Usuarios = [];
let usuario_Logueado;

function prueba(req, res){
    return res.send({message:'Todo va bien'})
}

function get_Usuario_Logueado(){
    return usuario_Logueado;
}

//Se crea el usuario administrador
function crear_Admin(){
    const usuario_Admin = new User();
    usuario_Admin.codigo = '12024';
    usuario_Admin.nombres = 'Rodrigo Antonio';
    usuario_Admin.apellidos = 'Porón De León';
    usuario_Admin.genero = 'M';
    usuario_Admin.facultad = 'Ingeniería';
    usuario_Admin.carrera = 'Ingeniería en Ciencias y Sistemas';
    usuario_Admin.correo = 'ipc11s2024@email.com';
    usuario_Admin.password = '@dminIPC1';
    usuario_Admin.rol = 'Administrador';
    lista_Usuarios.push(usuario_Admin);
}

function registrar_Usuario(req, res){
    //Nueva instancia de la clase usuario
    const usuario_Nuevo = new User();
    // Se genera la variable params para que obtenga todos los datos
    // enviados por medio de la peticion
    const params = req.body;

    //Verifico que todos los parametros para crear al usuario vengan en la solicitud
    if(params.codigo && params.nombres && params.apellidos 
        && params.genero && params.facultad && params.carrera
        && params.correo && params.password && params.rol){
        //Se busca dentro de la lista de usuarios, si existe algun usuario que ya posea este id
        let resultado = lista_Usuarios.find(user => user.codigo === params.codigo);
        if(resultado){
            //Si existe, se procede a de volver un mensaje de error porque ya existe el usuario
            return res.status(400).send({message: 'El ID de usuario ya existe.'});
        }else{
            //Valido que la password sea correcta con las reglas de seguridad
            if(validar_Password(params.password)){
                //Si no existe, se procede a crear el usuario nuevo y agregarlo a la lista de usuarios
                usuario_Nuevo.codigo = params.codigo;
                usuario_Nuevo.nombres = params.nombres;
                usuario_Nuevo.apellidos = params.apellidos;
                usuario_Nuevo.genero = params.genero;
                usuario_Nuevo.facultad = params.facultad;
                usuario_Nuevo.carrera = params.carrera;
                usuario_Nuevo.correo = params.correo;
                usuario_Nuevo.password = params.password;
                usuario_Nuevo.rol = params.rol;

                usuario_Logueado = usuario_Nuevo;
                lista_Usuarios.push(usuario_Nuevo);
                return res.status(201).send({message: 'El usuario a sido creado con exito.', usuario_Logueado})
            }else{
                //De no ser valida la password se muestra un mensaje de error
                return res.status(400).send({message: 'La contraseña no cumple con los criterios de validación.'});
            }
        }
    }else{
        return res.send({message:'Ingresa todos los parametros minimos'})
    }
}

function iniciar_Sesion(req, res){
    const params = req.body;
    if(params.codigo && params.password){
            const userFind = lista_Usuarios.find(user => user.codigo === params.codigo);
            if(userFind && userFind.password === params.password){
                usuario_Logueado = userFind;
                return res.status(200).send({message:'Se inicio sesion correctamente', usuario:usuario_Logueado});
            }else{
                return res.status(404).send({message:'Los datos proporcionados no corresponden a ningun usuario'});
            }
    }else{
        return res.status(404).send({message:'Por favor llena los campos obligatorios'});
    }
}

function actualizar_Usuario(req, res){
    let userId = req.params.id;
    let params = req.body;

    if(params.nombres && params.apellidos 
        && params.genero && params.facultad && params.carrera
        && params.correo && params.password){
        const indice = lista_Usuarios.findIndex(user => user.codigo === userId);
        if(indice != -1){
            if(validar_Password(params.password)){
                usuario_Logueado.nombres = params.nombres;
                usuario_Logueado.apellidos = params.apellidos;
                usuario_Logueado.genero = params.genero;
                usuario_Logueado.facultad = params.facultad;
                usuario_Logueado.carrera = params.carrera;
                usuario_Logueado.correo = params.correo;
                usuario_Logueado.password = params.password;
                lista_Usuarios[indice] = usuario_Logueado;
                return res.status(200).send({message:'Se han actualizado los datos correctamente'})
            }else{
                return res.status(400).send({message:'La contraseña no cumple con los requisitos minimos'});
            }
        }else{
            return res.status(400).send({message:'No se encontro al usuario para actualizarlo'});
        }
    }
}

function incremetar_Publicaciones(){
    const indice = lista_Usuarios.findIndex(user => user.codigo === usuario_Logueado.codigo);
    if(indice != -1){
        lista_Usuarios[indice].incrementarCantidadPublicaciones();
    }else{
        return res.status(404).send({message:'Aun no existe el usuario para agregarle la publicacion'});
    }
}
//Funcion que valida que la password cumpla con todas las caracteristicas
function validar_Password(password){
    
    //Se verifica que la password tenga al menos 8 caracteres
    if(password.length < 8){
        return false;
    }

    //Se verificar si hay al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    //Se verificar si hay al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
        return false;
    }

    //Se verificar si hay al menos un carácter especial
    if (!/[$@$!%*?&]/.test(password)) {
        return false;
    }

    // Si la password cumple con todos los criterios, devolver true
    return true;

}

//FUNCIONES DEL ADMINISTRADOR
function listar_Usuarios(req, res){
    return res.send({message:'Usuarios encontrados', usuarios:lista_Usuarios});   
}

function eliminar_Usuario(req, res){
    let userId = req.params.id;
    if(userId){
        const userFind = lista_Usuarios.find(user => user.codigo === userId);
        if(userFind){
            //Filter sirve para que todos los valores que den True en la comparacion seran tomadas para la nueva matriz
            //excluyendo al usuario con el id que sea igual
            lista_Usuarios = lista_Usuarios.filter(user => user.codigo !== userId);
            return res.status(200).send({message: 'El usuario a sido eliminado con exito.', usuarios:lista_Usuarios})
        }else{
            return res.status(404).send({message:'El usuario no pudo ser eliminado o ya fue eliminado'});
        }
    }else{
        return res.status(404).send({message:'Por favor envia el id del usuario'});
    }
}

function carga_Masiva(req, res){
    const param = req.body;
    //Hacemos uso de un try catch para evitar que los errores encontrados en el archivo no detengan la API
    try{
        const data = file_System.readFileSync(param.path, 'utf-8');
        const usuarios = JSON.parse(data); // Convierte el contenido del archivo a un objeto de javascript
        //Por cada usuario en la lista, se van a ir recorriendo
        usuarios.forEach(usuario => {
            const usuario_Nuevo = new User(
                usuario.codigo,
                usuario.nombres,
                usuario.apellidos,
                usuario.genero,
                usuario.facultad,
                usuario.carrera,
                usuario.correo,
                usuario.contrasenia,
                usuario.rol = 'Usuario'
            );
            lista_Usuarios.push(usuario_Nuevo);
        });
       return res.status(201).send({message:'La carga de archivos ha sido un exito', usuarios:lista_Usuarios});
    }catch(error){
        console.error('Error al leer el archivo JSON: ', error);
        return res.status(404).send({message:'Hubo un problema al leer el archivo!'});
    }
}

module.exports = {
    crear_Admin,
    prueba,
    registrar_Usuario,
    iniciar_Sesion,
    listar_Usuarios,
    eliminar_Usuario,
    actualizar_Usuario,
    carga_Masiva,
    get_Usuario_Logueado,
    incremetar_Publicaciones,
}