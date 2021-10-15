const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");
const removeButton = document.getElementById("rem");
const markall = document.getElementById("completeAll");
const foot = document.getElementById("foot")
const itemsLeft = document.getElementById("itemsleft");
const all = document.getElementById("all");
const active = document.getElementById("active");
const comp = document.getElementById("comp");
const hidden = document.getElementById("hidden");
let itemCount = 0;
let showActive = false;
let showComp = false;

// Handles click of delete todo button. Runs delete function
todos.addEventListener("click", (e) => {
    crossHandle(e);
});

// Runs addNote-function to create label and checkboxes on submit from input
// If statement to prevent submitting empty input
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value != '') {
        addNote();
    }
    countingItems();
    countCompleted();
    allActOrComp();
});

// Function for removal of todo
function crossHandle(e) {
    if (e.target.className == 'cross')
        deleteTodo(e);
}

// Deletes todos and counts remaining todos
function deleteTodo(e) {
    let item = e.target.parentNode.parentNode;
    item.remove();
    isListEmpty();
    showMarkAllButton();
    countCompleted();
}

// Checks if list is empty to show or hide footer
function isListEmpty() {
    const a = document.getElementsByTagName("li");
    if (a.length = 0) {
        foot.style = "display: none";
        itemCount = 0;
    }
    countingItems();
}

// Deletes all items marked as completed
removeButton.onclick = () => {

    const a = document.getElementsByTagName("li");
    const b = document.getElementsByClassName("checkLiDiv");

    // Loops through all 'li' elements to find number of todos
    // 'checkLiDiv' element is removed to remove both checkbox and 'li' element
    for (let i = a.length - 1; i >= 0; i--) {
        if (a[i].classList.contains("completed")) {
            todos.removeChild(b[i]);
        }

    }
    isListEmpty();
    countingItems();
    countCompleted();
    showMarkAllButton();
};

// Mark all todos as completed
markall.onclick = () => {

    // Create counter and loop to count completed todos.
    let count = 0;
    const a = document.getElementsByClassName("checkmark");
    const b = document.getElementsByTagName("li");
    for (let i = 0; i < b.length; i++) {
        if (b[i].classList.contains('completed')) {
            count++;
        }
    }

    // To avoid double clicking markall-button if all todos are checked one by one on the checkboxes:
    // If at least one todo is not completed, complete all todos, else set all as not completed
    if (count < b.length) {
        for (let i = 0; i < b.length; i++) {
            b[i].classList = 'completed';
            a[i].checked = true;

        }
    } else {
        for (let i = 0; i < b.length; i++) {
            b[i].classList = 'notcomplete';
            a[i].checked = false;

            b[i].style.textDecoration = null;
            b[i].style.color = null;
        }
    }
    allActOrComp();
    countCompleted();
};

// Counts every item remaining. Function runs after removing or adding todos to update itemscount
function countingItems() {
    const a = document.getElementsByTagName("li");
    itemCount = a.length;
    if (itemCount == 1) {
        itemsLeft.textContent = itemCount + " item left";
    } else if (itemCount > 1) {
        itemsLeft.textContent = itemCount + " items left";
    } else {
        itemsLeft.textContent = '';
        foot.style = "display: none";

    }
}

// Counts if any todo is marked as completed. If so, makes 'Clear completed' button visible
function countCompleted() {
    const a = document.getElementsByTagName("li");
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (!a[i].classList.contains('completed')) {
            count++;
        }
    }
    if (count == 1) {
        itemsLeft.textContent = count + " item left";
    } else {
        itemsLeft.textContent = count + " items left";
    }

    if (count < itemCount) {
        removeButton.style.visibility = "visible";
    } else {
        removeButton.style.visibility = "hidden";
    }
}

// If there are todos in list, show 'mark all' button
function showMarkAllButton() {
    countingItems();
    if (itemCount > 0) {
        hidden.style.visibility = "visible";
    } else {
        hidden.style.visibility = "hidden";

    }
}

// Function to add todos and checkboxes
function addNote() {

    const todoText = input.value;

    // Create div and li
    const checkLiDiv = document.createElement("div");
    const todoEl = document.createElement("li");

    // Create ID for CSS and ClassName for loops in JavaScript
    checkLiDiv.id = "checkLiDiv";
    checkLiDiv.className = "checkLiDiv";

    // Create button for delete function
    const crossButton = document.createElement("button");
    crossButton.setAttribute("type", "button");
    crossButton.textContent = "❌";

    // Create label for every todo
    const createLabel = document.createElement("label");
    createLabel.textContent = todoText;

    // Create checkbox for every todo
    const box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    box.classList.toggle("checkmark");
    crossButton.classList.toggle("cross");

    // Toggle todo element to completed when clicking checkbox
    box.addEventListener("click", () => {
        todoEl.classList.toggle("completed");
        input.classList == "checked";
        allActOrComp();
        countCompleted();
    });

    // Append all children and clear input from searchbar
    todoEl.appendChild(createLabel);
    todoEl.appendChild(crossButton);
    checkLiDiv.appendChild(box);
    checkLiDiv.appendChild(todoEl);
    todos.appendChild(checkLiDiv);
    input.value = "";

    // Update all counters and show footer
    countingItems();
    countCompleted();
    showMarkAllButton();
    foot.style = "display: grid";
}

// Updates Active and Completed todo if a checkbox is clicked
// Uses booleans to know which button is currently active
function allActOrComp() {
    const a = document.getElementsByTagName("li");
    const b = document.getElementsByClassName("checkLiDiv");

    if (showActive) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].classList.contains('completed')) {
                b[i].style = "display: none";
            } else {
                b[i].style = "display: grid";
            }
        }
    } else if (showComp) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].classList.contains("completed")) {
                b[i].style = "display: grid";
            } else {
                b[i].style = "display: none";
            };
        }
    } else {
        for (let i = 0; i < a.length; i++)
            b[i].style = "display: grid";
    }
}

// Shows only active todos and shows border on active button
active.onclick = () => {
    const a = document.getElementsByTagName("li");
    const b = document.getElementsByClassName("checkLiDiv");

    active.style.borderColor = "rgb(233, 233, 233)";
    all.style.borderColor = "transparent";
    comp.style.borderColor = "transparent";

    for (let i = 0; i < a.length; i++) {
        if (a[i].classList.contains('completed')) {
            b[i].style = "display: none";
        } else {
            b[i].style = "display: grid";
        }
    }
    showActive = true;
    showComp = false;
};

// Shows all todos and shows border on all button
all.addEventListener("click", () => {
    const a = document.getElementsByTagName("li");
    const b = document.getElementsByClassName("checkLiDiv");

    all.style.borderColor = "rgb(233, 233, 233)";
    active.style.borderColor = "transparent";
    comp.style.borderColor = "transparent";

    for (let i = 0; i < a.length; i++) {
        b[i].style = "display: grid";
    }
    showActive = false;
    showComp = false;
});

// Shows only completed todos and shows border on completed button
comp.addEventListener("click", () => {
    const a = document.getElementsByTagName("li");
    const b = document.getElementsByClassName("checkLiDiv");

    comp.style.borderColor = "rgb(233, 233, 233)";
    active.style.borderColor = "transparent";
    all.style.borderColor = "transparent";

    for (let i = 0; i < a.length; i++) {
        if (a[i].classList.contains("completed")) {
            b[i].style = "display: grid";
        } else {
            b[i].style = "display: none";
        };
    }
    showComp = true;
    showActive = false;
});