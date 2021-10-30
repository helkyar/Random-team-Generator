/**
 * KNOWN ISSUES
 * ->Shuffle on start
 * ->Interrogants equals nºplayers
 * ->Generate other distributions (bulk, uniform, Nº Teams)
 * ->Double click to edit member
 * 
 * (~v)->dinamic color team change (good but make it better)
 * (~v)->Interrogansts move 
 * 
 * ->Clear modal: cat that eats the screen

 */

let body = document.querySelector('body');
const retrieve = document.querySelector('header strong');

let addButton = document.querySelector('.add');
let teamSize = document.querySelector('#size');
let nameInput = document.querySelector('#name');

let members = document.querySelector('.inf-memb');
let infTeams = document.querySelector('.inf-teams');
const start = document.querySelector('.start');
const clear = document.querySelector('.clear');
const save = document.querySelector('.save');
let saveMsg = document.querySelector('.saved');

let memberList = document.querySelector('.list');
let team = document.querySelector('.teams-wraper');

let membersNames = [];
let teamDivs = [];
let savedTeams;

getLocalStorage();
// -------------------------------------------
addButton.addEventListener('click', addMember);
memberList.addEventListener('click', removeMemb);
teamSize.addEventListener('input', addMockTeam);

start.addEventListener('click', generateTeams);
clear.addEventListener('click', clearAll);
save.addEventListener('click', saveToStorage);
retrieve.addEventListener('click', getLocalStorage);
// ======================================================

function getLocalStorage() {
  let m = localStorage.getItem('members');

  if (m != null && m != ' ') {
    let t = localStorage.getItem('teams');
    let nT = localStorage.getItem('numbTeams');
    let nM = localStorage.getItem('numbMembers');
    membersNames = localStorage.getItem('membersNames').split(',');

    memberList.innerHTML = m;
    membersNames[0].trim() ? membersNames : (membersNames = []);
    t == '' ? addMockTeam() : (team.innerHTML = t);
    infoUpdate(nT, nM);
  }
}

function addMember(e) {
  e.preventDefault();

  if (nameInput.value.trim() != '') {
    memberList.innerHTML = '';
    membersNames.push(nameInput.value);

    for (let member of membersNames) {
      memberList.innerHTML += `<p class="member">
      <img src="img/trash.svg" alt="delete" />${member}</p>`;
    }

    nameInput.value = '';
    addMockTeam(); // Actualizar al meter los miembros UE
  }
}

function removeMemb(e) {
  let paragraf = e.target.parentElement;

  if (e.target.tagName == 'IMG') {
    paragraf.remove();
    for (let i = 0; i < membersNames.length; i++) {
      if (membersNames[i].trim() == paragraf.innerText.trim()) {
        membersNames.splice(i, 1);
        break;
      }
    }
    addMockTeam(); //calls mock team deleting created teams
  }
}

function addMockTeam() {
  let size = 2;
  teamDivs = [];
  let extraMemb = membersNames.length % size;

  teamSize.value > 2 ? (size = teamSize.value) : '';
  teamSize.value = size; //show it to the user

  let teamNum = Math.ceil(membersNames.length / size);

  if ((extraMemb != 1 || extraMemb <= teamNum - 1) && extraMemb != 0) {
    teamNum--;
  }

  for (let i = 0; i < teamNum; i++) {
    teamDivs.push(`<article class="team" style="border: 2px solid 
    #${112141 + 400 * i}; background-color: #${112141 + 400 * i};"> 
    <h4 class="tick"><strong>???</strong></h4>
    <div class="team-member-list">
    <p class="tick"><strong>???</strong></p>
    </div></article><div></div>`);
  }
  team.innerHTML = teamDivs.join('');

  infoUpdate(teamNum);
}

function generateTeams() {
  let teamRand;
  let teamNames = pickTeamArray();
  if (teamNames) {
    teamRand = randomArr(teamDivs.length, teamNames.length);
  }
  let random = randomArr(membersNames.length, membersNames.length);
  let teamNumb = teamDivs.length;
  team.innerHTML = '';

  for (let a = 0; a < membersNames.length; a++) {
    if (Math.floor(a / teamNumb) == 0) {
      team.innerHTML += `<article class="team" 
      style="border: 2px solid #${112141 + random[a] * (a + 10)}; 
      background-color: #${112141 + random[a] * (a + 10)};">
      <h4>${teamNames ? teamNames[teamRand[a]] : 'Team ' + (a + 1)}</h4>
      <div class="team-member-list">
      <p class="team-member">${membersNames[random[a]]}</p></div></article>`;
    } else {
      let teamMemberList = document.querySelectorAll('.team-member-list');
      teamMemberList[a % teamNumb].innerHTML += `<p class="team-member"> 
                                                ${membersNames[random[a]]}</p>`;
    }
    savedTeams = team.innerHTML;
  }

  let teamMember = document.querySelectorAll('.team-member');
  initializeDrag(teamMember);
}

function clearAll() {
  membersNames = [];
  team.innerHTML = '';
  memberList.innerHTML = '';
}

function saveToStorage() {
  saveMsg.classList.add('show');
  setTimeout(() => {
    saveMsg.classList.remove('show');
  }, 1200);

  let savedMembers = ' ';
  for (let member of membersNames) {
    savedMembers += `<p class="member">
      <img src="img/trash.svg" alt="delete" />${member}</p>`;
  }
  console.log(savedTeams);
  localStorage.setItem('teams', savedTeams ? savedTeams : '');
  localStorage.setItem('members', savedMembers);
  localStorage.setItem('numbTeams', teamDivs.length); //
  localStorage.setItem('numbMembers', membersNames.length);
  localStorage.setItem('membersNames', membersNames);
}
// HELPERS --------------------------------------------

function infoUpdate(teamNum, membNum = membersNames.length) {
  members.innerText = `Memb.: ${membNum}`;
  infTeams.innerHTML = `Teams: ${teamNum}`;
}

function randomArr(arrLength, arrMax) {
  let random = [];
  while (random.length < arrLength) {
    let number = Math.floor(Math.random() * arrMax);
    if (!random.includes(number)) {
      random.push(number);
    }
  }
  return random;
}

function pickTeamArray() {
  let namesArr = document.querySelector('#teams-name');
  let finalArr = [];
  if (namesArr.value == 'element') {
    finalArr = elements;
  } else if (namesArr.value == 'animal') {
    finalArr = animals;
  } else if (namesArr.value == 'heroes') {
    finalArr = heroes;
  } else if (namesArr.value == 'villains') {
    finalArr = villains;
  } else {
    finalArr = null;
  }
  return finalArr;
}

// DRAG & DROP ======================================================
let drag = false;
let selected;
let selY;
let selX;

function initializeDrag(teamMember) {
  for (let i = 0; i < teamMember.length; i++) {
    teamMember[i].addEventListener('mousedown', move);
    teamMember[i].addEventListener('mouseup', remove);
  }
}

document.addEventListener('mouseup', removeDoc);

function move(e) {
  if (e.target.classList.contains('team-member')) {
    drag = true;
    selected = e.target;
    selY = e.clientY - 30;
    selX = e.clientX;
    body.classList.add('unselectable');
    document.addEventListener('mousemove', mousemove, true);
  }
}

function mousemove(e) {
  let axisX = e.clientX - selX;
  let axisY = e.clientY - selY;
  selected.style.transform = `translateY(${axisY}px) translateX(${axisX}px)`;
  selected.style.border = 'solid 0.5px #000';
  selected.style.position = 'sticky';
}

function remove(e) {
  if (e.target.classList.contains('team-member')) {
    let draged = selected.innerHTML;
    selected.innerHTML = e.target.innerHTML;
    e.target.innerHTML = draged;

    removeDoc();
  }
}

function removeDoc() {
  document.removeEventListener('mousemove', mousemove, true);

  //avoid console error
  if (selected) {
    selected.style.transform = `translateY(0px) translateX(-0.5px)`;
    selected.style.border = 'none';
    selected.style.position = 'inherit';
    selected = '';
  }

  body.classList.remove('unselectable');
  drag = false;
}
