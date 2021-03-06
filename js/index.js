const add1 = document.querySelector('#submit');
const add2 = document.querySelector('#addTask');

let foundObject = '';
let groupStorageTasks = '';
let groupListArray = [];

let g = localStorage.getItem('Groups');
if (!g) {
  localStorage.setItem('Groups', '[]');
}
renderGroups()

function addGroup() {
  let groupInput = document.querySelector('#groupInput').value;
  let s = JSON.parse(localStorage.getItem('Groups'));
  s.push(groupInput);
  localStorage.setItem('Groups', JSON.stringify(s));
  localStorage.setItem(groupInput, '[]')
  renderGroups();
}

function renderGroups() {
  let groupList = document.querySelector('#groupList');
  let s = JSON.parse(localStorage.getItem('Groups'));
  groupList.innerHTML = null;
  for (let i in s) {
    groupList.innerHTML += `<br><li onclick='renderItemList("${s[i]}")' id="${s[i]}">${s[i]}</li>`;
  }
}

function renderItemList(id) {
  let itemList = document.querySelector('#itemList');
  let groupHeader = document.querySelector('#groupHeader');
  let s = JSON.parse(localStorage.getItem(id));
    itemList.innerHTML = null;
    groupHeader.innerHTML = `<h1>${id}</h1>`;
    for (let i in s) {
      itemList.innerHTML +=
      `<div class='listDiv' id='${s[i]}'>
        <li>
        <input class='checker' type='checkBox'>
        <h4>${s[i]}</h4>
        <button onclick=editTaskButton('${s[i]}') class='editButton'>Edit</button>
        <button onclick=deleteTaskButton('${s[i]}') class='deleteButton'>Delete</button>
        </li>
        <input class='taskEditInput' type='text'>
      </div>`
    }
}

function addItemsToList() {
  let newTaskInput = document.querySelector('#newTask').value;
  let id = document.querySelector('#groupHeader').innerText;
  let storage = JSON.parse(localStorage.getItem(id));
  storage.push(newTaskInput);
  localStorage.setItem(id, JSON.stringify(storage));
  renderItemList(id)
}

function deleteTaskButton(id) {
  let groupHeader = document.querySelector('#groupHeader').innerText;
  let g = JSON.parse(localStorage.getItem(groupHeader))
  let newStorage = g.filter(name => name != id)
  localStorage.setItem(groupHeader, JSON.stringify(newStorage));
  renderItemList(groupHeader)
}

function editTaskButton(id) {

}


// async function editTaskButton(id) {
//   let input = document.createElement('input');
//   document.getElementById(id).appendChild(input);
//   let button = document.createElement('button');
//   button.innerHTML = '👍'
//   document.getElementById(id).appendChild(button);

//   let updatedInfo = input.innerText;
//   button.addEventListener('click', console.log(updatedInfo));
// }

add1.addEventListener('click', addGroup);
add2.addEventListener('click', addItemsToList);