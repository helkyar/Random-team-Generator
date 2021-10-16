// Local storage
// Establecer máxima diferencia entre equipos (1 partc, 2, etc.) [Default 1]
// Arrastar para cambiar de equipo (move whith css, if(ok){change innerText}, finish animation returning to original pos)

const add = document.querySelector('.add');
const create = document.querySelector('.create');

let input = document.querySelector('#name');
let size = document.querySelector('#size');
let players = document.querySelector('.participants');
let teams = document.querySelector('.team');

add.addEventListener('click', (e) => addToList(e));
create.addEventListener('click', createTeam);

function addToList(e) {
  e.preventDefault();
  if (input.value) {
    players.innerHTML += `<p class="partc-name"><button>
    <img src="img/trash.png" alt="" /></button>${input.value} </p>`;
    input.value = '';
    infoUpdate();
  }
}

function createTeam() {
  let playerList = document.querySelectorAll('.partc-name');
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
  let finalsize = parseInt(size.value) || 2;
  for (let j = 0; j < playerList.length; ) {
    let team = `<strong>Team${j + a - finalsize * a++}</strong>`;
    for (let i = 0; i < finalsize; i++) {
      if (j == playerList.length) break;
      team += `<p>${playerList[random[j++]].innerText}</p>`;
    }
    teams.innerHTML += `<div class="team-div">${team}</div>`;
  }
}

// Extras----------------------------------------
const clear = document.querySelector('.clear');
let infMemb = document.querySelector('.inf-memb');
let infTeam = document.querySelector('.inf-teams');

clear.addEventListener('click', empty);
size.addEventListener('input', infoUpdate);
players.addEventListener('click', (e) => remove(e));

function empty() {
  playerList = [];
  players.innerHTML = '';
  teams.innerHTML = '';
}

function infoUpdate() {
  let realSize = size.value || 2;
  infMemb.innerText = `Memb.: ${playerList.length}`;
  infTeam.innerText = `Teams: ${Math.ceil(playerList.length / realSize)}`;
}

function remove(e) {
  if (e.target.tagName == 'BUTTON') {
    e.target.parentElement.remove();
  } else if (e.target.tagName == 'IMG') {
    e.target.parentElement.parentElement.remove();
  }
}
