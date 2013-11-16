//Pruebas para las funciones de asignacion de trabajos
var vows = require('vows');
var topicAPI = require("./topicAPI");
var assert = require('assert');
var variables = require("../variables");


vows.describe('asignacion_trabajos').addBatch({
    "Asignacion de un trabajo": {
        topic: topicAPI.post(variables.rutas.asignar_trabajo, {
            "proyecto": variables.proyecto_pruebas.estado_inicial
        }),
        "Debe estar en la base de datos": {
            topic: topicAPI.findOne(variables.colecciones_mongodb.trabajo, {
                "proyecto": variables.proyecto_pruebas.estado_inicial
            }),
            "Debe tener un identificador de trabajo": function (err, doc) {
                this.DB.close();
                assert.isNotNull(doc, "El documento no debe estar vacio");
                assert.isNumber(doc.id);
            }
        }
    }
}).export(module);