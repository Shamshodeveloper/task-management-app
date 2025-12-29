const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const filterBtns = document.querySelectorAll(".filter");
const emptyState = document.querySelector(".empty-state")
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks(tasks);
addBtn.addEventListener("click", () => {
    const value = taskInput.value.trim();
    if(value === ""){
        alert("Task bo'sh bo'lishi mumkin emas!");
        return;
    }
    const newTask = {
        id: Date.now(), 
        title: value,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    saveAndRender()
})
function saveAndRender(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks)
}
function renderTasks(list){
    taskList.innerHTML = "";
    if(list.length === 0){
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");
    list.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
        <span>${task.title}</span>
        <button class="edit"> 🖋️ </button>
        <button class="delete"> 🗑️ </button>
        <button class="toggle">${task.completed ? "Undo" : "Done"} </button
        `
        li.querySelector('.delete').addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveAndRender(); 
        });
        li.querySelector('.edit').addEventListener("click", () => {
            const newTitle = prompt("Taskni tahrirlang", task.title);
            if(newTitle !== null && newTitle.trim() !== ""){
                task.title = newTitle.trim();
                saveAndRender();
            }
        });
        li.querySelector(".toggle").addEventListener("click", () => {
            task.completed != task.completed;
            saveAndRender();
        })
         
        taskList.appendChild(li)
    });
   
}
