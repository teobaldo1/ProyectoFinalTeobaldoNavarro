/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}
*/
let vistaTrueAll=true
let vistaTrueTareasCompletas=false
let vistaTrueActivas=false

const buttonAdd = document.querySelector("#adicionarTarea");
buttonAdd.addEventListener("click", addTask);

// Función para añadir una nueva tarea al listado total de tareas
function addTask(obj) {
  let objetoPrincipal = JSON.parse(localStorage.getItem("tasks"));
  const detalleTask = document.querySelector("#addDetails").value;

  if (!objetoPrincipal) { 
    let task = {
      id: 1,
      title: detalleTask,
      completed: false,
    };
    objetoPrincipal = [task];
    localStorage.setItem("tasks", JSON.stringify(objetoPrincipal));
  } else {
    let task = {
      id: identificarIdSiguiente(objetoPrincipal),
      title: detalleTask,
      completed: false,
    };
    objetoPrincipal.push(task);
    localStorage.setItem("tasks", JSON.stringify(objetoPrincipal));
  }
  mostrarTarea();
}
mostrarTarea();

///

// Funcion para mostrar las tareas en la web
const ilBotonMostrarTodasLasTareas = document.querySelector("#todasLasTareas");
ilBotonMostrarTodasLasTareas.addEventListener("click",()=>{
  
  vistaTrueAll = true
  vistaTrueActivas =false;
  vistaTrueTareasCompletas = false;
  identificarTrue()
});

function mostrarTarea(obj) {
  const botonTodasLasTareas = document.querySelector("#borrarTodo");
  botonTodasLasTareas.style.display="none"
  const siApareceInput = document.querySelector("#addDetails");
  siApareceInput.style.display=""
  const noApareceBotonAdd = document.querySelector("#adicionarTarea");
  noApareceBotonAdd.style.display=""
  let tasks = JSON.parse(localStorage.getItem("tasks")); //llamamos al localStore
  if(tasks){
  let vistaDeTareas = document.querySelector("#listaDeTareas"); //llamamos el div donde mostranos las tareas
  vistaDeTareas.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
   
    let id = tasks[i].id;
    let title = tasks[i].title;// contiene el array con todas los titulos de las tareas
    let completed = tasks[i].completed;

       
    vistaDeTareas.innerHTML += `<div class= "tasks">
                                  <div id = "ingresoTareas" >
                                     <input type="checkbox" class="botonesIndividuales"  data-id="${tasks[i].id}" ${tasks[i].completed ? "checked" :""}> ${title} 
                        
                                  </div>
                                </div>`;
  objchequeado()

    }        
  }
}

//funcion para determinar el id de las tareas

function identificarIdSiguiente(objPrincipal) {
  let idSiguiente = 0;
  for (let i = 0; i < objPrincipal.length; i++) {
    if (objPrincipal[i].id > idSiguiente) {
      idSiguiente = objPrincipal[i].id;
    }
  }
  return ++idSiguiente;
}






// Funcion para Filtrar las tareas completadas

function objchequeado(){
  const todosLoscheckbox = document.querySelectorAll(".botonesIndividuales");
  let objPrincipal = JSON.parse(localStorage.getItem("tasks"));
  todosLoscheckbox.forEach((check) => {
    check.addEventListener("click", () => {
      let id = check.getAttribute("data-id");
      const tareasChekeadas = objPrincipal.find((obj) => (obj.id == id));
      tareasChekeadas.completed = check.checked;

        for (let i = 0; i < objPrincipal.length; i++) {
          if (objPrincipal[i].id==tareasChekeadas.id) {
            objPrincipal[i].completed=tareasChekeadas.completed;
            localStorage.setItem("tasks", JSON.stringify(objPrincipal));
            identificarTrue()
            break;
          }
          
        }

    });
  
  });
  
}


// Funcion para mostrar Las Tareas completas


const ilBotonTareaCompleta = document.querySelector("#tareasCompletadas");
ilBotonTareaCompleta.addEventListener("click",()=>{ 
  const botonTareasCompletas = document.querySelector("#borrarTodo");
  botonTareasCompletas.style.display=""
  const siApareceInput = document.querySelector("#addDetails");
  siApareceInput.style.display="none"
  const noApareceBotonAdd = document.querySelector("#adicionarTarea");
  noApareceBotonAdd.style.display="none"
  vistaTrueTareasCompletas = true;
  vistaTrueActivas =false;
  vistaTrueAll= false;
  identificarTrue()
} );

let vistaTareasCompletadas = document.querySelector("#listaDeTareas");
function completeTask() { 
  let objPrincipal = JSON.parse(localStorage.getItem("tasks"));
   if (objPrincipal) {
   const tareasFinalizadas = objPrincipal.filter((task)=> task.completed);
   
  // variable con la tareas completadas
    let vistaDeTareas = document.querySelector("#listaDeTareas");
    vistaDeTareas.innerHTML = "";
    for (let i = 0; i < tareasFinalizadas.length; i++) {
    let id = tareasFinalizadas[i].id;
    let title = tareasFinalizadas[i].title; // contiene el array con todas los titulos de las tareas
    let completed = tareasFinalizadas[i].completed;
    vistaDeTareas.innerHTML += `<div class= "tasks">
                                <div id = "ingresoTareas" >
                                <input type="checkbox" class=" botonesIndividuales"  data-id="${id}" ${completed ? "checked" :""}> ${title}                      
                                 </div>
                                 <button class="botonBorrarIndividual" id="botonBorrarIndividual-${id}"><i class="fa-solid fa-trash"></i></button> 
                                   
                             </div>`;

                                                 
    }   
   
    llamarBotonBorrar() 
    objchequeado()
  }
  
}

//Borrar tareas de forma individual

function llamarBotonBorrar (){
  let objPrincipal = JSON.parse(localStorage.getItem("tasks"));
  const botonesBorrar = document.querySelectorAll(".botonBorrarIndividual");
  botonesBorrar.forEach(botonBorrar=>{
    botonBorrar.addEventListener("click", ()=> {
      const idBoton= botonBorrar.id.split("-")[1]
      for (let i = 0; i < objPrincipal.length; i++) {
        if(objPrincipal[i].id== idBoton) {
          objPrincipal.splice(i,1)
          localStorage.setItem("tasks", JSON.stringify(objPrincipal));
          break;
        }
        
      }
      completeTask();
    })
  })
};


// Función para borrar Todas las tareas en Completed

const borrarTodas = document.querySelector("#borrarTodo");
borrarTodas.addEventListener("click", borrarTodaslasTareas);
function borrarTodaslasTareas() { console.log("hola");
  let tareasGuardadas = JSON.parse(localStorage.getItem("tasks"));
  let tareasEnTrue = tareasGuardadas.filter((task) => task.completed);

  let cantidadEnTrue = tareasEnTrue.length;
  while (cantidadEnTrue > 0) {
    for (let i = 0; i < tareasGuardadas.length; i++) {
      if (tareasGuardadas[i].completed) {
        tareasGuardadas.splice(i, 1);
        break;
      }
    }
    cantidadEnTrue--;
  }

  localStorage.setItem("tasks", JSON.stringify(tareasGuardadas));
  completeTask();
}


// Función para filtrar tareas incompletas

const ilBotonTareaIncompleta = document.querySelector("#tareasActivas");
ilBotonTareaIncompleta.addEventListener("click",() =>{

  vistaTrueActivas =true;
  vistaTrueTareasCompletas = false;
  vistaTrueAll= false;
  identificarTrue()
})

  

function filterUncompleted() {
  const botonTodasLasTareas = document.querySelector("#borrarTodo");
  botonTodasLasTareas.style.display="none"
  const siApareceInput = document.querySelector("#addDetails");
  siApareceInput.style.display=""
  const noApareceBotonAdd = document.querySelector("#adicionarTarea");
  noApareceBotonAdd.style.display=""


  let objPrincipal = JSON.parse(localStorage.getItem("tasks"));
  if (objPrincipal) {
   const tareasActivas = objPrincipal.filter((obj) =>!obj.completed);
  // variable con la tareas completadas
  let vistaDeTareas = document.querySelector("#listaDeTareas");
  vistaDeTareas.innerHTML = "";
  for (let i = 0; i < tareasActivas.length; i++) {
    let id = tareasActivas[i].id;
    let title = tareasActivas[i].title; // contiene el array con todas los titulos de las tareas
    let completed = tareasActivas[i].completed;

    vistaDeTareas.innerHTML += `<div class= "tasks">
                                <div id = "ingresoTareas" >
                                <input type="checkbox" class="botonesIndividuales"  data-id="${id}" ${tareasActivas.completed ? checked :""}> ${title}
                                   
                                 </div>
                             </div>`;
    }
    objchequeado()
  }
  
}


const blueBorder = document.querySelectorAll(".option");
blueBorder.forEach(element=> {
  element.addEventListener("click", ()=> {
    blueBorder.forEach((op)=> {
      if(op.classList[1] == "active"){
        op.classList.remove("active");
      };
    });
    element.classList.toggle("active");

  });
});

function identificarTrue(){
  
  if(vistaTrueTareasCompletas){
    completeTask()
    console.log('completas');
  }else if(vistaTrueActivas){
    filterUncompleted();
    console.log('incompleta');
  }else if(vistaTrueAll){
      mostrarTarea();
      console.log('todos');
  }

}



