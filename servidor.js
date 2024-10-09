
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let estudiantes = [
    {id:1, nombre: 'Francisco Alvarez'},
    {id:2, nombre: 'Monica Gutierrez'},
    {id:3, nombre: 'Carlos Ruiz'},
    
];


// Obtener todos los estudiantes 

app.get('/estudiantes', (req, res)=>{   // => Arrow function
    res.json(estudiantes);
})

//  GET: Obtener un estudiante por ID

app.get('/estudiantes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const estudiante = estudiantes.find(e=>e.id===id);


if (estudiante){
    res.json(estudiante);
} else {
    res.status(404).send('Estudiante no localizado')
}
});


// Inicializacion del servidor
app.listen(PORT,()=>{
    console.log('Servidor ejecutando en http://localhost:${PORT}');
});

// POST: para crear un nuevo estudiante

app.post('/estudiantes', (req,res) =>{
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre
    };
    estudiantes.push(nuevoEstudiante);
    res.status(201).json(nuevoEstudiante);
}); 

