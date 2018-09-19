/* eslint linebreak-style: ['error', 'windows'] */
/*eslint-disable*/

const forms = {
  getAllInfo: {form: document.querySelector('#getAllInfo')},
  findByID: {
    form: document.querySelector('#findByID'), 
    inputs: {
      userID: document.querySelector('#findByID input[name="userID"]'),
    },
  },
  addNewUser: {
    form: document.querySelector('#addNewUser'), 
    inputs: {
      userName: document.querySelector('#addNewUser input[name="username"]'), 
      userAge: document.querySelector('#addNewUser input[name="userage"]'),
    },
  },
  removeUser: {
    form: document.querySelector('#removeUser'),
    inputs: {
      userID: document.querySelector('#removeUser input[name="userID"]'),
    },
  },
  updateUser: {
    form: document.querySelector('#updateUser'),
    inputs: {
      userID: document.querySelector('#updateUser input[name="userID"]'),
      userName: document.querySelector('#updateUser input[name="username"]'), 
      userAge: document.querySelector('#updateUser input[name="userage"]'),
    },
  },
};

const spinner = document.querySelector('#spinner');


const outputField = document.querySelector('#outputField');

forms.getAllInfo.form.addEventListener('submit', handleGetAllInfoFormSubmit);
forms.findByID.form.addEventListener('submit', handleFindByIDFormSubmit);
forms.addNewUser.form.addEventListener('submit', handleAddNewUserFormSubmit);
forms.removeUser.form.addEventListener('submit', handleRemoveUserFormSubmit);
forms.updateUser.form.addEventListener('submit', handleUpdateUserFormSubmit);

function handleGetAllInfoFormSubmit(evt) {
  evt.preventDefault();
  addSpinner();
  getUsers().then(data => {
    removeSpinner();
    outputField.innerHTML = '<p class="output__text">Users info has been fetched</p>' + drawUserInfoTable(data);
  })
  .catch(error => {
    removeSpinner();
    outputField.innerHTML = `<p class="output__text">${error}</p>`;
  });
}

function handleFindByIDFormSubmit(evt) {
  evt.preventDefault();
  addSpinner();
  getUsers(forms.findByID.inputs.userID.value.trim())
  .then(data => {
    removeSpinner();
    outputField.innerHTML = '<p class="output__text">A single user info has been fetched</p>' + drawUserInfoTable(data);
  })
  .catch(error => {
    removeSpinner();
    outputField.innerHTML = `<p class="output__text">${error}</p>`;
  });
  forms.findByID.form.reset();
}

function handleAddNewUserFormSubmit(evt) {
  evt.preventDefault();
  addSpinner();
  addUser(forms.addNewUser.inputs.userName.value.trim(), forms.addNewUser.inputs.userAge.value.trim())
  .then(data => {
    removeSpinner();
    outputField.innerHTML = '<p class="output__text">A new user was created</p>' + drawUserInfoTable(data);
  })
  .catch(error => {
    removeSpinner();
    outputField.innerHTML = `<p class="output__text">${error}</p>`;
  });
  forms.addNewUser.form.reset();
}

function handleRemoveUserFormSubmit(evt) {
  evt.preventDefault();
  addSpinner();
  removeUser(forms.removeUser.inputs.userID.value.trim())
  .then(data => {
    removeSpinner();
    outputField.innerHTML = '<p class="output__text">User has been deleted</p>' + drawUserInfoTable(data);
  })
  .catch(error => {
    removeSpinner();
    outputField.innerHTML = `<p class="output__text">${error}</p>`;
  });
  forms.removeUser.form.reset();
}

function handleUpdateUserFormSubmit(evt) {
  evt.preventDefault();
  addSpinner();
  updateUser(forms.updateUser.inputs.userID.value.trim(), forms.updateUser.inputs.userName.value.trim(), forms.updateUser.inputs.userAge.value.trim())
  .then(data => {
    removeSpinner();
    outputField.innerHTML = '<p class="output__text">User info has been updated</p>' + drawUserInfoTable(data);
  })
  .catch(error => {
    removeSpinner();
    outputField.innerHTML = `<p class="output__text">${error}</p>`;
  });
  forms.updateUser.form.reset();
}


const apiUrl = 'https://test-users-api.herokuapp.com/users/';
//*****************************************************************************************//
function getUsers(id = '') {

  return window.fetch(apiUrl + id)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Bad response');
    })
    .then(data => {
      if (data.status === 200 || data.status === 201){
        return data.data;
      }
      throw new Error(`${data.status}: ${data.errors}:((((`);
    })
}
//****************************************************************************************//
function addUser(name, age) {
  return window.fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({name, age}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Impossible to create a new user');
  })
  .then(data => {
    if (data.status === 200 || data.status === 201){
      return data.data;
    }
    throw new Error(`${data.status}: ${data.errors}:((((`);
  })
}

//****************************************************************************************//
function removeUser(id) {
  return window.fetch(apiUrl + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    // console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Impossible to delete');
  })
  .then(data => {
    // console.log(data);
    if (data.status === 200 || data.status === 201){
      return data.data;
    }
    throw new Error(`${data.status}: ${data.errors}:((((`);
  })
  // .catch(error => {
  //   throw error;
  // });
}

//*********************************************************************************//

function updateUser(id, name, age) {
  return window.fetch(apiUrl + id, {
    method: 'PUT',
    body: JSON.stringify({id, name, age}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    // console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Impossible to delete');
  })
  .then(data => {
    // console.log(data);
    if (data.status === 200 || data.status === 201){
      return data.data;
    }
    throw new Error(`${data.status}: ${data.errors}:((((`);
  })
  // .catch(error => {
  //   throw error;
  // });
}



//*******************************************************************************//

function drawUserInfoTable(data) {

  //   if (data instanceof Error){
  //   return `<p class="output__text">${data}</p>`;
  // }
  const tableBeginning = `<table class="output__table"'>
    <thead>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>NAME</th>
        <th>AGE</th>
       </tr>
      <tbody>`;

  const tableEnd =  `</tbody>
    </table>`;

  let tableBody;
  if (Array.isArray(data)) { // array of users

    tableBody = data.reduce((acc, curr, idx) => {
      return (
        acc +
        `<tr><td>${idx + 1}</td>
                          <td>${ curr.id? curr.id: curr._id}</td>
                          <td>${curr.name}</td>
                          <td>${curr.age}</td></tr>`
      );
    }, '');
  } else { // single user
    tableBody = `<tr><td>${1}</td>
                 <td>${data.id? data.id: data._id}</td>
                 <td>${data.name}</td>
                 <td>${data.age}</td></tr>`
  }
  return tableBeginning + tableBody + tableEnd;
}

function addSpinner() {
  spinner.classList.add("spinner--shown");
}

function removeSpinner() {
  spinner.classList.remove("spinner--shown");
}
