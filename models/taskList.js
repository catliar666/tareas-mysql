const Task = require('./task');
const { completarTarea } = require('../database/dao');

class TaskList {

    _listado = {
        'abc': 123
    };

    get list() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor(){
        this._listado = {}
    }

    addTask(description){
        const task = new Task(description);
        this._listado[task.id] = task;
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }


    listadoCompleto(){
        // Queremos que salga en rojo las tareas que no estan completadas y en verde las que si lo están
        Object.keys(this._listado).forEach(id => {
            const tarea = this._listado[id];
            console.log(`ID: ${tarea.id}`);
            console.log(`Descripcion: ${tarea.descripcion}`);
            (tarea.completado != null) ? console.log(`Completado`.green) : console.log('Sin completar'.red);
            console.log('*************************************');
        });
    }

    listadoCompletadas(){
        // Queremos que salga en rojo las tareas que no estan completadas y en verde las que si lo están
        Object.keys(this._listado).forEach(id => {
            const tarea = this._listado[id];
            if (tarea.completado != null) {
                console.log(`ID: ${tarea.id}`);
                console.log(`Descripcion: ${tarea.descripcion}`);
                console.log(`Completado`.green);
                console.log('*************************************');
            }
        });
    }

    listadoPendientes(){
        // Queremos que salga en rojo las tareas que no estan completadas y en verde las que si lo están
        Object.keys(this._listado).forEach(id => {
            const tarea = this._listado[id];
            if (tarea.completado == null) {
                console.log(`ID: ${tarea.id}`);
                console.log(`Descripcion: ${tarea.descripcion}`);
                console.log(`No completado`.red);
                console.log('*************************************');
            }
        });
    }


    borrarTareaPorId(id){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    switchMarcados (idMarcados = []){
        idMarcados.forEach(id => {
            const tarea = this._listado[id];
            if (tarea && !tarea.completado) {
                tarea.completado = new Date();
                
            }
        });

        Object.keys(this._listado).forEach(id => {
            if (!idMarcados.includes(id)) {
                const tarea = this._listado[id];
                if (tarea) {
                    tarea.completado = null;
                }
            }
        });
    }


}

module.exports = TaskList