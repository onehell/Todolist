if (!JSON.parse(localStorage.getItem("data")) ) {
    localStorage.setItem("data", JSON.stringify([]))
 }
let newTaskField = document.getElementById("newTaskField")
let addButton = document.getElementById("addButton")
let activeList = document.getElementById("activeList")
let completedList = document.getElementById("completedList")
let wrapper = document.getElementById("wrapper")
let listItems = document.querySelectorAll('li');
function addToLocalStorage(taskValue, date, id, isCompleted) {
    const allTasks = JSON.parse(localStorage.getItem("data"))
    const listOfTasks = [...allTasks, {taskValue, date, id, isCompleted}];
    localStorage.setItem("data", JSON.stringify(listOfTasks));
};
function template(value, date) {
    let listItem = document.createElement("li");
    listItem.classList.add("listItem");
    let title = document.createElement("p");
    title.innerHTML = value;
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "delete";
    let dateField = document.createElement("span");
    dateField.innerHTML = date;
    listItem.append(title, checkbox, deleteButton, dateField );
    activeList.append(listItem);
};
function getTasks() {
    const allTasks = JSON.parse(localStorage.getItem("data"))
    allTasks.forEach(task => {
        template(task.taskValue, task.date)
        
    });
    
};
getTasks()

function addNewTask() {
    const inputValue = newTaskField.value;
    const dateValue = new Date();
    const minutes = dateValue.getMinutes();
    const hours = dateValue.getHours();
    const days = dateValue.getDate();
    const months = dateValue.getMonth() +1;
    const years = dateValue.getFullYear();
    const formattedDate = `${hours}:${minutes} ${days}/${months}/${years}`;
    const id = Date.now();
    addToLocalStorage(inputValue, formattedDate, id, false)
    template(inputValue, formattedDate)
};
addButton.addEventListener("click", addNewTask);

wrapper.onclick = function(event) {
    let target = event.target
    if (target.tagName != 'BUTTON') return;
    target.closest(".listItem").remove();
    let taskDescription = target.previousSibling.previousSibling.innerHTML;
    let storageData = JSON.parse(localStorage.getItem("data"))
    const filteredData = storageData.filter((task) => 
        task.taskValue !== taskDescription
    )
    localStorage.setItem("data", JSON.stringify(filteredData))
};

function onChangeTaskType(event, listType) {
    let target = event.target;
    if (target.tagName != 'INPUT') return;
    let item = target.closest(".listItem");
    target.closest(".listItem").remove();
    if (listType === "active") {
        completedList.append(item);
    } else if (listType === "completed") {
        activeList.append(item);
    }
};

activeList.addEventListener("click", (event) => onChangeTaskType(event, "active"));
completedList.addEventListener("click", (event) => onChangeTaskType(event, "completed"));
