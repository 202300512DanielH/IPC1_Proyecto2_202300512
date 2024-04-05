'use strict'

class Publicacion {
    constructor(id_Publicacion, codigo, descripcion, categoria, imagen,
		anonimo, fecha_Hora){
		this.id_Publicacion = id_Publicacion;
		this.codigo = codigo;
		this.descripcion = descripcion;
		this.categoria = categoria;
		this.imagen = imagen;
		this.anonimo = anonimo;
		this.lista_Comentarios = [];
		this.no_Likes = 0;
		this.no_Comentarios = 0;
		this.fecha_Hora = fecha_Hora;
		this.suma_Likes_Comentarios = 0;
    }

	incremetar_Cantidad_No_Comentarios(){
		this.no_Comentarios++;
	}

	incremetar_Cantidad_No_Likes(){
		this.no_Likes++;
	}
}

module.exports = Publicacion;