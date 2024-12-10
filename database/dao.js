// database/dao.js
const Task = require('../models/task');
const { connection } = require('./connection');

// Función para obtener todos los usuarios
function getTareas() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM tarea", (err, results) => {
      if (err) {
        return reject('Error al ejecutar la consulta: ' + err.stack);
      }
      resolve(results);
    });
  });
}

// Función para insertar un nuevo usuario
function insertarTarea(desc) {
  const task = new Task(desc);
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO tarea VALUES (?, ?, ?)';
    connection.query(query, [task.id, task.descripcion, task.completado], (err, results) => {
      if (err) {
        return reject('Error al insertar la tarea: ' + err.stack);
      }
      resolve(results);
    });
  });
}


function completarTarea(tareas) {
  return new Promise((resolve, reject) => {
    const promises = tareas.map((tarea) => {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE tarea SET completado = ? WHERE id = ?';
      
        connection.query(query, [tarea.completado, tarea.id], (err, results) => {
          if (err) {
            return reject('Error al actualizar tarea con id ' + tarea.id + ': ' + err.stack);
          }
          resolve(results);  // Resolver la promesa cuando la tarea se haya actualizado
        });
      });
    });

    // Usar Promise.all para esperar que todas las actualizaciones terminen
    Promise.all(promises)
      .then((results) => {
        resolve(results);  // Resuelve con los resultados de todas las actualizaciones
      })
      .catch((err) => {
        reject('Error al actualizar las tareas: ' + err);
      });
  });
}

function deleteTarea(id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM tarea WHERE id = ?";

      connection.query(query, [id], (err, results) =>{
        if (err) {
          return reject('Error al borrar tarea con id ' + tarea.id + ': ' + err.stack);
        }
        resolve(results);  // Resolver la promesa cuando la tarea se haya actualizado
      });
  });
};




// Exportar las funciones
module.exports = { getTareas, insertarTarea, completarTarea, deleteTarea };
