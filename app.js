//Array de tasks inicial
const defaultTasks=[
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
        isCompleted:true
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

const tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks; 


const addButton = document.getElementsByClassName("btn-submit")[0];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", addTasks);

//Funcion para añadir tasks
function addTasks(event){
        event.preventDefault();
        let titleAdd= document.getElementById("title").value;
        let descriptionAdd= document.getElementById("description").value;
        let tagsAdd=document.getElementById("tags").value;
        let dueDateAdd=document.getElementById("dueDate").value;
        let priorityAdd=document.getElementById("priority").value;

        tasks.push({id:tasks.length+1,
                    title: titleAdd,
                    description: descriptionAdd,
                    tags: tagsAdd.split(","),
                    dueDate: dueDateAdd,
                    priority:priorityAdd,
                    isCompleted:false
                });

        saveTasks();
        mostrarTasks(tasks);
}


//Funcion para mostrar tasks
function mostrarTasks(tasks){
    let list= document.getElementById("task-list-container");
    list.innerHTML = "";

    tasks.forEach(task => {
        let taskItem=document.createElement("div");
        taskItem.classList.add("task-item")
        if(task.isCompleted){
            taskItem.classList.add("completed");
        }
        let taskItemContent=document.createElement("div");
        taskItem.classList.add("task-item-content");

        let taskTitle=document.createElement("div");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = task.title;

        let taskDue=document.createElement("p");
        taskTitle.classList.add("task-due");
        taskDue.textContent = task.dueDate;

        let taskTags=document.createElement("div");
        task.tags.forEach(tag=>{
            let tagSpan=document.createElement("span");
            tagSpan.classList.add("tag-badge", `tag-${tag}`);
            tagSpan.textContent=tag;

            taskTags.appendChild(tagSpan);
        })

        let taskAction=document.createElement("div");
        taskAction.classList.add("task-actions");


        let buttonComplete= document.createElement("button");
        if(task.isCompleted){
            buttonComplete.classList.add("btn", "btn-secondary", "btn-sm");
            buttonComplete.textContent="Deshacer";
        }
        else{
            buttonComplete.classList.add("btn", "btn-success", "btn-sm");
            buttonComplete.textContent="Completar";
        }
        buttonComplete.onclick = () => completeTask(tasks[i].id);

        let buttonDelete= document.createElement("button");
        buttonDelete.textContent = "Eliminar";
        buttonDelete.onclick = () => deleteTask(tasks[i].id);

        taskAction.appendChild(buttonComplete);
        taskAction.appendChild(buttonDelete);

        taskItemContent.appendChild(taskTitle);
        taskItemContent.appendChild(taskDue);
        taskItemContent.appendChild(taskTags);

        taskItem.appendChild(taskItemContent);
        taskItem.appendChild(taskAction);

        list.appendChild(taskItem);
    });
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