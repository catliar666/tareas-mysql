require('colors');
const { inquirerMenu, pausaI, leerInput, borrar, confirmar, marcarTarea } = require('./helpers/inquirer');
const TaskList = require('./models/taskList');
const { close } = require('./database/connection');
const { getTareas, completarTarea, insertarTarea, deleteTarea } = require('./database/dao');

require('colors');
console.clear();

const main = async() => {
    let op = '';

    const tareas = new TaskList();

    const tareasBD = await getTareas();

    if ( tareasBD ) {
        tareas.cargarTareasFromArray( tareasBD );
    }

    

    do{
        
        op = await inquirerMenu();
        switch(op) {
            case '1':
                //Añadir tarea
                const desc = await leerInput('Descripción: ');
                tareas.addTask(desc);
                //Se añade solo 1 tarea a la base de datos
                await insertarTarea(desc);
                break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar tareas completadas
                tareas.listadoCompletadas();
                break;
            case '4':
                //Listar tareas pendientes
                tareas.listadoPendientes();
                break;
            case '5':
                //Completar tareas
                const ids = await marcarTarea(tareas.list)
                tareas.switchMarcados(ids);
                //Se actualiza toda la lista de tareas
                await completarTarea(tareas.list)
                break;
            case '6':
                //Borrar tarea
                const id = await borrar(tareas.list);
                if (id !== '0') {
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok){
                        tareas.borrarTareaPorId(id);
                        //Te elimina solo una tarea por el id
                        await deleteTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            case '0':
                //Salir
                console.log('Adios'.magenta)
                //Se cierra la conexion con mysql y se sale del programa cuando op sea 0
                close();
                break;
        }
        await pausaI();
    }while(op !== '0');
}

main();