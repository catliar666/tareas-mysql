const inquirer = require('inquirer');
const { validate } = require('uuid');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.magenta} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.magenta} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.magenta} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.magenta} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.magenta} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.magenta} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.magenta} Salir`
            },
        ]
    }
];



const inquirerMenu = async() => {
    
    console.clear();
    console.log('============================'.magenta);
    console.log('  Seleccione una opción  '.magenta);
    console.log('============================'.magenta);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausaI = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question)
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: message,

            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor introduzca un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const borrar = async( tareas ) => {
    const elecciones = tareas.map((tarea, i) => {
        const index = `${i+1}`.green;
        return {
            value: tarea.id,
            name: `${index} : ${tarea.descripcion}`
        }
    })

    elecciones.unshift({
            value: '0',
            name: `0. Cancelar`.green
    })

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'borrar',
        choices: elecciones
    }]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async( message ) => {
    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        message: message
    }]

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const marcarTarea = async( tareas ) => {
    const elecciones = Object.values(tareas).map((tarea, i) => {
        const index = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${index} : ${tarea.descripcion}`,
            checked: tarea.completado ? true : false
        };
    });
    

    const preguntas = [{
        type: 'checkbox',
        name: 'id',
        message: 'seleccionados',
        choices: elecciones
    }]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

module.exports = {
    inquirerMenu,
    pausaI,
    leerInput,
    borrar,
    confirmar,
    marcarTarea
}