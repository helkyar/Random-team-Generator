// Local storage
const add = document.querySelector('.add');
const create = document.querySelector('.create');

let input = document.querySelector('#name');
let size = document.querySelector('#size');
let players = document.querySelector('.participants');
let teams = document.querySelector('.team');
let playerList;

// ----------------------------------------------------------------
const clear = document.querySelector('.clear');
const distribution = document.querySelector('.distribution');
let infMemb = document.querySelector('.inf-memb');
let infTeam = document.querySelector('.inf-teams');
let uniform = true;
let drag = false;
// ----------------------------------------------------------------

let t = localStorage.getItem('teams');
let m = localStorage.getItem('members');
if (m && t) {
  players.innerHTML = m;
  teams.innerHTML = t;
  playerList = document.querySelectorAll('.partc-name');
  infoUpdate(playerList.length);
}

add.addEventListener('click', (e) => addToList(e));
create.addEventListener('click', () =>
  uniform ? uniformTeams() : createTeam()
);

function addToList(e) {
  e.preventDefault();
  if (input.value) {
    players.innerHTML += `<p class="partc-name"><button>
    <img src="img/trash.png" alt="" /></button>${input.value} </p>`;
    input.value = '';
  }
  playerList = document.querySelectorAll('.partc-name');
  infoUpdate(playerList.length);
}

function createTeam() {
  teams.innerHTML = '';
  playerList = document.querySelectorAll('.partc-name');
  let random = [];
  let number = 0;
  while (random.length < playerList.length) {
    do {
      number = Math.floor(Math.random() * playerList.length);
    } while (random.includes(number));
    random.push(number);
  }

  let a = 0;
  let finalsize = parseInt(size.value) || 2;
  for (let j = 0; j < playerList.length; ) {
    let team = `<strong>Team${j + a - finalsize * a++}</strong>`;
    for (let i = 0; i < finalsize; i++) {
      if (j == playerList.length) break;
      team += `<p class="member">${playerList[random[j++]].innerText}</p>`;
    }
    teams.innerHTML += `<div class="team-div">${team}</div>`;
  }
  localStorage.setItem('teams', teams.innerHTML);
  localStorage.setItem('members', players.innerHTML);
}

// ============================================================================================
// Extras
// ============================================================================================
clear.addEventListener('click', empty);
size.addEventListener('input', (e) => addToList(e)); // calling infoUpdate through addToList to update playerList (number of players)
players.addEventListener('click', (e) => remove(e));
distribution.addEventListener('click', changeDist);
teams.addEventListener('click', (e) => changeMember(e));

function empty() {
  players.innerHTML = '';
  teams.innerHTML = '';
}

function infoUpdate(members) {
  let realSize = parseInt(size.value) || 2;
  infMemb.innerText = `Memb.: ${members}`;
  infTeam.innerText = `Teams: ${Math.ceil(members / realSize)}`;
}

function remove(e) {
  if (e.target.tagName == 'BUTTON') {
    e.target.parentElement.remove();
  } else if (e.target.tagName == 'IMG') {
    e.target.parentElement.parentElement.remove();
  }
}

function uniformTeams() {
  let array = [];
  playerList = document.querySelectorAll('.partc-name');
  let finalsize = size.value || 2;
  let numberT = Math.ceil(playerList.length / finalsize);
  for (let j = 0; j < numberT; j++) {
    array.push([]);
  }

  let i = 0;
  let j = 0;
  for (let a = 0; a < playerList.length; i++) {
    if (i == array.length) {
      i = 0;
      j++;
    }
    array[i][j] = playerList[a++].innerText;
  }

  teams.innerHTML = '';
  let random = [];
  let number = 0;
  while (random.length < playerList.length) {
    do {
      number = Math.floor(Math.random() * playerList.length);
    } while (random.includes(number));
    random.push(number);
  }

  let a = 0;
  let z = 0;
  for (let j = 0; j < playerList.length; ) {
    let team = `<strong>Team${j + a - finalsize * a++}</strong>`;

    for (let i = 0; i < array[z].length; i++) {
      if (j == playerList.length) break;
      team += `<p class="member">${playerList[random[j++]].innerText}</p>`;
    }
    teams.innerHTML += `<div class="team-div">${team}</div>`;
    z++;
  }
  localStorage.setItem('teams', teams.innerHTML);
  localStorage.setItem('members', players.innerHTML);
}

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
    let t = draged.innerText;
    draged.classList.remove('drag');
    draged.innerText = e.target.innerText;
    e.target.innerText = t;
  }
  localStorage.setItem('teams', teams.innerHTML);
}
