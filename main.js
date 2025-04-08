
const app = document.getElementById("app");

const container = document.createElement("div");
container.id = "main";
container.classList.add("container");
app.append(container);

const header = document.createElement("h2");
header.textContent = "Basketball Game"
container.append(header);

const toDoList = document.createElement("ul");
toDoList.id = "todo-list";
toDoList.classList.add("list-group", "pt-3", "pb-2");
container.append(toDoList);

const toDoControls = document.createElement("div");
toDoControls.id = "todo-controls"
toDoControls.classList.add("input-group");
document.getElementById("todo-list").before(toDoControls);

const instructions = document.createElement("p");
instructions.textContent = "Instructions: Enter player name."
document.getElementById("todo-controls").before(instructions);

const label = document.createElement("p");
label.textContent = "Current Basketball Player"
document.getElementById("todo-list").before(label);

const input = document.createElement("input");
input.id = "text-todo";
input.classList.add("form-control");
document.getElementById("todo-controls").append(input);

const addPlayer = document.createElement("button");
addPlayer.id = "btn-todo";
addPlayer.classList.add("btn", "btn-primary");
addPlayer.textContent = "Add";
addPlayer.addEventListener("click", () => {
  let itemInput = document.getElementById('text-todo');
  let toDoList = document.getElementById('todo-list');

  let newItem = document.createElement('li');
  newItem.classList.add("list-group-item");
  newItem.textContent = " " + itemInput.value;

  addRemoveBtn(newItem)

  toDoList.append(newItem);
  itemInput.value = '';
})
document.getElementById("todo-controls").append(addPlayer);

const addRemoveBtn = (listItem) => {
  let removeBtn = document.createElement('button');
  removeBtn.addEventListener("click", () => {
    listItem.remove();
  })
}


const roster =  document.getElementById('players').getElementsByTagName('li');
const names = []


