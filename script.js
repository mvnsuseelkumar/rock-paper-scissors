const btnst = document.querySelector("#btn-st");
const btnreset = document.querySelector("#btn-reset");
const msg = document.querySelector("#msg-con");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const update_user_score = document.querySelector("#user-score");
const update_computer_score = document.querySelector("#computer-score");
const select_player_mode_dialog_box = document.querySelector(
  "#select-player-mode-dialog-box"
);
const btnnext = document.querySelector("#btn-next");
const rounds = document.querySelector("#rounds");
const btnend = document.querySelector("#btn-end");
const vscon = document.querySelector("#vscon");
const vsimg = document.querySelector("#vsimg");
const winner_dialog_box = document.querySelector("#winner-dialog-box");
const winnertext = document.querySelector("#winner-text");

const rockClickEvent = () => makeChoice("rock");
const paperClickEvent = () => makeChoice("paper");
const scissorsClickEvent = () => makeChoice("scissors");

function removeEvents() {
  rock.removeEventListener("click", rockClickEvent);
  paper.removeEventListener("click", paperClickEvent);
  scissors.removeEventListener("click", scissorsClickEvent);
}

function addEvents() {
  rock.addEventListener("click", rockClickEvent);
  paper.addEventListener("click", paperClickEvent);
  scissors.addEventListener("click", scissorsClickEvent);
  enableChoiceButtons();
}

let makeChoice = null;
let p1ch;
let p2ch;
let p1score = 0;
let p2score = 0;
let selected_mode;
let isPlayer1Turn = true;
let rounds_count = 0;
let isDocumentEventListenerAdded = false;

function disableChoiceButtons() {
  rock.disabled = true;
  paper.disabled = true;
  scissors.disabled = true;
}

function enableChoiceButtons() {
  rock.disabled = false;
  paper.disabled = false;
  scissors.disabled = false;
}

function showStartMessage(isNextRound = false) {
  if (selected_mode === "vsplayer") {
    msg.innerText = isNextRound
      ? "Player 1: Make your move"
      : "Let's Start, Player 1: Make your move";
  } else {
    msg.innerText = isNextRound
      ? "Player Make your move"
      : "Let's Start, Player Make your move";
  }
  msg.style.backgroundColor = "#00ff99";
}

function showButtons() {
  btnreset.style.display = "inline-block";
  btnnext.style.display = "inline-block";
  btnend.style.display = "inline-block";
}

function select_mode(mode) {
  selected_mode = mode;
  setTimeout(() => {
    select_player_mode_dialog_box.classList.add("exit-animation");
    setTimeout(() => {
      select_player_mode_dialog_box.style.display = "none";
      vscon.style.display = "block";
      vscon.classList.add("entry-animation");
      setTimeout(() => {
        vscon.classList.add("exit-animation");
      }, 2000);
    }, 1200);
  }, 300);

  showStartMessage();

  if (mode === "vscomputer") {
    vsimg.setAttribute("src", "./images/pcvsppng.png");
    makeChoice = function (ch) {
      console.log("event working");
      p1ch = ch;
      disableChoiceButtons();
      const choices = ["rock", "paper", "scissors"];
      setTimeout(() => {
        let c = Math.floor(Math.random() * 3);
        p2ch = choices[c];
        check_winner("You", "PC");
      }, 300);
      showButtons();
    };
  } else if (mode === "vsplayer") {
    vsimg.setAttribute("src", "./images/p1vsp2png.png");
    makeChoice = function (ch) {
      console.log("event working");
      if (isPlayer1Turn) {
        p1ch = ch;
        disableChoiceButtons();
        setTimeout(() => {
          enableChoiceButtons();
        }, 200);
        isPlayer1Turn = false;
        msg.innerText = "Player 2: Make your move";
        msg.style.backgroundColor = "#ffa500";
      } else {
        p2ch = ch;
        disableChoiceButtons();
        isPlayer1Turn = true;
        check_winner("Player 1", "Player 2");
        showButtons();
      }
    };
  }
}

btnst.addEventListener("click", () => {
  setTimeout(() => {
    btnst.style.display = "none";
    msg.style.display = "inline-block";
    rounds.style.display = "inline-block";
    rounds_count++;
    rounds.innerText = `Round ${rounds_count}`;
    playGame();
  }, 200);
});

function resetGame() {
  btnreset.style.display = "none";
  btnnext.style.display = "none";
  btnend.style.display = "none";
  rounds_count = 0;
  p1score = 0;
  p2score = 0;
  isPlayer1Turn = true;
  p1ch = null;
  p2ch = null;
  update_user_score.innerText = 0;
  update_computer_score.innerText = 0;
  btnnext.disabled = false;
  btnend.disabled = false;
  addEvents();
  showStartMessage();
}

function handleWinnerDialogClose() {
  winner_dialog_box.classList.add("exit-animation");
  document.removeEventListener("click", handleWinnerDialogClose);
  setTimeout(() => {
    winner_dialog_box.style.display = "none";
    isDocumentEventListenerAdded = false;
    resetGame();
  }, 1200);
}

btnreset.addEventListener("click", () => {
  setTimeout(() => {
    resetGame();
  }, 200);
  setTimeout(() => {
    if (makeChoice === null) {
      alert("Choice function is not set. Please select a mode first.");
    }
  }, 500);
});

btnnext.addEventListener("click", () => {
  removeEvents();
  addEvents();
  showStartMessage(true);
  rounds_count++;
  rounds.innerText = `Round ${rounds_count}`;
});

function playGame() {
  addEvents();
}

function update_score(isP1Win, p1, p2) {
  const p1_possessive = p1 === "You" ? "Your" : `${p1}'s`;
  const p2_possessive = p2 === "You" ? "Your" : `${p2}'s`;

  if (isP1Win != null) {
    if (isP1Win) {
      p1score++;
      update_user_score.innerText = p1score;
      msg.innerText = `${p1} Won, ${p1_possessive} Choice ${p1ch} beats ${p2ch}`;
      msg.style.backgroundColor = "rgb(114, 255, 33)";
    } else {
      p2score++;
      update_computer_score.innerText = p2score;
      msg.innerText = `${p2} Won, ${p2_possessive} Choice ${p2ch} beats ${p1ch}`;
      msg.style.backgroundColor = "rgb(255, 37, 37)";
    }
  }
}

function check_winner(p1, p2) {
  setTimeout(() => {
    if (p1ch === p2ch) {
      msg.innerText = `Draw! Both chose ${p1ch}`;
      msg.style.backgroundColor = "rgb(39, 129, 255)";
      return;
    }

    const winMap = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    const isP1Win = winMap[p1ch] === p2ch;
    update_score(isP1Win, p1, p2);

    p1ch = null;
    p2ch = null;
    removeEvents();
  }, 300);
}

btnend.addEventListener("click", () => {
  let winner;
  msg.style.backgroundColor = "purple";
  if (selected_mode === "vsplayer") {
    if (p1score === p2score) {
      winner = `The Game is Draw!`;
      msg.innerText = `Game Ended, Finally Game is Draw!`;
    } else if (p1score > p2score) {
      winner = `The Winner is Player 1`;
      msg.innerText = `Game Ended, Finally Player 1 Win The Game`;
    } else if (p1score < p2score) {
      winner = `The Winner is Player 2`;
      msg.innerText = `Game Ended, Finally Player 2 Win The Game`;
    }
  } else if (selected_mode === "vscomputer") {
    if (p1score === p2score) {
      winner = `The Game is Draw!`;
      msg.innerText = `Game Ended, Finally Game is Draw!`;
    } else if (p1score > p2score) {
      winner = `The Winner is Player`;
      msg.innerText = `Game Ended, Finally Player Win The Game`;
    } else if (p1score < p2score) {
      winner = `The Winner is PC`;
      msg.innerText = `Game Ended, Finally PC Win The Game`;
    }
  }
  winner_dialog_box.style.display = "block";
  winnertext.innerText = winner;
  setTimeout(() => {
    winner_dialog_box.classList.add("entry-animation");
  }, 100);

  btnnext.disabled = true;
  btnend.disabled = true;

  if (!isDocumentEventListenerAdded) {
    document.addEventListener("click", handleWinnerDialogClose);
    isDocumentEventListenerAdded = true;
  }
});
