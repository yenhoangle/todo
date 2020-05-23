let todos;

//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
    //prevents form from submitting
    event.preventDefault();
    //classList is used to manip class list
    //create DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creates LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); //making the new todo a child of todoDiv
    //adds todo
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement("button");
    //use innerHTML instead of innerText to add icons
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value after appending
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //deletes todo
    if (item.classList[0] === "trash-btn") {
        //remove parent element of the trash button
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        //processes the drop down options for filterTodo
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"; //use flex to match css styling
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    storageCheck();
    //adds the todo into the array
    todos.push(todo);
    //saves the JSON of todos in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    storageCheck();
    todos.forEach(function (todo) {
        //creates DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //creates LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); //making the new todo a child of todoDiv

        //check mark button
        const completedButton = document.createElement("button");
        //use innerHTML instead of innerText to add icons
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //checks if todo is already present
    storageCheck();
    //grabs todo inner text (it's the first item in children array)
    const todoText = todo.children[0].innerText;
    //remove one item from the index chosen
    todos.splice(todos.indexOf(todoText), 1);
    //updates localStorage with the new todos
    localStorage.setItem('todos', JSON.stringify(todos));
}

function storageCheck() {
    //check if todo is already present
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //converts JSON into the object
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
