let addTaskInput = document.querySelector(".addTaskInput");
let addTaskBtn = document.querySelector(".addTaskBtn");

// To show the todo tasks even page is reloaded
showTask()
addTaskBtn.addEventListener("click", function () {
    // Saving the value of input in local Storage
    // Before adding value in local Storage , first check that the local storage is empty or not
    let webStorage = localStorage.getItem("localTask");
    if (webStorage == null) {
        taskObj = []

    } else {
        taskObj = JSON.parse(webStorage);
    }

    let addTaskInputValue = addTaskInput.value;
    if (addTaskInputValue != 0) {
        taskObj.push(addTaskInputValue);
        localStorage.setItem("localTask", JSON.stringify(taskObj))
        showTask()
    }
})

// Creating task on the table list
function showTask() {
    let webStorage = localStorage.getItem("localTask");
    if (webStorage == null) {
        taskObj = [];
    } 
    else {
        taskObj = JSON.parse(webStorage);
    }
    let html = "";
    let taskTable = document.getElementById("taskTable");
    taskObj.forEach((item, index) => {
        html += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${item}</td>
        <td class="saveTaskBtn icons text-primary" onClick="editTask(${index})"><i class="text-primary bi bi-pencil-square"></i>Edit</td>
        <td class="icons text-danger" onClick = "editDelete(${index})"><i class="bi bi-trash"></i>Delete </td>
      </tr>`
    });
    taskTable.innerHTML = html
}

// Edit task from specific index and put to input box
function editTask(index) {
    let webStorage = localStorage.getItem("localTask");
    let editTaskInput = document.querySelector(".editTaskInput");
    editTaskInput.value = [index];
    taskObj = JSON.parse(webStorage);
    addTaskInput.value = taskObj[index];
    document.querySelector(".addTaskBtn").style.display = "none";
    document.querySelector(".editTaskBtn").classList.remove("d-none");
}

// Updating the task of specific index and put in local Storage
let editTaskBtn = document.querySelector(".editTaskBtn");
editTaskBtn.addEventListener("click", function () {
    let webStorage = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webStorage);
    let editTaskInput = document.querySelector(".editTaskInput").value;
    taskObj[editTaskInput] = addTaskInput.value;
    localStorage.setItem("localTask", JSON.stringify(taskObj))
    document.querySelector(".addTaskBtn").style.display = "inline-block";
    document.querySelector(".editTaskBtn").classList.add("d-none");
    addTaskInput.value = "";
    showTask()
})

// Delete the specific row 
function editDelete(index) {
    let webStorage = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webStorage);
    taskObj.splice(index, 1)
    localStorage.setItem("localTask", JSON.stringify(taskObj))
    showTask();
}

// Delete All 
let deleteAllBtn = document.querySelector(".deleteAllBtn");
deleteAllBtn.addEventListener("click", function () {
    let webStorage = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webStorage);
    taskObj = [];
    localStorage.setItem("localTask", JSON.stringify(taskObj))
    addTaskInput.value = "";
    showTask()
})


// Search Text Box
let searchBox = document.querySelector(".searchBox");
searchBox.addEventListener("input", () => {
    let tableList = document.querySelectorAll("tr");
    Array.from(tableList).forEach((item) => {
        let textIndex = item.getElementsByTagName("td")[0].innerText;
        let searchBoxValue = searchBox.value;
        let searchBoxValueReg = new RegExp(searchBoxValue, "gi")
        if (textIndex.match(searchBoxValueReg)) {
            item.style.display = "table-row"
        } else {
            item.style.display = "none"
        }
    })
})


