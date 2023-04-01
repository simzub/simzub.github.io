const data = [
  {
    description: 'Buy unicorn food for my pet unicorn.',
    isChecked: true,
    deadline: '2023-04-05T12:00',
    addDate: '2023-03-20T12:00',
    completedDate: '2023-03-30T12:00',
  },
  {
    description: 'Attend a meeting with aliens from outer space.',
    isChecked: true,
    deadline: '2023-04-12T15:30',
    addDate: '2023-03-28T12:00',
    completedDate: '2023-03-31T12:00',
  },
  {
    description: 'Conquer the world (or at least part of it).',
    isChecked: false,
    deadline: '',
    addDate: '2023-03-24T12:00',
    completedDate: '',
  },
  {
    description: 'Train my dragon to breathe fire (safely).',
    isChecked: false,
    deadline: '2023-04-14T18:00',
    addDate: '2023-03-15T12:00',
    completedDate: '',
  },
  {
    description: 'Learn to speak dolphin language.',
    isChecked: false,
    deadline: '',
    addDate: '2023-03-21T12:00',
    completedDate: '',
  },
  {
    description: 'Organize a party for my imaginary friends.',
    isChecked: false,
    deadline: '2023-04-20T20:00',
    addDate: '2023-03-19T12:00',
    completedDate: '',
  },
];

sessionStorage.setItem('todoList', JSON.stringify(data));

let newData = [...JSON.parse(sessionStorage.getItem('todoList'))];

const todoList = document.getElementById('todo-list');
const textInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const submitButton = document.getElementById('submit-button');

const sortButtons = document.querySelectorAll('.sort-button');

let sortId = 'recently-added';
sortButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.sort-button.active').classList.remove('active');
    btn.classList.add('active');
    sortId = btn.id;
    showList(sortId);
  });
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (textInput.value) {
    newData.push({
      description: textInput.value,
      isChecked: false,
      deadline: dateInput.value,
      addDate: new Date(),
    });
    sessionStorage.setItem('todoList', JSON.stringify(newData));
    showList(sortId);
    textInput.value = '';
    dateInput.value = '';
  }
});

const showList = (sortId) => {
  newData = [...JSON.parse(sessionStorage.getItem('todoList'))];
  if (sortId === 'recently-added') {
    newData.sort((a, b) => {
      const dateA = new Date(a.addDate);
      const dateB = new Date(b.addDate);
      const now = new Date();

      const diffA = Math.abs(now - dateA);
      const diffB = Math.abs(now - dateB);

      return diffA - diffB;
    });
  }
  if (sortId === 'deadline') {
    newData.sort((a, b) => {
      const deadlineA = new Date(a.deadline).getTime();
      const deadlineB = new Date(b.deadline).getTime();

      // Sort objects with empty or invalid deadline after objects with valid deadlines
      if (isNaN(deadlineA)) {
        return 1;
      }
      if (isNaN(deadlineB)) {
        return -1;
      }

      const now = Date.now();
      const timeLeftA = deadlineA - now;
      const timeLeftB = deadlineB - now;

      // Sort by the time left till deadline
      return timeLeftA - timeLeftB;
    });
  }
  if (sortId === 'recently-completed') {
    newData.sort((a, b) => {
      if (a.completedDate && b.completedDate) {
        return new Date(b.completedDate) - new Date(a.completedDate);
      } else if (a.completedDate) {
        return -1;
      } else if (b.completedDate) {
        return 1;
      } else {
        return new Date(b.addDate) - new Date(a.addDate);
      }
    });
  }

  let mappedList = newData;
  if (sortId === 'recently-added' || sortId === 'deadline') {
    mappedList = newData.sort((a, b) =>
      a.isChecked === b.isChecked ? 0 : a.isChecked ? 1 : -1
    );
  }
  if (sortId === 'recently-completed') {
    mappedList = newData;
  }
  mappedList = newData
    .map((data, index) => {
      const start = new Date();
      const end = new Date(data.deadline);
      const diffMs = end - start; // difference in milliseconds
      const diffDays = Math.floor(diffMs / 86400000); // difference in days (86400000 milliseconds in a day)
      const diffHours = Math.floor((diffMs % 86400000) / 3600000); // difference in hours (3600000 milliseconds in an hour)
      const diffMinutes = Math.floor((diffMs % 3600000) / 60000); // difference in minutes (60000 milliseconds in a minute)

      let answer = `Time left: ${diffDays} days, ${diffHours} hours, and ${diffMinutes} minutes`;

      // if (sortId === 'recently-added') {

      return `<div key=${index} class="list-item">
                <input type="checkbox"  ${data.isChecked ? 'checked' : null}>
                <div class="list-item-text ${data.isChecked ? 'checked' : ''}">
                  <p class="list-p">${data.description}</p>
                  <p class="list-p"> ${data.deadline ? answer : ''}</p>
                </div>
                <button id="button-delete" class="button-delete">Delete</button/>
          </div>`;
    })
    .join('');

  todoList.innerHTML = mappedList;
  addListenersToCheckboxBtn();
  addClickListenersToDelBtn();
};

showList(sortId);

// MODAL

// Get the modal
const modal = document.getElementById('myModal');
const deleteConfirmBtn = document.getElementById('button-delete-confirm');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

let id;
function addClickListenersToDelBtn() {
  const buttons = document.querySelectorAll('.button-delete');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.style.display = 'block';
      id = button.parentNode.getAttribute('key');
    });
  });
}

function addListenersToCheckboxBtn() {
  const checkbox = document.querySelectorAll("input[type='checkbox']");
  checkbox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      // console.log('checkbox');
      id = checkbox.parentNode.getAttribute('key');
      if (newData[id].isChecked === false) {
        newData[id].completedDate = new Date();
      }
      if (newData[id].isChecked === true) {
        newData[id].completedDate = '';
      }
      newData[id].isChecked = !newData[id].isChecked;
      sessionStorage.setItem('todoList', JSON.stringify(newData));
      showList(sortId);
    });
  });
}

deleteConfirmBtn.addEventListener('click', (e) => {
  newData.splice(id, 1);
  sessionStorage.setItem('todoList', JSON.stringify(newData));
  modal.style.display = 'none';
  showList(sortId);
});
