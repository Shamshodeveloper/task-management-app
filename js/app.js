const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const filterBtns = document.querySelectorAll(".filter");
const emptyState = document.querySelector(".empty-state");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks(getFilteredTasks());

addBtn.addEventListener("click", () => {
    const value = taskInput.value.trim();

    if (value === "") {
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
    saveAndRender();
});

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(getFilteredTasks());
}

function renderTasks(list) {
    taskList.innerHTML = "";

    if (list.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    list.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <button class="toggle">${task.completed ? "✔️" : "⭕"}</button>
            <span>${task.title}</span>
            <div class="actions">
                <button class="edit">🖋️</button>
                <button class="delete">🗑️</button>
            </div>
        `;

        // DELETE
        li.querySelector(".delete").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveAndRender();
        });

        // EDIT
        li.querySelector(".edit").addEventListener("click", () => {
            const newTitle = prompt("Taskni tahrirlang", task.title);
            if (newTitle && newTitle.trim() !== "") {
                task.title = newTitle.trim();
                saveAndRender();
            }
        });

        // TOGGLE COMPLETE
        li.querySelector(".toggle").addEventListener("click", () => {
            task.completed = !task.completed;
            saveAndRender();
        });

        taskList.appendChild(li);
    });
}

// FILTER BUTTONS
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderTasks(getFilteredTasks());
    });
});

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(t => !t.completed);
    }
    if (currentFilter === "completed") {
        return tasks.filter(t => t.completed);
    }
    return tasks;
}
