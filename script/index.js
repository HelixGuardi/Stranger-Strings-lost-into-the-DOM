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
const ambientMusicBtn = document.querySelector("#btnAmbientSound");

// VARIABLES GLOBALES DEL JUEGO
let heroObj = null;
let eddieObj = null;
let gameIntervalId = null;

let atackArr = [];
let enemyArr = [];

let enemyLeftIntervalId = null;
let enemyRightIntervalId = null;

let spawnTime1 = 3000; // si aumenta la dificultad, se resta el tiempo de spawn
let spawnTime2 = 2600; // si aumenta la dificultad, se resta el tiempo de spawn

//effects audio
let punchSound = new Audio("./Resources/Audio/punch-effect-sound.mp3");
punchSound.volume = 0.1;

let gameOverSound = new Audio(
  "./Resources/Audio/videogame-death-sound-43894.mp3"
);
gameOverSound.volume = 0.1;

let clickSound = new Audio("./Resources/Audio/simple-click.mp3");
clickSound.volume = 0.2;

let ambientSoundAudio = new Audio("./Resources/Audio/mystical-soundtrack.mp3");
ambientSoundAudio.volume = 0.1;

let bloodSoundEnemy = new Audio("./Resources/Audio/blood-hit-sound.mp3");
bloodSoundEnemy.volume = 0.2;

// FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  initialScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";

  eddieObj = new Eddie(); // aparece Eddie
  heroObj = new Hero(); // aparece Hero

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); // 60 FPS
}

function gameLoop() {
  // HERE WE ADD ONLY WHAT MUST BE EXECUTED 60 TIMES PER SECOND. (WHAT MUST BE CONTINUOUSLY CHECKED IN THE GAME)
  heroObj.gravityEffect();
  enemyArr.forEach((eachEnemy) => {
    eachEnemy.enemyMovement();
  });

  if(heroObj.isMovingRight === true) {
    heroObj.movement("right");
  } else if (heroObj.isMovingLeft === true) {
    heroObj.movement("left");
  }

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
      gameOverSound.play();
      gameOver();
    }
  });
}

function gameOver() {
  sound.pause();
  clearInterval(gameIntervalId);
  clearInterval(enemyLeftIntervalId);
  clearInterval(enemyRightIntervalId);

  setTimeout(() => {
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  }, 350);
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
        punchSound.play();
        bloodSoundEnemy.play();
      }
    });
  });
}

// EVENT LISTENERS
startBtnNode.addEventListener("click", () => {
  clickSound.play();
  ambientSoundAudio.pause();
  sound.play();
  startGame();
  startCountDown();
});

// hero movement
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyW") {
    heroObj.jump();
  } else if (event.code === "KeyD") {
    // heroObj.movement("right");
    heroObj.isMovingRight = true;
  } else if (event.code === "KeyA") {
    // heroObj.movement("left");
    heroObj.isMovingLeft = true;
  } else if (event.code === "Space") {
    let playerPos = heroObj.x;

    let atackObj = new Atack(playerPos);
    atackArr.push(atackObj);

    setTimeout(() => {
      atackArr[0].node.remove();
      atackArr.shift();
    }, 170);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "KeyD") {
    heroObj.isMovingRight = false;
  } else if (event.code === "KeyA") {
    heroObj.isMovingLeft = false;
  }
});

restartBtnNode.addEventListener("click", () => {
  clickSound.play();

  // vaciamos las variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  atackArr = [];
  enemyArr = [];
  enemyLeftIntervalId = null;
  enemyRightIntervalId = null;
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
  clickSound.play();
  initialScreenNode.style.display = "none";
  instructionsScreenNode.style.display = "flex";
});

mainScreenBtnNode.addEventListener("click", () => {
  clickSound.play();
  // vaciamos las variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  atackArr = [];
  enemyArr = [];
  enemyLeftIntervalId = null;
  enemyRightIntervalId = null;
  sound.currentTime = 0;
  // vaciamos el game-box
  gameBoxNode.innerHTML = null;

  gameOverScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";
});

returnBtnNode.addEventListener("click", () => {
  clickSound.play();
  instructionsScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";
});

ambientMusicBtn.addEventListener("click", () => {
  ambientSoundAudio.play();
});
// BONUS IDEAS

// AUDIO + TIMER
let sound = new Audio("./Resources/Audio/master-of-puppets-music.mp3");
sound.volume = 0.1;

let gameDuration = 340; //should be 340 minutes

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
    if (
      gameDuration === 340 ||
      gameDuration === 300 ||
      gameDuration === 240 ||
      gameDuration === 150 ||
      gameDuration === 30
    ) {
      spawnTime1 -= 200;
      spawnTime2 -= 200;

      clearInterval(enemyLeftIntervalId);
      clearInterval(enemyRightIntervalId);

      enemyLeftIntervalId = setInterval(() => {
        addEnemy("left");
      }, spawnTime1);

      enemyRightIntervalId = setInterval(() => {
        addEnemy("right");
      }, spawnTime2);
    }

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
  clearInterval(enemyLeftIntervalId);
  clearInterval(enemyRightIntervalId);

  let epicVideoObj = new EpicVideo();

  setTimeout(() => {
    // vaciamos las variables
    heroObj = null;
    eddieObj = null;
    gameIntervalId = null;
    atackArr = [];
    enemyArr = [];
    enemyLeftIntervalId = null;
    enemyRightIntervalId = null;
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
