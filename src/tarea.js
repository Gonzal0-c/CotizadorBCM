class Tarea {
  constructor(id, descripcion, completada, fechaLimite) {
    this.id = id;
    this.descripcion = descripcion;
    this.completada = completada;
    this.fechaLimite = fechaLimite;
    this.subtareas = [];
  }

  agregarSubtarea(subtarea) {
    this.subtareas.push(subtarea);
    console.log(
      `Nueva subtarea agregada a la tarea "${this.descripcion}": "${subtarea.descripcion}"`
    );
  }

  mostrarSubtareas() {
    if (this.subtareas.length > 0) {
      console.log(`Subtareas de la tarea "${this.descripcion}":`);
      for (const subtarea of this.subtareas) {
        console.log(`- ${subtarea.descripcion}`);
      }
    } else {
      console.log(`La tarea "${this.descripcion}" no tiene subtareas.`);
    }
  }
}

class Subtarea {
  constructor(descripcion) {
    this.descripcion = descripcion;
  }
}

function crearNuevaTareaConSubtareas(id, descripcion, fechaLimite, subtareas) {
  const nuevaTarea = new Tarea(id, descripcion, false, fechaLimite);
  for (const subtareaDescripcion of subtareas) {
    const nuevaSubtarea = new Subtarea(subtareaDescripcion);
    nuevaTarea.agregarSubtarea(nuevaSubtarea);
  }
  return nuevaTarea;
}

const listaDeTareas = [];

function agregarTareaALista(tarea) {
  listaDeTareas.push(tarea);
  console.log(`Nueva tarea agregada: "${tarea.descripcion}"`);
}

function mostrarTodasLasTareas() {
  console.log("Lista de tareas:");

  for (const tarea of listaDeTareas) {
    const estado = tarea.completada ? "Completada" : "Pendiente";
    const fechaLimite = tarea.fechaLimite
      ? ` - Fecha límite: ${tarea.fechaLimite}`
      : "";
    console.log(`[${tarea.id}] ${tarea.descripcion} - ${estado}${fechaLimite}`);
    tarea.mostrarSubtareas();
  }
}

const tarea1 = crearNuevaTareaConSubtareas(1, "Proyecto Final", "2024-03-15", [
  "Investigación",
  "Desarrollo",
  "Pruebas",
]);
const tarea2 = crearNuevaTareaConSubtareas(
  2,
  "Planificación de Viaje",
  "2024-03-20",
  ["Reservar vuelos", "Hacer maleta"]
);
const tarea3 = crearNuevaTareaConSubtareas(
  3,
  "Preparación de la Cena",
  "2024-03-25",
  ["Comprar ingredientes", "Cocinar"]
);

agregarTareaALista(tarea1);
agregarTareaALista(tarea2);
agregarTareaALista(tarea3);

tarea1.agregarSubtarea(new Subtarea("Presentación del Proyecto"));
tarea2.agregarSubtarea(new Subtarea("Investigación de Destinos"));

tarea1.marcarComoCompletada();
tarea2.establecerFechaLimite("2024-03-22");

mostrarTodasLasTareas();
