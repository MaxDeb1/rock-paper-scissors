/** RULES MODAL **/
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelectorAll(".close-button");

openModal.addEventListener("click", () => {
  modal.classList.add("fade-in");
  modal.addEventListener(
    "animationend",
    () => {
      modal.classList.remove("fade-in");
    },
    { once: true }
  );
  modal.showModal();
});

closeModal.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.add("fade-out");
    modal.addEventListener(
      "animationend",
      () => {
        modal.close();
        modal.classList.remove("fade-out");
      },
      { once: true }
    );
  });
});

/** GAME **/
const body = document.querySelector("body");
const game = document.querySelector("#game");
const result = document.querySelector("#result");
const choices = ["rock", "paper", "scissors"];
let userChoice;
let machineChoice;
const pick = document.querySelectorAll(".pick");
const picks = document.querySelectorAll(".choice-btn");
const userPick = document.querySelector("#userChoice");
const machinePick = document.querySelector("#machineChoice");
const winlose = document.querySelector(".winner");
const playAgainBtn = document.querySelector(".btn-play-again");

const score = document.querySelector(".score");

if (sessionStorage.getItem("score")) {
  score.innerHTML = sessionStorage.getItem("score");
}

const handleClick = (e) => {
  userChoice = e.target.id;
  body.classList.remove("preload");
  game.classList.add("played");
  generateMachineChoice();
  getResult();
  result.classList.add("result");

  userPick.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="choice ${userChoice}">
      <img src="${getIcon(userChoice)}" alt="${userChoice}">
    </div>
  `
  );

  setTimeout(() => {
    result.style.opacity = 1;
    machinePick.style.animation = "pulse 2.5s 1";
  }, 1000);

  setTimeout(() => {
    machinePick.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="choice ${machineChoice}">
        <img src="${getIcon(machineChoice)}" alt="${machineChoice}">
      </div>
    `
    );
  }, 3500);

  setTimeout(() => {
    playAgainBtn.style.width = "220px";
  }, 3800);

  setTimeout(() => {
    winlose.insertAdjacentHTML("afterbegin", `${resultsOfTheGame()}`);
    winlose.style.transform = "scale(1)";
    pick.forEach((item) => {
      if (item.classList.contains(getResult())) {
        item.classList.add("victory");
      }
    });
    incrementScore();
  }, 4500);

  setTimeout(() => {
    playAgainBtn.style.cssText =
      "opacity: 1; visibility: visible; pointer-events: auto;";
    playAgainBtn.style.width = "220px";
  }, 5500);

/*   console.log("userChoice= " + e.target.id);
  console.log("machineChoice= " + machineChoice);
  console.log(getResult()); */
};

const generateMachineChoice = () => {
  machineChoice = choices[Math.floor(Math.random() * choices.length)];
};

const getIcon = (choice) => {
  switch (choice) {
    case "paper":
      return "./images/icon-paper.svg";
      break;
    case "scissors":
      return "./images/icon-scissors.svg";
      break;
    case "rock":
      return "./images/icon-rock.svg";
      break;
  }
};

for (let i = 0; i < picks.length; i++) {
  picks[i].addEventListener("click", handleClick);
}

const getResult = () => {
  let uId = choices.indexOf(userChoice);
  /* console.log("uId =" + uId) */
  let mId = choices.indexOf(machineChoice);
  /* console.log("mId =" + mId) */

  if (uId !== mId) {
    winner = mId === (uId + 1) % 3 ? "machine" : "user";
  } else {
    winner = "tie";
  }
  return winner;
};

let resultsOfTheGame = () => {
  if (getResult() === "machine") {
    return "You Lose";
  } else if (getResult() === "user") {
    return "You win";
  } else {
    return "Tie";
  }
};

const incrementScore = () => {
  if (getResult() === "user") {
    increment = parseInt(score.innerText, 10) + 1;
    score.innerHTML = increment;
    sessionStorage.setItem("score", increment);
  }
};

playAgainBtn.addEventListener("click", () => {
  game.classList.remove("played");
  result.classList.remove("result");
  userPick.innerHTML = "";
  result.style.opacity = 0;
  machinePick.style.animation = "none";
  machinePick.innerHTML = "";
  winlose.innerHTML = "";
  winlose.style.transform = "scale(0)";
  pick.forEach((item) => {
    if (item.classList.contains(getResult())) {
      item.classList.remove("victory");
    }
  });
  playAgainBtn.style.cssText =
    "opacity: 0; visibility: hidden; pointer-events: none;";
  body.classList.add("preload");
});
