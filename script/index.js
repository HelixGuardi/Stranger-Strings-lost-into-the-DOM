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


// FUNCIONES GLOBALES DEL JUEGO
function startGame() {
    // 1. ocultar la pantalla inicial
    initialScreenNode.style.display = "none";
    // 2. mostrar la pantalla de juego
    gameScreenNode.style.display = "flex";
    // 3. añadir todos los elementos iniciales del juego
    heroObj = new Hero();
    // 4. iniciar el intervalo del juego (game-loop)
    gameIntervalId = setInterval(() => {
        gameLoop();
    }, Math.round(1000/60)); // 60 FPS
    // 5. iniciar los otros intervalos del juego

}

function gameLoop() {
    // console.log("test");
    // HERE WE ADD ONLY WHAT MUST BE EXECUTED 60 TIMES PER SECOND. (WHAT MUST BE CONTINUOUSLY CHECKED IN THE GAME)
    heroObj.gravityEffect();

}




// EVENT LISTENERS
startBtnNode.addEventListener('click', () => {
    startGame();
})

document.addEventListener('keydown', (event) => {
    console.log(event);
    if(event.code === 'Space') {
        heroObj.jump();
    } else if (event.code === 'ArrowRight') {
        console.log("moviendo personaje a la derecha");
        heroObj.x += heroObj.speed;
        heroObj.node.style.left = `${heroObj.x}px`;

    } else if (event.code === 'ArrowLeft') {
        console.log("moviendo personaje a la izquierda");
        heroObj.x -= heroObj.speed;
        heroObj.node.style.left = `${heroObj.x}px`;
    }
});
