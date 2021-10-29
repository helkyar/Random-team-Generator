/**
 * KNOWN ISSUES
 * -addmember animation aplias to all all the time
 */

let addButton = document.querySelector('.add');
let teamSize = document.querySelector('#size');
let nameInput = document.querySelector('#name');

let members = document.querySelector('.inf-memb');
let infTeams = document.querySelector('.inf-teams');

let memberList = document.querySelector('.list');

let team = document.querySelector('.teams-wraper');

let memberInit = [memberList.innerHTML]; //está vacío al principio
let teamInitial = team.innerHTML; //está vacío al principio

addButton.addEventListener('click', addMember);
memberList.addEventListener('click', removeMemb);
teamSize.addEventListener('input', addTeam);

// ======================================================
function addMember(e) {
  e.preventDefault();

  if (nameInput.value != '') {
    memberInit.push(`<p class="member">
      <img src="img/trash.svg" alt="delete" />${nameInput.value}</p>`);

    nameInput.value = '';
    memberList.innerHTML = memberInit.join('');

    addTeam(); // Actualizar al meter los miembros UE
  }
}

function removeMemb(e) {
  let paragraf = e.target.parentElement;
  if (e.target.tagName == 'IMG') {
    paragraf.remove();
  }
  memberInit = memberInit.filter((val) => {
    console.log(val, paragraf.innerText);
    console.log(val.includes(paragraf.innerText));
    return !val.includes(paragraf.innerText);
  });
  // remove from array, select player
  infoUpdate(10);
}

function addTeam() {
  let size = 2;
  let teamDivs = [];

  teamSize.value > 2 ? (size = teamSize.value) : '';
  let teamNum = Math.ceil((memberInit.length - 1) / size);

  infoUpdate(teamNum);
  // Meter miembros => ???
  // <p class='team-member'> Juan </p>;
  for (let i = 0; i < teamNum; i++) {
    teamDivs.push(`<article class="team"> <h4>Team ${i + 1}</h4>
    <div class="team-member-list"><p><strong>???</strong></p></div></article><div></div>`);
  }

  team.innerHTML = teamInitial + teamDivs.join('');
}
// HELPERS --------------------------------------------

function infoUpdate(teamNum) {
  members.innerText = `Memb.: ${memberInit.length - 1}`;
  infTeams.innerHTML = `Teams: ${teamNum}`;
}

// ======================================================

let teamMember = document.querySelectorAll('.team-member');
let body = document.querySelector('body');
let drag = false;
let selected;
let selY;
let selX;

for (let i = 0; i < teamMember.length; i++) {
  teamMember[i].addEventListener('mousedown', move);
  teamMember[i].addEventListener('mouseup', remove);
}

document.addEventListener('mouseup', removeDoc);
document.onmusedown = () => {
  return false;
};
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

function removeSelection() {
  return false;
}
function mousemove(e) {
  let axisX = e.clientX - selX;
  let axisY = e.clientY - selY;
  selected.style.transform = `translateY(${axisY}px) translateX(${axisX}px)`;
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
  selected.style.transform = `translateY(0px) translateX(0px)`;

  body.classList.remove('unselectable');
  selected = '';
  drag = false;
}
