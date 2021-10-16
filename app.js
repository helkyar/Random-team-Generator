// elimar personas
// ?-> del equipo
// -> de la lista inicial

// Local storage
// Limpiar todo
// Establecer mínima diferencia entre equipos (1 partc, 2, etc.) [Default 1]
// Arrastar para cambiar de equipo
// Indicar Número de participantes
// Indicar número de equipos

const add = document.querySelector('.add');
const create = document.querySelector('.create');

let input = document.querySelector('#name');
let size = document.querySelector('#size');
let players = document.querySelector('.participants');
let teams = document.querySelector('.team');

let playerList = [];

add.addEventListener('click', (e) => addToList(e));
create.addEventListener('click', createTeam);

function addToList(e) {
  e.preventDefault();
  players.innerHTML += `<p class="partc-name">${input.value}</p>`;
  playerList.push(input.value);
  input.value = '';
  infoUpdate();
}

function createTeam() {
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
      team += `<p>${playerList[random[j++]]}</p>`;
    }
    teams.innerHTML += `<div class="team-div">${team}</div>`;
  }
}

// Extras----------------------------------------
const clear = document.querySelector('.clear');
let infMemb = document.querySelector('.inf-memb');
let infTeam = document.querySelector('.inf-teams');

clear.addEventListener('click', empty);
// size.addEventListener('change', infoUpdate);
size.addEventListener('input', infoUpdate);

function empty() {
  playerList = [];
  players.innerHTML = '';
}

function infoUpdate() {
  let realSize = size.value || 2;
  infMemb.innerText = `Memb.: ${playerList.length}`;
  infTeam.innerText = `Teams: ${Math.ceil(playerList.length / realSize)}`;
}
