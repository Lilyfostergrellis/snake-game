const playBoard = document.querySelector(".play-board");

let foodX = 13, foodY = 10;
let snakeX = 5, snakeY = 15;
let velocityX = 0, velocityY = 0;

const changeFoodPositioning = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    //passes a random value between 0-30 as the food position
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
    //change velocity based on user key press
    initGame();

}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPositioning();
    }
    //when the snake head position is equal to the food positioning then the food changes to a new position

    snakeX += velocityX;
    snakeY += velocityY;
    //update to position of snake's head based on current velocity on game-board

    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}


changeFoodPositioning();
//on refresh of browser, the food position changes randomly
setInterval(initGame, 125);
//once initGame is called, 'food' and 'snake-head' is rendered, snake head moves fluidly on one directional press

document.addEventListener("keydown", changeDirection);