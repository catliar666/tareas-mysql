const { createConnection } = require('mysql2');


// Configuración de la conexión a la base de datos
const connection = createConnection({
host: 'localhost',
user: 'root',
password: 'root',
port: 3306,
database: 'backendTareas'
});

 // Conexión a la base de datos
function connect() {
    connection.connect((err) => {
if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
}
console.log('Conexión exitosa a la base de datos');
});
}

function close() {
    return new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          return reject('Error al cerrar la conexión: ' + err.stack);
        }
        resolve('Conexión cerrada');
      });
    });
  }




module.exports = {
    connect,
    close,
    connection
};