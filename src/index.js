import './style.css';
// import checkElement from './modules/checkItem.js';
// import { electron } from 'webpack';

const listEl = document.querySelector('.list-section');
const inputBtn = document.querySelector('.enter-icon');
const userInput = document.querySelector('.user-input');

let todo = JSON.parse(localStorage.getItem('todo')) || [];

const renderTodoList = () => {
  let listItem = '';
  todo.forEach((element, index) => {
    const code = `
      <div class="list-item">
        <div>
          <input type="checkbox" class="check" id="item-${index}">
          <input type="text" class="edit-input" id="input-${index}" value="${element.description}">
        </div>
        <button class="reset-btn delete-btn" id="${index}">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="delete-icon">
            <path stroke-linecap="round" 
            stroke-linejoin="round" 
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    `;
    listItem += code;
  });
  listEl.innerHTML = listItem;

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = parseInt(button.id, 20);
      // eslint-disable-next-line no-use-before-define
      deleteItem(index);
    });
  });

  const editInputs = document.querySelectorAll('.edit-input');
  editInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const index = parseInt(input.id.split('-')[1], 10);
      const newDescription = input.value;
      // eslint-disable-next-line no-use-before-define
      updateDescription(index, newDescription);
    });
  });

  // check item
  const checkboxElements = document.querySelectorAll('.check');
  checkboxElements.forEach((element, index) => element.addEventListener('change', (e) => {
    if (e.target.checked) {
      element.nextElementSibling.style.textDecoration = 'line-through';
      todo[index].completed = true;
      localStorage.setItem('todo', JSON.stringify(todo));
    } else {
      element.nextElementSibling.style.textDecoration = 'none';
      todo[index].completed = false;
      localStorage.setItem('todo', JSON.stringify(todo));
    }
  }));
};

// delete Item
const deleteItem = (index) => {
  todo.splice(index, 1);
  todo.forEach((task, newIndex) => {
    task.index = newIndex + 1;
  });
  localStorage.setItem('todo', JSON.stringify(todo));
  renderTodoList();
};

const updateDescription = (index, newDescription) => {
  todo[index].description = newDescription;
  localStorage.setItem('todo', JSON.stringify(todo));
};

// ADD ITEM
const addItem = () => {
  if (userInput.value) {
    const list = {
      index: todo.length + 1,
      description: userInput.value,
      completed: false,
    };
    todo.push(list);
    userInput.value = '';
    localStorage.setItem('todo', JSON.stringify(todo));
    renderTodoList();
  }
};

inputBtn.addEventListener('click', addItem);
userInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    addItem();
  }
});

// RESET BUTTON
const resetStorage = () => {
  userInput.value = '';
  localStorage.clear();
  todo = [];
  listEl.innerHTML = '';
};
const resetBtn = document.querySelector('.reload-icon');
resetBtn.addEventListener('click', resetStorage);

// clear input field

const clearCompletedBtn = document.querySelector('#clear-completed-btn');
const trashCompleted = () => {
  const completed = todo.filter((obj) => obj.completed === true);
  completed.forEach((element) => {
    todo.splice(element.index - 1, 1);
    todo.forEach((item, i) => {
      item.index = i + 1;
    });
    localStorage.setItem('todo', JSON.stringify(todo));
  });
  renderTodoList();
};

clearCompletedBtn.addEventListener('click', () => {
  trashCompleted();
});
renderTodoList();