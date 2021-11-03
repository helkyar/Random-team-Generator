let grid = document.querySelector('.grid');
let turn = document.querySelector('.player');
const refresh = document.querySelector('button');
let player = true; //player one = true
const winArray = [
  [0, 4, 8],
  [6, 4, 2],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

grid.addEventListener('click', makeMove);
refresh.addEventListener('click', () => location.reload());

function makeMove(e) {
  let play;
  let cls = e.target.classList;

  if (!cls.contains('full') && cls.contains('cell')) {
    player ? (e.target.innerText = 'X') : (e.target.innerText = 'O');
    player ? (play = 'two') : (play = 'one');

    turn.innerText = `Turn: Player ${play}`;
    e.target.classList.add('full');
    e.target.classList.add(play);
    player = !player;
    checkWin();
  }
}

function checkWin() {
  let cells = document.querySelectorAll('.cell');
  for (let i = 0; i < winArray.length; i++) {
    let one = 0;
    let two = 0;

    for (let j = 0; j < 3; j++) {
      cells[winArray[i][j]].classList.contains('one') ? one++ : '';
      cells[winArray[i][j]].classList.contains('two') ? two++ : '';

      one == 3 ? (turn.innerText = 'Player two Wins!') : ''; //the order is messed up
      two == 3 ? (turn.innerText = 'Player one Wins!') : '';
      one == 3 || two == 3 ? (turn = '') : '';
    }
  }
}
