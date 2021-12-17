const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all events
loadEventListeners();

// load all events
function loadEventListeners(){
    form.addEventListener('submit',addTask); 
//    clear tasks
    clearBtn.addEventListener("click",clearTasks)
    //filter tasks
    filter.addEventListener("keyup",filterTasks) 
    // dom event
    document.addEventListener("DOMcontentLoaded",getTasks)
}
// get tasks from ls
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    e.preventDefault();
}

const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(task));
   
    //  create link
    const link = document.createElement('a');
    link.className= 'delete-item secondary-content';
    link.innerHTML= '<i class="fa fa-remove"></i>';
   
    // append link to li
    li.appendChild(link);
    
    // append li to ul
    taskList.appendChild(li);
    
    const linkChild = link.parentElement;
    linkChild.addEventListener("click",function(){
        linkChild.remove();
    
    })

})
    // function addTask
function addTask(e){
    if(taskInput.value===''){
        alert("enter input")
    }
    
    // create li element
    else{
    const li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
   
    //  create link
    const link = document.createElement('a');
    link.className= 'delete-item secondary-content';
    link.innerHTML= '<i class="fa fa-remove"></i>';
   
    // append link to li
    li.appendChild(link);
    
    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value)

    
    const linkChild = link.firstChild;
    linkChild.addEventListener("click",function(){
    linkChild.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(linkChild.parentElement.parentElement);
    })
       
    }

    //clear input
    taskInput.value=''; 

    // prevent Default !IMPORTANT
    e.preventDefault(); 
}

 // remove tasks from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
    tasks=[];
    }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index){
    if(taskItem.textContent=== task){
    tasks.splice(index,1);
    }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
  
}

    // function ls storage
function storeTaskInLocalStorage(task){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks=JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
}

    // clearTasks function
function clearTasks(){
    taskList.innerHTML="";
    clearTasksFromLocalStorage();
}

    // filter task function
function filterTasks(e){
    const text= e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text)!= -1){
           task.style.display="block";
       }
       else{
           task.style.display="none"
       }
    })
}
// clear task from local storage

    function clearTasksFromLocalStorage(){
    localStorage.clear()
}

