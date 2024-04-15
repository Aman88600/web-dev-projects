// task button
let task_button = document.querySelector("#task_button")
let new_task = document.querySelector("#new_task")
let un_list = document.querySelector('#tasks')
// add task function
function add_task_function()
{
    console.log("Hello, New Task!");
    new_task.value
    let li = document.createElement('div')
    li.innerHTML = new_task.value
    if (new_task.value === "")
    {

    }
    else
    {
        un_list.appendChild(li)
    }
}

// checking if the button is geting clicked
task_button.addEventListener("click", add_task_function)
