const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tareas = [
  { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1', completada: false },
  { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2', completada: false },
  { id: 3, titulo: 'Tarea 3', descripcion: 'Descripción de la tarea 3', completada: false },
  { id: 4, titulo: 'Tarea 4', descripcion: 'Descripción de la tarea 4', completada: false },
  { id: 5, titulo: 'Tarea 5', descripcion: 'Descripción de la tarea 5', completada: false },
];

app.get('/', (req, res) => {
  res.send('API de Tareas');
});

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.get('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
});

app.post('/tareas', (req, res) => {
  const { titulo, descripcion } = req.body;
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    descripcion,
    completada: false
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

app.put('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descripcion, completada } = req.body;
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.titulo = titulo !== undefined ? titulo : tarea.titulo;
    tarea.descripcion = descripcion !== undefined ? descripcion : tarea.descripcion;
    tarea.completada = completada !== undefined ? completada : tarea.completada;
    res.json(tarea);
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
});

app.delete('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex(t => t.id === id);
  if (index !== -1) {
    const tareaEliminada = tareas.splice(index, 1);
    res.json(tareaEliminada[0]);
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
