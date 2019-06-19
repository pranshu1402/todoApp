let notesCount = 0;
let completedTasks = 0;

function createNote(text){
    var note = document.createElement("div");
    note.className = 'task';
    note.id = 'task' + notesCount;

    var tick = document.createElement("div");
    tick.className = "tickContainer";

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "tick" + notesCount;
    checkBox.className = "tick";
    checkBox.addEventListener('change', isTaskCompleted);
    tick.appendChild(checkBox);
    
    var checkBoxLabel = document.createElement("label");
    checkBoxLabel.setAttribute('for',"tick"+ notesCount);
    checkBoxLabel.className = "tickLabel";
    
    tick.appendChild(checkBoxLabel);

    note.appendChild(tick);

    var taskDescription = document.createElement("p");
    taskDescription.innerHTML = text;
    taskDescription.className = "taskDesc";
    note.appendChild(taskDescription);

    var closeButton = document.createElement("button");
    closeButton.innerHTML = 'x';
    closeButton.className = 'closeBtn';
    closeButton.addEventListener('click', function(event){
        var parent = event.target.parentNode;
        parent.remove();  
        document.getElementById(parent.id.slice(4)).remove();
        refreshDisplay();
    });
    note.appendChild(closeButton);
    return note;
}

function getTasks(){
    return document.getElementsByClassName('task');
}

function countTasks(){
    return getTasks().length;
}

function countUnfinished(){
    var tasks = getTasks();
    var count= 0;

    [...tasks].forEach((task) => {
        if(!task.firstChild.firstChild.checked){
            count++;
        }
    });

    return count;
}

function countFinished(){
    var tasks = getTasks();
    var count= 0;

    [...tasks].forEach((task) => {
        if(task.firstChild.firstChild.checked){
            count++;
        }
    });

    return count;
}

function displayItemCount(){
    var items = document.getElementById('items');
    items.innerHTML = countUnfinished();
}

function displayClearBtn(){
    if(completedTasks==0){
        document.getElementById("clear").style.display = 'none';
    }else{
        var clear = document.getElementById("clear")
        clear.innerHTML = 'Clear Completed[' + completedTasks + ']';
        clear.style.display = 'inline';
    }
}

function refreshDisplay(){
    displayClearBtn();
    displayItemCount();
}

function isTaskCompleted(event){
    if(event.target.checked){
        strikeText(event.target.parentNode.parentNode.children);
    }else{
        unstrikeText(event.target.parentNode.parentNode.children);
    }
    displayItemCount();
    displayClearBtn();
}

function unstrikeText(taskNode){
    taskNode[0].firstChild.checked = false;
    taskNode[1].style.color = '#000';
    taskNode[1].style.textDecoration = 'none';
    completedTasks--;
}

function strikeText(taskNode){
    if(!taskNode[0].firstChild.checked){
        taskNode[0].firstChild.checked = true;
    }
    taskNode[1].style.color = '#777';
    taskNode[1].style.textDecoration = 'line-through';
    completedTasks++;
}

// create a note when user press enter inside input area.
document.getElementById("enterTask").addEventListener("keypress", function (event) {
    // check if enter key is pressed inside input button
    if (event.keyCode === 13) {
        //create a note and reset input box
        var note = createNote(event.target.value);
        event.target.value = "";

        //find tasks node and append the new task in the list.
        var tasks = document.getElementsByClassName('tasks')[0];
        tasks.appendChild(note);
        var lineBreak = document.createElement("hr");
        lineBreak.id = notesCount;

        tasks.appendChild(lineBreak);
        notesCount++;
        
        refreshDisplay();
    }
} );

document.getElementById("all").addEventListener('click', () => {
    var tasks = getTasks();
    [...tasks].forEach((task) => {
            task.style.display = '';
    });
});

document.getElementById("active").addEventListener('click', () => {
    var tasks = getTasks();
    
    [...tasks].forEach((task) => {
        if(task.firstChild.firstChild.checked){
            task.style.display = 'none';
        }else{
            task.style.display = '';
        }
    });

});

document.getElementById("completed").addEventListener('click', () => {
    var tasks = getTasks();

    [...tasks].forEach((task) => {
        if(task.firstChild.firstChild.checked){
            task.style.display = '';
        }else{
            task.style.display = 'none';
        }
    });
});

document.getElementById("clear").addEventListener('click', () => {
    var tasks = getTasks(); 
    var i = 0;
    [...tasks].forEach((task) => {
        if(task.children[0].children[0].checked){
            task.remove();
            document.getElementById(i).remove();
        }
        i++;
    });

    notesCount-= completedTasks;
    completedTasks = 0;
    refreshDisplay();
});

document.getElementById("selectAll").addEventListener('click', function(){
    var tasks = getTasks();
    
    if(completedTasks!=notesCount){
        // select all
        [...tasks].map(task=> (task.firstChild.firstChild.checked?"":strikeText(task.children)));
    }else{
        // deselect all when all notes were ticked and selectAll button is pressed
        [...tasks].map(task=> unstrikeText(task.children));
    }

    refreshDisplay();
});
