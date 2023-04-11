const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");


let gameOver = false;
let foodX = 13, foodY = 10;
let snakeX = 5, snakeY = 15;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
//high score from local storage

const changeFoodPositioning = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    //passes a random value between 0-30 as the food position
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay!");
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    //change velocity based on user key press
    initGame();

}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key}))
    //calling changeDirection on each click, passing the key dataset value as an object
})

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPositioning();
        snakeBody.push([foodX, foodY]);//pushing food position to snake body array
        score++;
        //increment score by 1

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        //set high score if greater than highscore
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;

    }
    //when the snake head position is equal to the food positioning then the food changes to a new position

    for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;
    //update to position of snake's head based on current velocity on game-board

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
    //if snake head hits the border, 'game over'

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //adding a div for each part of the snake's body
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && i !== 0 && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
        //if snake head hits body then game over to true
        }
    playBoard.innerHTML = htmlMarkup;
}


changeFoodPositioning();
//on refresh of browser, the food position changes randomly
setIntervalId = setInterval(initGame, 125);
//once initGame is called, 'food' and 'snake-head' is rendered, snake head moves fluidly on one directional press

document.addEventListener("keydown", changeDirection);