const playBoard = document.querySelector(".play-board");

let foodX = 13, foodY = 10;

const changeFoodPositioning = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    //passes a random value between 0-30 as the food position
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPositioning();
//on refresh of browser, the food position changes randomly
initGame();
//once initGame is called, 'food' is rendered