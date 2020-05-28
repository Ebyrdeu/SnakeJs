'use strict';
const canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d');

// IMG & AUDIO
const
    // IMG
    bg = new Image(),
    fruit = new Image(),
    // Audio
    scoreAuido1 = new Audio(),
    bgAudio = new Audio();

//
bg.src = 'img/background.svg';
fruit.src = 'img/fruit.png';
scoreAuido1.src = 'audio/score.mp3';
bgAudio.src = 'audio/background.wav';

// Background Music
bgAudio.play();

// Def param
let square = 32,
    score = 0,
    dir;

// Fruit Random Location Location
let fruitL = {
    x: Math.floor((Math.random() * 17 + 1)) * square,
    y: Math.floor((Math.random() * 15 + 3)) * square
};

// Snake Head
const snake = [];
snake[0] = {
    x: 9 * square,
    y: 10 * square
}

// Game
const drawGame = () => {
    // Fruit and Background
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(fruit, fruitL.x, fruitL.y);

    // Score
    ctx.fillStyle = "#F1FA8C";
    ctx.font = "26px Arial";
    ctx.fillText(score, square * 2.2, square * 1.6);

    // Snake
    let snakeX = snake[0].x,
        snakeY = snake[0].y;


    // Snake Color Loop
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#F1FA8C";
        ctx.fillRect(snake[i].x, snake[i].y, square, square)
    }



    // Eating fruit
    if (snakeX === fruitL.x && snakeY === fruitL.y) {
        scoreAuido1.play()
        score++
        fruitL = {
            x: Math.floor((Math.random() * 17 + 1)) * square,
            y: Math.floor((Math.random() * 15 + 3)) * square
        };
    } else snake.pop();



    // Border
    if (snakeX < square || snakeX > square * 17 || snakeY < 3 * square || snakeY > square * 17) {
        ctx.fillText('Game Over: press "R" to restart', square * 7.3, square * 1.5);
        clearInterval(game)
    }


    // Directions
    if (dir === 'left') snakeX -= square; // left
    if (dir === 'right') snakeX += square; // right
    if (dir === 'up') snakeY -= square; // up
    if (dir === 'down') snakeY += square; // down

    // Create new Head
    // After eat
    const newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead)


}


let game = setInterval(drawGame, 100);


// Controls

const direction = (e) => {

    if (e.keyCode === 37 && dir !== "right") dir = 'left';
    else if (e.keyCode === 39 && dir !== "left") dir = 'right';
    else if (e.keyCode === 38 && dir !== "down") dir = 'up';
    else if (e.keyCode === 40 && dir !== "up") dir = 'down';
    else if (e.keyCode === 82) {
        snake[0] = {
            x: 9 * square,
            y: 10 * square
        }
        game = setInterval(drawGame, 100)
        snake.length = 1;
        score = 0;
        fruitL = {
            x: Math.floor((Math.random() * 17 + 1)) * square,
            y: Math.floor((Math.random() * 15) + 3) * square
        };
    }
}

document.addEventListener('keydown', direction);
