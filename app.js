'use strict';

const getData = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setData = (dataBase) => localStorage.setItem ('todoList', JSON.stringify(dataBase));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type = "checkbox"${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value = "X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const refreshScreen = () => {
    cleanTasks();
    const dataBase = getData();
    dataBase.forEach ( (item, index) => createItem (item.task, item.status, index));
}

const addItem = (event) => {
    const keyprint = event.key;
    const text = event.target.value;
    if (keyprint === 'Enter'){
        const dataBase = getData();
        dataBase.push ({'task': text, 'status': ''});
        setData(dataBase);
        refreshScreen();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    const dataBase = getData ();
    dataBase.splice (index, 1);
    setData(dataBase);
    refreshScreen();
}
const refreshItem = (index) => {
    const dataBase = getData();
    dataBase[index].status = dataBase[index].status === '' ? 'checked' : '';
    setData(dataBase);
    refreshScreen();
}
const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button'){
        const index = element.dataset.index
        removeItem (index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index
        refreshItem (index);
    }
}

document.getElementById('newItem').addEventListener('keypress',addItem);
document.getElementById('todoList').addEventListener('click', clickItem);

refreshScreen();