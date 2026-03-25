//Array de tasks inicial
const tasks=JSON.parse(localStorage.getItem("tasks")) || [
    {
        id:0,
        title:"Reunión con Cliente A",
        description:"Reunion con cliente",
        tags:["URGENTE","CLIENTE"],
        dueDate:"2025-12-08",
        priority:"ALTA",
        isCompleted:false
    },
    {
        id:1,
        title:"Reunión con Cliente B",
        description:"Reunion con cliente",
        tags:["URGENTE","CLIENTE"],
        dueDate:"2025-11-08",
        priority:"MEDIA",
        isCompleted:false
    },
    {
        id:2,
        title:"Reunión con Cliente C",
        description:"Reunion con cliente",
        tags:["URGENTE","CLIENTE"],
        dueDate:"2025-10-08",
        priority:"ALTA",
        isCompleted:false
    }
]

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Funcion para añadir tasks
function addTasks(){
    let buttonAdd=document.getElementsByClassName("btn-submit");

    buttonAdd.addEventListener("click",Event=>{

        let titleAdd= document.getElementById("title").value;
        let descriptionAdd= document.getElementById("description").value;
        let tagsAdd=document.getElementById("tags").value;
        let dueDateAdd=document.getElementById("dueDate").value;
        let priorityAdd=document.getElementById("priority").value;

        tasks.push({id:tasks.length+1,
                    title: titleAdd,
                    description: descriptionAdd,
                    tags: tagsAdd,
                    dueDate: dueDateAdd,
                    priority:priorityAdd,
                    isCompleted:false
                });

        saveTasks();
        mostrarTasks(tasks);
    })
}


//Funcion para mostrar tasks
function mostrarTasks(tasks){
    let list= document.getElementById("div");
    list.innerHTML = "";

    for(let i=0;i<tasks.length;i++){
        let taskContainer= document.createElement("div");

        let taskTitle=document.createElement("h3");
        taskTitle.textContent = tasks[i].title;

        let taskDue=document.createElement("p");
        taskDue.textContent = tasks[i].dueDate;

        let taskTags=document.createElement("p");
        taskTags.textContent = tasks[i].tags.join(",");

        let buttonDelete= document.createElement("button");
        buttonDelete.textContent = "Eliminar";
        buttonDelete.onclick = () => deleteTask(tasks[i].id);

        let buttonComplete= document.createElement("button");
        buttonComplete.textContent = "Completar";
        buttonComplete.onclick = () => completeTask(tasks[i].id);

        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDue);
        taskContainer.appendChild(taskTags);
        taskContainer.appendChild(buttonDelete);
        taskContainer.appendChild(buttonComplete);

        list.appendChild(taskContainer);
    }

    
}

//Funcion para eliminar tasks
function deleteTask(){
    tasks = tasks.filter(t => t.id != idDelete);

    saveTasks();
    mostrarTasks(tasks);
}

//Funcion para completar tasks
function completeTask(){
    let buttonComplete= document.getElementsByClassName("btn-success");

    buttonComplete.addEventListener("click",Event=>{
        let idComplete=document.getElementById("data-id");
        if(tasks.id== idComplete) tasks.isCompleted=true;

        mostrarTasks(tasks);
    })
}

//Funcion para mostrar tasks completadas
function mostrarCompleteTask(){
    let buttonMostComp=document.getElementById("filter-completed")

    buttonMostComp.addEventListener("click",Event=>{
        let tasksFil= tasks.filter(tasks.isCompleted==true)

        mostrarTasks(tasksFil);
    })
}

//Funcion para mostrar tasks pendientes
function mostrarPendingTask(){
    let buttonMostComp=document.getElementById("filter-pending")

    buttonMostComp.addEventListener("click",Event=>{
        let tasksFil= tasks.filter(tasks.isCompleted==false)

        mostrarTasks(tasksFil);
    })
}

//Funcion para mostrar tasks 
function mostrarTaskAll(){
    let buttonMostComp=document.getElementById("filter-all")

    buttonMostComp.addEventListener("click",Event=>{
        mostrarTasks(tasks);
    })
}

//Funcion para ordenar tasks
function orderTasks(){
    let buttonOrder=document.getElementById("optimize-btn");

    buttonOrder.addEventListener("click",Event=>{
        let newTask=tasks.sort((a.priority-b.priority)&&
                               (a.dueDate-b.dueDate)&&
                               (a.title-b.title));
        mostrarTasks(newTask);
    })
}

//Funcion para buscar tasks
function searchTasks(){
    let searchETasks=document.getElementById("search-input");

    searchETasks.addEventListener("submit",Event=>{
        let tasksNew= tasks.filter(tasks.tags.includes(searchETasks) || 
                                   tasks.title.includes(searchETasks));
        mostrarTasks(tasksNew);
    })
}

mostrarTasks(tasks);