// ELEMENTOS PRINCIPALES DEL DOM

// Pantallas
const initialScreenNode = document.querySelector("#initial-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const instructionsScreenNode = document.querySelector("#instructions-screen");

// Botones
const startBtnNode = document.querySelector("#start-btn");
const instructionsBtnNode = document.querySelector("#instructions-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const mainScreenBtnNode = document.querySelector("#main-screen-btn");
const returnBtnNode = document.querySelector("#return-btn");

// VARIABLES GLOBALES DEL JUEGO
let heroObj = null;
let eddieObj = null;
let gameIntervalId = null;
let atackArr = [];
let enemyArr = [];
let addEnemyIntervalId1 = null;
let addEnemyIntervalId2 = null;

// FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  initialScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";

  eddieObj = new Eddie(); // aparece Eddie
  heroObj = new Hero(); // aparece Hero

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); // 60 FPS

  addEnemyIntervalId1 = setInterval(() => {
    addEnemy("left");
  }, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);

  addEnemyIntervalId2 = setInterval(() => {
    addEnemy("right");
  }, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);
}

function gameLoop() {
  // HERE WE ADD ONLY WHAT MUST BE EXECUTED 60 TIMES PER SECOND. (WHAT MUST BE CONTINUOUSLY CHECKED IN THE GAME)
  heroObj.gravityEffect();
  enemyArr.forEach((eachEnemy) => {
    eachEnemy.enemyMovement();
  });

  checkCollisionEddieVsMonster();
  checkCollisionEnemyVsAtack();
}

function addEnemy(side) {
  if (side === "left") {
    let enemy1 = new Enemy("left");
    enemyArr.push(enemy1);
  } else if (side === "right") {
    let enemy2 = new Enemy("right");
    enemyArr.push(enemy2);
  }
}

function checkCollisionEddieVsMonster() {
  enemyArr.forEach((eachEnemy) => {
    if (
      eddieObj.x < eachEnemy.x + eachEnemy.w &&
      eddieObj.x + eddieObj.w > eachEnemy.x &&
      eddieObj.y < eachEnemy.y + eachEnemy.h &&
      eddieObj.y + eddieObj.h > eachEnemy.y
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  sound.pause();
  clearInterval(gameIntervalId);
  clearInterval(addEnemyIntervalId1);
  clearInterval(addEnemyIntervalId2);

  setTimeout(() => {
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  }, 500);
}

function checkCollisionEnemyVsAtack() {
  atackArr.forEach((eachAtk) => {
    enemyArr.forEach((eachEnemy, i) => {
      if (
        eachEnemy.x < eachAtk.x + eachAtk.w &&
        eachEnemy.x + eachEnemy.w > eachAtk.x &&
        eachEnemy.y < eachAtk.y + eachAtk.h &&
        eachEnemy.y + eachEnemy.h > eachAtk.y
      ) {
        enemyArr[i].node.remove();
        enemyArr.splice(i, 1); // remueves siempre el primero
      }
    });
  });
}

// EVENT LISTENERS
startBtnNode.addEventListener("click", () => {
  sound.play();
  startGame();
  startCountDown();
});

// hero movement
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyW") {
    heroObj.jump();
  } else if (event.code === "KeyD") {
    heroObj.movement("right");
  } else if (event.code === "KeyA") {
    heroObj.movement("left");
  }
});

// atk effect
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    let playerPos = heroObj.x;

    let atackObj = new Atack(playerPos);
    atackArr.push(atackObj);

    setTimeout(() => {
      atackArr[0].node.remove();
      atackArr.shift();
    }, 175);
  }
});

restartBtnNode.addEventListener("click", () => {
  // vaciamos las variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  atackArr = [];
  enemyArr = [];
  addEnemyIntervalId1 = null;
  addEnemyIntervalId2 = null;
  sound.currentTime = 0;
  // vaciamos el game-box
  gameBoxNode.innerHTML = null;

  // como la función startGame() comienza desde la pantalla de inicio, con el botón restart, vamos a la pantalla de inicio otra vez, y en seguida iniciamos la función, para evitar conflictos en el código
  gameOverScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";

  sound.play();
  startGame();
});

instructionsBtnNode.addEventListener("click", () => {
  initialScreenNode.style.display = "none";
  instructionsScreenNode.style.display = "flex";
});

mainScreenBtnNode.addEventListener("click", () => {
  // vaciamos las variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  atackArr = [];
  enemyArr = [];
  addEnemyIntervalId1 = null;
  addEnemyIntervalId2 = null;
  sound.currentTime = 0;
  // vaciamos el game-box
  gameBoxNode.innerHTML = null;

  gameOverScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";
});

returnBtnNode.addEventListener("click", () => {
  instructionsScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";
});

// BONUS IDEAS

// AUDIO + TIMER
let sound = new Audio("../Resources/Audio/master-of-puppets-music.mp3");
sound.volume = 0.2;

let gameDuration = 340; //should be 340

// convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
const minutes = Math.floor(gameDuration / 60)
  .toString()
  .padStart(2, "0");
const seconds = (gameDuration % 60).toString().padStart(2, "0");

// display the time remaining in the time remaining container
const timeRemainingContainer = document.getElementById("timeRemaining");
timeRemainingContainer.innerText = `${minutes}:${seconds}`;

//TIMER
function startCountDown() {
  intervalId = setInterval(() => {
    gameDuration--;

    const minutes = Math.floor(gameDuration / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (gameDuration % 60).toString().padStart(2, "0");
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    if (gameDuration === 0) {
      clearInterval(intervalId);
      //función para mostrar el video que queremos
      epicFinalShowUp();
    }
  }, 1000);
}

function epicFinalShowUp() {
  sound.pause();
  clearInterval(gameIntervalId);
  clearInterval(addEnemyIntervalId1);
  clearInterval(addEnemyIntervalId2);

  let epicVideoObj = new EpicVideo();

  setTimeout(() => {
    // vaciamos las variables
    heroObj = null;
    eddieObj = null;
    gameIntervalId = null;
    atackArr = [];
    enemyArr = [];
    addEnemyIntervalId1 = null;
    addEnemyIntervalId2 = null;
    // vaciamos el game-box
    gameBoxNode.innerHTML = null;
    gameDuration = 340;
    sound.currentTime = 0;
  }, 58500);
  
  setTimeout(() => {
    gameScreenNode.style.display = "none";
    initialScreenNode.style.display = "flex";
  }, 58000);

}
