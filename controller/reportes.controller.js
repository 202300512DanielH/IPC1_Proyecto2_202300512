const data = require('./data');

function top_5_Likes(req, res){
    let lista_Publicaciones = data.get_Publicaciones();
    let lista_Ordenada = lista_Publicaciones.sort((a, b) => b.no_Likes - a.no_Likes).slice(0,5);
    return res.status(201).send({message:'Top 5 publicaciones con mas likes', top:lista_Ordenada});
}

function cantidad_Posts_Categoria(req, res){
    let lista_Publicaciones = data.get_Publicaciones();
    let conteo_Por_Categorias = {};

    //Conteo de publicaciones por categorias
    lista_Publicaciones.forEach(publicacion =>{
        let categoria = publicacion.categoria;
        //Verifico si la categoria ya fue guardada antes
        if(conteo_Por_Categorias.hasOwnProperty(categoria)){
            conteo_Por_Categorias[categoria]++;
        }else{
            //Sino existe la categoria, se agrega y se asigna 1
            conteo_Por_Categorias[categoria] = 1;
        }
    })

    let label = [];
    let value = [];

    for(let categoria in conteo_Por_Categorias){
        if(conteo_Por_Categorias.hasOwnProperty(categoria)){
            label.push(categoria);
            value.push(conteo_Por_Categorias[categoria]);
        }
    }
    return res.status(200).json({ labels:label, values:value });
}

function top_10_usuarios(req, res){
    let lista_usuarios = data.get_Usuarios();
    let lista_Ordenada = lista_usuarios.sort((a, b) => b.cant_Publicaciones - a.cant_Publicaciones).slice(0, 10);
    return res.status(200).send({message:'Top 10 usuarios con mas publicaciones', top:lista_Ordenada});
}

module.exports = {
    top_5_Likes,
    cantidad_Posts_Categoria,
    top_10_usuarios
}