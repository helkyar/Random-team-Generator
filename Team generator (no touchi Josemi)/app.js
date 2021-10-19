const add = document.querySelector('.add');
const create = document.querySelector('.create');
const clear = document.querySelector('.clear');
const distribution = document.querySelector('.distribution');

let input = document.querySelector('#name');
let size = document.querySelector('#size');
let membersDiv = document.querySelector('.participants');
let teamsDiv = document.querySelector('.team');
let members = document.querySelectorAll('.partc-name'); //declaring it is enought

// ----------------------------------------------------------------
let infMemb = document.querySelector('.inf-memb');
let infTeam = document.querySelector('.inf-teams');
let uniform = true;
let drag = false;
let sizeNow;

// ----------------------------------------------------------------
let t = localStorage.getItem('teams');
let m = localStorage.getItem('members');
if (m && t) {
  membersDiv.innerHTML = m;
  teamsDiv.innerHTML = t;
  infoUpdate();
}

// ----------------------------------------------------------------
add.addEventListener('click', (e) => addToList(e));
// 3rd Option: push last members into already generated teams if members<size && tunningCondition -> [members<=teams or (membres%teams)<(size/2) or ...]
create.addEventListener('click', () => (uniform ? uniformT() : bulkT()));
membersDiv.addEventListener('click', (e) => remove(e));
clear.addEventListener('click', empty);
size.addEventListener('input', infoUpdate);
distribution.addEventListener('click', changeDist);
teamsDiv.addEventListener('click', (e) => changeMember(e));

// ----------------------------------------------------------------
function addToList(e) {
  e.preventDefault();
  if (input.value) {
    membersDiv.innerHTML += `<p class="partc-name"><button class="remove">
    <img src="img/trash.png" alt="" /></button>${input.value} </p>`;
    input.value = '';
  }
  infoUpdate();
}

// ----------------------------------------------------------------
function bulkT() {
  let random = randomArr();

  let a = 0;
  for (let j = 0; j < members.length; a++) {
    let team = `<strong>Team${a}</strong>`;

    for (let i = 0; i < sizeNow; i++) {
      if (j == members.length) break;
      team += `<p class="member">${members[random[j++]].innerText}</p>`;
    }
    teamsDiv.innerHTML += `<div class="team-div">${team}</div>`;
  }
  localStorage.setItem('teams', teamsDiv.innerHTML);
  localStorage.setItem('members', membersDiv.innerHTML);
}

function uniformT() {
  let random = randomArr();
  let teamNumb = Math.ceil(members.length / sizeNow);

  for (let a = 0; a < members.length; a++) {
    if (Math.floor(a / teamNumb) == 0) {
      teamsDiv.innerHTML += `<div class='team-div'><strong>Team${a}</strong>
      <p class='member'>${members[random[a]].innerText}</p></div>`;
    } else {
      let team = document.querySelectorAll('.team-div');
      team[a % teamNumb].innerHTML += `<p class='member'>
      ${members[random[a]].innerText}</p>`;
    }
  }
  localStorage.setItem('teams', teamsDiv.innerHTML);
  localStorage.setItem('members', membersDiv.innerHTML);
}

function randomArr() {
  teamsDiv.innerHTML = '';
  let random = [];
  while (random.length < members.length) {
    let number = Math.floor(Math.random() * members.length);
    if (!random.includes(number)) {
      random.push(number);
    }
  }
  return random;
}

// ----------------------------------------------------------------
function remove(e) {
  if (e.target.tagName == 'BUTTON') {
    e.target.parentElement.remove();
  } else if (e.target.tagName == 'IMG') {
    e.target.parentElement.parentElement.remove();
  }
  infoUpdate();
}

function empty() {
  membersDiv.innerHTML = '';
  teamsDiv.innerHTML = '';
}

// ----------------------------------------------------------------
function infoUpdate() {
  sizeNow = parseInt(size.value) || 2;
  members = document.querySelectorAll('.partc-name');
  infMemb.innerText = `Memb.: ${members.length}`;
  infTeam.innerText = `Teams: ${Math.ceil(members.length / sizeNow)}`;
}

// ----------------------------------------------------------------
function changeDist() {
  uniform = !uniform;
  uniform
    ? (distribution.innerText = 'Uniform')
    : (distribution.innerText = 'Bulk');
}

function changeMember(e) {
  if (e.target.classList.contains('member') && !drag) {
    drag = true;
    e.target.classList.add('drag');
  } else if (e.target.classList.contains('member')) {
    drag = false;
    let draged = document.querySelector('.drag');
    draged.classList.remove('drag');
    let t = draged.innerText;
    draged.innerText = e.target.innerText;
    e.target.innerText = t;
  }
  localStorage.setItem('teams', teamsDiv.innerHTML);
}
