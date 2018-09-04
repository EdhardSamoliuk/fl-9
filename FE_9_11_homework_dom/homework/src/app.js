disableAddBtn(document.getElementById('action-input'));
document.getElementById('action-input').setAttribute('onkeyup','disableAddBtn(this)');

function checkedItem(aCheckbox) {
    aCheckbox.innerText = 'check_box';
}

function deleteItem(aItem) {
    aItem.parentNode.removeChild(aItem);
    maximumItem();
}

function disableAddBtn(aInput) {
    let addNewActionBtn = document.getElementById('new-action-icon');
    if (aInput.value === '') {
        addNewActionBtn.style.color = '#D3D3D3';
        addNewActionBtn.onclick = null;
    } else {
        addNewActionBtn.style.color = '#000';
        addNewActionBtn.setAttribute('onClick', 'addNewAction()');
    }
}

function maximumItem() {
    const actionListMaxLength = 10;
    let actionsListItems = document.getElementsByClassName('action-item');
    let newActionInput = document.getElementById('new-action-input');
    let newActionBtn = document.getElementById('new-action-btn');
    if(actionsListItems.length >= actionListMaxLength) {
        let newAction = document.getElementById('new-action');
        let maximumItemPerList = document.createElement('p');
        maximumItemPerList.id = 'maxText';
        maximumItemPerList.innerText = 'Maximum item per list are created';
        maximumItemPerList.style.display = 'block';
        maximumItemPerList.style.marginLeft = 'auto';
        maximumItemPerList.style.marginRight = 'auto';
        maximumItemPerList.style.color = 'red';
        newActionInput.style.display = 'none';
        newActionBtn.style.display = 'none';
        newAction.appendChild(maximumItemPerList);
    } else {
        newActionInput.style.display = 'flex';
        document.getElementById('action-input').value = '';
        newActionBtn.style.display = 'flex';
       //let maximumItemPerList = document.getElementById('maxText');
        if (document.getElementById('maxText') !== null){
            document.getElementById('maxText').style.display = 'none';
        }
    }
}

let moveItem = null;
function allowDropItem(ev) {
    ev.preventDefault();
}

function onDragEnter(ev){
    ev.preventDefault();
    ev.target.style.opacity = '0.5';
	}
	
function onDragLeave(ev){
    ev.target.style.opacity = '1';
	}

function dragItem(ev) {
    moveItem = ev.target;
}

function dropItem(ev) {
    ev.preventDefault();
    let listNode = document.getElementById('actions-list');
    let targeteIndex = 0;
    let moveItemIndex = 0;
    for (let i=0; i<listNode.childElementCount; i++){
        if (listNode.childNodes[i] === moveItem){
            moveItemIndex = i;
        }
        if (listNode.childNodes[i] === ev.target.parentNode){
            targeteIndex = i;
        }
    }
    if (moveItemIndex > targeteIndex){
        listNode.insertBefore(moveItem, ev.target.parentNode);
    } else
    if (moveItemIndex < targeteIndex){
        listNode.insertBefore(moveItem, ev.target.parentNode.nextSibling);
    } else
    if(ev.target.parentNode === listNode.lastChild) {
      listNode.appendChild(moveItem);
    }
    ev.target.style.opacity = '1';
}

function addNewAction() {
    let actionsListItems = document.getElementsByClassName('action-item');
    const actionListMaxLength = 10;
    if(actionsListItems.length === null || actionsListItems.length < actionListMaxLength) {
        let actionItem = document.createElement('div');
        actionItem.setAttribute('class','action-item');
        actionItem.setAttribute('id','action-item');
        actionItem.style.display = 'flex';
        actionItem.style.alignItems = 'center';
        actionItem.setAttribute('draggable','true'); 
        actionItem.setAttribute('ondragstart','dragItem(event)');
        actionItem.setAttribute('ondragover','allowDropItem(event)');
        actionItem.setAttribute('ondrop','dropItem(event)');
        actionItem.setAttribute('onDragEnter','onDragEnter(event)');
        actionItem.setAttribute('onDragLeave','onDragLeave(event)');
        
        let actionItemCheckbox = document.createElement('i');
        actionItemCheckbox.setAttribute('class','material-icons');
        actionItemCheckbox.innerText = 'check_box_outline_blank';
        actionItemCheckbox.style.flex = '5%';
        actionItemCheckbox.style.cursor = 'pointer';
        actionItemCheckbox.setAttribute('onClick','checkedItem(this)');
        actionItem.appendChild(actionItemCheckbox);
        
        let actionItemText = document.createElement('p');
        let inputText = document.getElementById('action-input').value;
        let itemText = document.createTextNode(inputText);
        actionItemText.appendChild(itemText);
        actionItem.appendChild(actionItemText);
        document.getElementById('action-input').value = '';
        disableAddBtn(document.getElementById('action-input'));
        actionItemText.style.flex = '90%';
        actionItemText.style.margin = '0';
        
        let actionItemDelete = document.createElement('i');
        actionItemDelete.setAttribute('class','material-icons');
        actionItemDelete.innerText = 'delete';
        actionItemDelete.style.cursor = 'pointer';
        actionItemDelete.setAttribute('onClick','deleteItem(parentNode)');
        actionItem.appendChild(actionItemDelete);
        actionItemDelete.style.flex = '5%';
        
        let actionsList = document.getElementById('actions-list');
        actionsList.appendChild(actionItem);
    } 
    maximumItem();
}
