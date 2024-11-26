// ELEMENTOS PRINCIPALES DEL DOM

    // Pantallas
const initialScreenNode = document.querySelector("#initial-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#game-over-screen");

    // Botones
const startBtnNode = document.querySelector("#start-btn");
const instructionsBtnNode = document.querySelector("#instructions-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const mainScreenBtnNode = document.querySelector("#main-screen-btn");

// VARIABLES GLOBALES DEL JUEGO
let heroObj = null;
let enemyObj = null;
let eddieObj = null;
// let enemy1 = null;
// let enemy2 = null;
let enemyArr = [];


// FUNCIONES GLOBALES DEL JUEGO
function startGame() {

    initialScreenNode.style.display = "none";

    gameScreenNode.style.display = "flex";

    eddieObj = new Eddie(); // aparece Eddie
    heroObj = new Hero(); // aparece Hero
    // enemy1 = new Enemy("left");
    // enemy2 = new Enemy("right");

    gameIntervalId = setInterval(() => {
        gameLoop();
    }, Math.round(1000/60)); // 60 FPS

    addEnemyIntervalId1 = setInterval(() => {
        addEnemy("left");
    }, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);

    addEnemyIntervalId2 = setInterval(() => {
        addEnemy("right");
    }, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);


}

function gameLoop() {
    // console.log("test");
    // HERE WE ADD ONLY WHAT MUST BE EXECUTED 60 TIMES PER SECOND. (WHAT MUST BE CONTINUOUSLY CHECKED IN THE GAME)
    heroObj.gravityEffect();
    // enemy1.enemyMovement();
    // enemy2.enemyMovement();
    enemyArr.forEach((eachEnemy) => {
        eachEnemy.enemyMovement();
    })
}

function addEnemy(side) {
    if(side === "left"){
        let enemy1 = new Enemy("left");
        enemyArr.push(enemy1);
    } else if (side === "right") {
        let enemy2 = new Enemy("right");
        enemyArr.push(enemy2);
    }

}

// EVENT LISTENERS
startBtnNode.addEventListener('click', () => {
    startGame();
})

    // movimiento del personaje
document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {
        heroObj.jump();
    } else if (event.code === 'ArrowRight') {
        console.log("moviendo personaje a la derecha");
        heroObj.movement("right");

    } else if (event.code === 'ArrowLeft') {
        console.log("moviendo personaje a la izquierda");
        heroObj.movement("left");
    }
});
