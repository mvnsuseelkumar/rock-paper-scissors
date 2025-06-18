const btnst = document.querySelector("#btn-st");
const btnreset = document.querySelector("#btn-reset");
const msg = document.querySelector("#msg-con");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const update_user_score = document.querySelector("#user-score");
const update_computer_score = document.querySelector("#computer-score");
let usrch;
let comch;
let usrscore = 0;
let comscore = 0;
let isplayed = false;
btnst.addEventListener("click", () => {
  setTimeout(() => {
    btnst.style.display = "none";
    msg.style.display = "inline-block";
    play_game();
  }, 200);
});

btnreset.addEventListener("click", () => {
  setTimeout(() => {
    usrscore = 0;
    update_user_score.innerText = usrscore;
    comscore = 0;
    update_computer_score.innerText = comscore;
    msg.innerText = `Let's Start`;
    msg.style.backgroundColor = "#00ff99";
  }, 200);
});
function play_game() {
  rock.addEventListener("click", () => choice("rock"));
  paper.addEventListener("click", () => choice("paper"));
  scissors.addEventListener("click", () => choice("scissors"));
}

function choice(ch) {
  usrch = ch;
  btnreset.style.display = "block";
  const choices = ["rock", "paper", "scissors"];
  let c = Math.floor(Math.random() * 3);
  comch = choices[c];
  check_winner();
}

function update_score(isusrwin) {
  if (isusrwin != null) {
    if (isusrwin === true) {
      usrscore++;
      update_user_score.innerText = usrscore;
      msg.innerText = `You Won, Your Choice ${usrch} beats ${comch}`;
      msg.style.backgroundColor = "rgb(114, 255, 33)";
    } else {
      comscore++;
      update_computer_score.innerText = comscore;
      msg.innerText = `You Lose, Your Choice ${usrch} loses to ${comch}`;
      msg.style.backgroundColor = "rgb(255, 37, 37)";
    }
  }
}

function check_winner() {
  let isusrwin = null;
  if (usrch === comch) {
    msg.innerText = `Draw! Play Again`;
    msg.style.backgroundColor = "rgb(39, 129, 255)";
  } else {
    if (usrch === "rock") {
      isusrwin = comch === "scissors" ? true : false;
    } else if (usrch === "paper") {
      isusrwin = comch === "rock" ? true : false;
    } else if (usrch === "scissors") {
      isusrwin = comch === "paper" ? true : false;
    }
  }
  update_score(isusrwin);
}
