//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //classList is used to manip class list
    //create DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); //making the new todo a child of todoDiv
    //check mark button
    const completedButton = document.createElement('button');
    //use innerHTML instead of innerText to add icons
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value after appending
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn') {
        //remove parent element of the trash button
        const todo = item.parentElement;
        todo.remove();
    }

    //check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}