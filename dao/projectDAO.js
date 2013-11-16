var mongo = require('mongodb');
var variables = require("../variables");

/* The DAO must be constructed with a connected database object */
function ProjectsDAO(db) {
     /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ProjectsDAO)) {
        console.log('Warning: ProjectsDAO constructor called without "new" operator');
        return new ProjectsDAO(db);
    }

    var collection_name = "configuracion";
    var projects_collection = db.collection(collection_name);
    
    this.newProject = function(project,callback){

        var name = project.proyecto;
        // fix up the permalink to not include whitespace
        var permalink = name.replace( /\s/g, '_' );
        project.permalink = permalink.replace( /\W/g, '' );
        
        project.date = new Date();
        
        /// Convert text functions to mongo functions
        project.funcion_crear_cromosoma =  mongo.Code(project.funcion_crear_cromosoma);
console.log(project,'INSERT project');
        projects_collection.insert(project,function(err,doc){
            callback(err,doc);
        });
    }
    
    this.remove= function(query,callback){
        projects_collection.remove(query,callback);
    }
    
    /*
    * Devuelve una lista de proyectos que tienen trabajos pendientes.
    * @param filter Object  Opciones para filtrar la busqueda de proyectos
    *               - proyecto : Filtra por el nombre del proyecto
    */
    this.getAvailableWorks = function(filter,callback){
        var query = {};
        if(typeof filter.proyecto === 'undefined'){
            query.permalink = filter.proyecto;
        }
        
        query[variables.llaves_coleccion_proyectos.ESTADO] = {"$in":[variables.estados_proyecto.CREACION]};
        
        projects_collection.find(query,function(err,docs){
            
        });
    }
}

module.exports.ProjectsDAO = ProjectsDAO;