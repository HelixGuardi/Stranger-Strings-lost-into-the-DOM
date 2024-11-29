/************  MAIN ELEMENTS OF THE DOM  ************/

// SCREENS
const initialScreenNode = document.querySelector("#initial-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const instructionsScreenNode = document.querySelector("#instructions-screen");


// BUTTONS
const startBtnNode = document.querySelector("#start-btn");
const instructionsBtnNode = document.querySelector("#instructions-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const mainScreenBtnNode = document.querySelector("#main-screen-btn");
const returnBtnNode = document.querySelector("#return-btn");
const ambientMusicBtn = document.querySelector("#btnAmbientSound");


// GLOBAL VARIABLES OF THE GAME
let heroObj = null; // hero
let eddieObj = null; // eddie
let gameIntervalId = null; // game interval (game-loop)
let casetObj = null; // caset-item (special item of the game)
let enemyToKill = null; // variable that we use to locate the enemy that will be killed for the thunder

let atackArr = []; // arr for the atack
let enemyArr = []; // arr for the enemy
let thunderArr = []; // arr for the thunder

let enemyLeftIntervalId = null; // left side enemy spawn interval id
let enemyRightIntervalId = null; // right side enemy spawn interval id

let spawnTime1 = 3000; // initial time for the enemy spawn 1
let spawnTime2 = 2600; // initial time for the enemy spawn 2


  /************  AUDIO EFFECTS  ************/
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

let thunderSound = new Audio("./Resources/Audio/thunder-sound-effect.mp3");
thunderSound.volume = 0.1;


  /************  GLOBAL FUNCTIONS OF THE GAME  ************/

  // START GAME FUNCTION
function startGame() {
  initialScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";

  eddieObj = new Eddie(); // Eddie show up
  heroObj = new Hero(); // Hero show up

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); // 60 FPS
}


  // GAME LOOP FUNCTION
function gameLoop() {
  // HERE WE ADD ONLY WHAT MUST BE EXECUTED 60 TIMES PER SECOND. (WHAT MUST BE CONTINUOUSLY CHECKED IN THE GAME)
  heroObj.gravityEffect();

  enemyArr.forEach((eachEnemy) => {
    eachEnemy.enemyMovement();
  });

  if (heroObj.isMovingRight === true) {
    heroObj.movement("right");
  } else if (heroObj.isMovingLeft === true) {
    heroObj.movement("left");
  }

  checkCollisionEddieVsMonster();
  checkCollisionEnemyVsAtack();
  checkCollisionHeroVsCasetItem();
  checkColissionThunderVsEnemy();
}


  // ADD ENEMY FUNCTION
function addEnemy(side) {
  if (side === "left") {
    let enemy1 = new Enemy("left");
    enemyArr.push(enemy1);
  } else if (side === "right") {
    let enemy2 = new Enemy("right");
    enemyArr.push(enemy2);
  }
}


  // CHECK COLISSION BETWEEN EDDIE AND MONSTER
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


  // GAME-OVER FUNCTION
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


  // CHECK COLISSION BETWEEN ENEMY AND THE ATACK
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
        enemyArr.splice(i, 1); 
        punchSound.play();
        bloodSoundEnemy.play();
      }
    });
  });
}


  // CHECK COLISSION BETWEEN THE HERO AND THE CASET-ITEM
function checkCollisionHeroVsCasetItem() {
  if (
    casetObj &&
    casetObj.x < heroObj.x + heroObj.w &&
    casetObj.x + casetObj.w > heroObj.x &&
    casetObj.y < heroObj.y + heroObj.h &&
    casetObj.y + casetObj.h > heroObj.y
  ) {
    casetObj.node.remove();
    casetObj = null;

    enemyToKill = enemyArr[0];
    let thunderObj = new Thunder(enemyToKill.x);
    thunderArr.push(thunderObj);
    thunderSound.play();
    setTimeout(() => {
      thunderArr[0].node.remove();
      thunderArr.shift();
    }, 150);
  }
}


  // CHECK COLISSION BETWEEN THE THUNDER AND THE ENEMY
function checkColissionThunderVsEnemy() {
  thunderArr.forEach((eachThunder) => {
    enemyArr.forEach((eachEnemy, i) => {
      if (
        eachThunder.x < eachEnemy.x + eachEnemy.w &&
        eachThunder.x + eachThunder.w > eachEnemy.x &&
        eachThunder.y < eachEnemy.y + eachEnemy.h &&
        eachThunder.y + eachThunder.h > eachEnemy.y
      ) {
        enemyArr[i].node.remove();
        enemyArr.splice(i, 1); 
      }
    });
  });
}


  /************  EVENT LISTENERS ************/

  // START BUTTON
startBtnNode.addEventListener("click", () => {
  clickSound.play();
  ambientSoundAudio.pause();
  sound.play();
  startGame();
  startCountDown();
});


  // HERO MOVEMENT
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyW") {
    heroObj.jump();
  } else if (event.code === "KeyD") {
    heroObj.isMovingRight = true;
  } else if (event.code === "KeyA") {
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


  // RESTART BUTTON
restartBtnNode.addEventListener("click", () => {
  clickSound.play();

  // restart variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  casetObj = null;
  enemyToKill = null;
  atackArr = [];
  enemyArr = [];
  thunderArr = [];
  enemyLeftIntervalId = null;
  enemyRightIntervalId = null;
  sound.currentTime = 0;
  spawnTime1 = 3000;
  spawnTime2 = 2600;
  gameDuration = 340;

  // restart game box node
  gameBoxNode.innerHTML = null;

  gameOverScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";

  sound.play();
  startGame();
});


  // INSTRUCTIONS BUTTON
instructionsBtnNode.addEventListener("click", () => {
  clickSound.play();
  initialScreenNode.style.display = "none";
  instructionsScreenNode.style.display = "flex";
});


  // MAIN SCREEN BUTTON (GAME-OVER SCREEN TO INITIAL SCREEN)
mainScreenBtnNode.addEventListener("click", () => {
  clickSound.play();
  // restart variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  casetObj = null;
  enemyToKill = null;
  atackArr = [];
  enemyArr = [];
  thunderArr = [];
  enemyLeftIntervalId = null;
  enemyRightIntervalId = null;
  sound.currentTime = 0;
  spawnTime1 = 3000;
  spawnTime2 = 2600;
  gameDuration = 340;

  // restart game box node
  gameBoxNode.innerHTML = null;

  gameOverScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";
});


  // RETURN BUTTON (INSTRUCTIONS SCREEN TO INITIAL SCREEN)
returnBtnNode.addEventListener("click", () => {
  clickSound.play();
  instructionsScreenNode.style.display = "none";
  initialScreenNode.style.display = "flex";
});


  // AMBIENT MUSIC BUTTON (INITIAL SCREEN)
ambientMusicBtn.addEventListener("click", () => {
  ambientSoundAudio.play();
});


  /************  BONUS IDEAS  ************/

  // MAIN TRACK OF THE GAME: MASTER OF PUPPETS (METALICA)
let sound = new Audio("./Resources/Audio/master-of-puppets-music.mp3");
sound.volume = 0.1;


  // GAME DURATION
let gameDuration = 340; // initialy should be 340 minutes


  // CONVERT THE TIME REMAINING IN SECONDS TO MINUTES AND SECONDS, AND PAD THE NUMBERS WITH ZEROS IF NEEDED
const minutes = Math.floor(gameDuration / 60)
  .toString()
  .padStart(2, "0");
const seconds = (gameDuration % 60).toString().padStart(2, "0");


  // DISPLAY THE TIME REMAINING IN THE TIME REMAINING CONTAINER
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
      spawnTime1 -= 400;
      spawnTime2 -= 400;

      clearInterval(enemyLeftIntervalId);
      clearInterval(enemyRightIntervalId);

      enemyLeftIntervalId = setInterval(() => {
        addEnemy("left");
      }, spawnTime1);

      enemyRightIntervalId = setInterval(() => {
        addEnemy("right");
      }, spawnTime2);
    }

    if (
      gameDuration === 300 ||
      gameDuration === 240 ||
      gameDuration === 200 ||
      gameDuration === 150 ||
      gameDuration === 100 ||
      gameDuration === 50 ||
      gameDuration === 30
    ) {
      casetObj = new CasetItem();
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
      // function to show up de epic final video
      epicFinalShowUp();
    }
  }, 1000);
}


  /************  ESPECIAL FUNCTION FOR THE EPIC FINAL OF THE GAME  ************/
function epicFinalShowUp() {
  sound.pause();
  clearInterval(gameIntervalId);
  clearInterval(enemyLeftIntervalId);
  clearInterval(enemyRightIntervalId);

  let epicVideoObj = new EpicVideo();

  setTimeout(() => {
  // restart variables
  heroObj = null;
  eddieObj = null;
  gameIntervalId = null;
  casetObj = null;
  enemyToKill = null;
  atackArr = [];
  enemyArr = [];
  thunderArr = [];
  enemyLeftIntervalId = null;
  enemyRightIntervalId = null;
  sound.currentTime = 0;
  spawnTime1 = 3000;
  spawnTime2 = 2600;
  gameDuration = 340;
  // restart game box, timer and music
  gameBoxNode.innerHTML = null;
    gameDuration = 340;
    sound.currentTime = 0;
  }, 58500);

  setTimeout(() => {
    gameScreenNode.style.display = "none";
    initialScreenNode.style.display = "flex";
  }, 58000);
}
