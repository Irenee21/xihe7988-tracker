const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener('submit', function(event){
  event.preventDefault();

  console.log(form.elements);
  addTask(form.elements.taskName.value,
         form.elements.taskType.value,
         form.elements.taskRate.value,
         form.elements.taskTime.value,
         form.elements.taskClient.value)
})

var taskList = [];

function addList(name,type,rate,time,client){
  let task = {
  name: name,
  type:type,
  id: Date.now(),
  date: new Date().toISOString(),
  rate:rate,
  time:time,
  client:client,
}
  
  taskList.push(task)
}

addList("Home page design","Wireframe Design",50,3,"Firefox")
  

