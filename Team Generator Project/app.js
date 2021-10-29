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
