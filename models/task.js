const { v4:uuidv4 } = require('uuid');
require('colors');

class Task {
    id = "";
    descripcion = "";
    completado = null;

    constructor(descripcion){
        this.descripcion = descripcion
        this.id = uuidv4();
        this.completado = null;
    };

    pintaTarea(){
        console.log(`ID: ${id}`);
        console.log(`Descripcion: ${this.descripcion}`);
        (completado) ? console.log(`Completado`.green) : console.log('Sin completar'.red);
    }
}



module.exports = Task