

// Inicializar la base de datos con los datos mínimos para funcionar

const readline = require('readline');



// Cargamos los modelos 
const Articulos = require('./models/Articulos');

async function main() {
    //Preguntar al usuario si está seguro
    const continuar = await pregunta('¿Estás seguro que quieres borrar la base de datos?');
    if (!continuar) {
        process.exit();
    }

    // Conectar a la base de datos
    const connection = require('./lib/connectMongoose');


    // Inicializar la colección de artículos
    await initArticulos();

    // Desconectamos de la base de datos
    connection.close();
}



main().catch(err => console.log('Hubo un error', err));

async function initArticulos() {
    // Borrar todos los documentos de artículos 
     const result = await Articulos.deleteMany();
     console.log(`Eliminados ${result.deletedCount} agentes`);

    // Crear artículos iniciales
    const inserted = await Articulos.insertMany([
        {name: 'Bicicleta', estado: true, precio: 300, imagen: '', tags: 'lifestyle'},
        {name: 'Iphone', estado: false, precio: 650, imagen: '', tags: 'mobile'},
        {name: 'Cámara', estado: true, precio: 200, imagen: '', tags: 'lifestyle'},
    ]);

    console.log(`Creados ${inserted.length} agentes`);
}

function pregunta(text) {
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, respuesta => {
            interface.close();
            if(respuesta.toLocaleLowerCase() === 'si') {
                resolve(true);
                return;
            }
            resolve(false);
        });
    })
}



