let shoppingList = [];

const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const shoppingListElement = document.getElementById('shoppingList');
const deleteButton = document.getElementById('deleteButton');

// Add item to the list function
function addItem() {
    const item = itemInput.value.trim();
    if (item !== '') {
        shoppingList.push(item);
        saveList();
        renderList();
        itemInput.value = '';
    }
}

// Add function to render the list
function renderList() {
    // Delete the current list
    shoppingListElement.innerHTML = '';

// Iterate through the array and create list items
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;

// Click to mark item as purchased
        listItem.addEventListener('click', () => markPurchased(index));

// Double-click to edit item
        listItem.addEventListener('dblclick', () => editItem(index));

        shoppingListElement.appendChild(listItem);
    });
}

// Function to mark an item as purchased
function markPurchased(index) {
    const listItem = shoppingListElement.children[index];
    listItem.classList.toggle('purchased');
}

// Function to delete list
function deleteList() {
    shoppingList = [];
    saveList();
    renderList();
}

// Function to edit item
function editItem(index) {
    const newItem = prompt('Edit item:', shoppingList[index]);
    if (newItem !== null && newItem.trim() !== '') {
        shoppingList[index] = newItem.trim();
        saveList();
        renderList();
    }
}

// Function to save the list to local storage
function saveList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Load shopping list from local storage
window.onload = function() {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
        shoppingList = JSON.parse(storedList);
        renderList();
    }
};

// Attach event listeners to buttons
addButton.addEventListener('click', addItem);
deleteButton.addEventListener('click', deleteList);
renderList();
