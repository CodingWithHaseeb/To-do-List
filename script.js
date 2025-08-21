const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todolist = document.getElementById('todolist');

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to-do list");
        return;
    }

    if (addBtn.value === "Edit" && editTodo) {
        // Update existing todo text
        let oldText = editTodo.target.previousElementSibling.innerHTML;
        let newText = inputText;
        editTodo.target.previousElementSibling.innerHTML = newText;

        editLocalTodos(oldText, newText);
        addBtn.value = "Add";
        inputBox.value = "";
        editTodo = null;

    } else {
        // Create new li
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Edit button
        const EditBtn = document.createElement("button");
        EditBtn.innerText = "Edit";
        EditBtn.classList.add("btn", "editbtn");
        li.appendChild(EditBtn);

        // Delete button
        const DeleteBtn = document.createElement("button");
        DeleteBtn.innerText = "Remove";
        DeleteBtn.classList.add("btn", "deletebtn");
        li.appendChild(DeleteBtn);

        // Add to list
        todolist.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
};

const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todolist.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
};

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

};

const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            // Edit button
            const EditBtn = document.createElement("button");
            EditBtn.innerText = "Edit";
            EditBtn.classList.add("btn", "editbtn");
            li.appendChild(EditBtn);

            // Delete button
            const DeleteBtn = document.createElement("button");
            DeleteBtn.innerText = "Remove";
            DeleteBtn.classList.add("btn", "deletebtn");
            li.appendChild(DeleteBtn);

            // Add to list
            todolist.appendChild(li);
        });
    }
}

const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

const editLocalTodos = (oldTodo, newTodo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(oldTodo);
    if (todoIndex > -1) {
        todos[todoIndex] = newTodo;
    }
    localStorage.setItem("todos", JSON.stringify(todos));

}

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener('click', addTodo);
todolist.addEventListener("click", updateTodo);
