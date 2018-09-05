'use strict';

let list = document.getElementById('listLi'),
    title = document.getElementById('actionTitle'),
    newItemBtn = document.getElementById('newAction'),
    maximum = document.getElementById('maximum'),
    maxItems = 10;

//disabled newItemBtn if input empty
title.oninput = function () {
    if (title.value) {
        newItemBtn.removeAttribute('disabled');
    } else {
        newItemBtn.setAttribute('disabled', 'true');
    }
}

//Add new item
function addNewItem() {
    let item = document.createElement('li');
    let checkBtn = document.createElement('button');
    let removeBtn = document.createElement('button');
    let span = document.createElement('span');
    let checkIcon = document.createElement('i');
    let deleteIcon = document.createElement('i');

    item.classList.add('li');
    item.setAttribute('draggable', 'true');
    removeBtn.classList.add('remove');
    checkIcon.classList.add('material-icons', 'uncheck');
    deleteIcon.classList.add('material-icons', 'delete');
    checkIcon.innerHTML = 'check_box_outline_blank';
    deleteIcon.innerHTML = 'delete';
    span.innerHTML = title.value;

    checkBtn.appendChild(checkIcon);
    removeBtn.appendChild(deleteIcon);

    item.appendChild(checkBtn);
    item.appendChild(span);
    item.appendChild(removeBtn);
    list.appendChild(item);
    title.value = '';
    maxItem();
    newItemBtn.setAttribute('disabled', 'true');
}

//Inspect count of items
function maxItem() {
    let itemList = document.getElementsByTagName('li');

    if (itemList.length === maxItems) {
        maximum.classList.remove('display-none');
        title.setAttribute('disabled', 'true');
    } else {
        maximum.classList.add('display-none');
        title.removeAttribute('disabled');
    }
}

//Delete element
function delItem(e) {
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
    maxItem();
}

//Draggable functions //magic
let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl !== this) {
        this.parentNode.removeChild(dragSrcEl);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        let dropElem = this.previousSibling;
        addDnDHandlers(dropElem);

    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('over');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

}

//function for delegate 'click' events for new items
function panelFunction(innerPanel) {
    if (innerPanel.target.classList.contains('uncheck')) {
        innerPanel.target.innerHTML = 'check_box';
    } else if (innerPanel.target.classList.contains('delete')) {
        delItem(innerPanel.target);
    }
}

//function for delegate 'mousedown' events for new items
function panelFunction2(innerPanel) {
    if (event.target.className === 'li') {
        let cols = document.querySelectorAll('#listLi .li');
        [].forEach.call(cols, addDnDHandlers);
    }
}

window.addEventListener('click', panelFunction);
list.addEventListener('mousedown', panelFunction2);
newItemBtn.addEventListener('click', addNewItem);
