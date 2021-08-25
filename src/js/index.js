let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0]= {
    x: 8 * box,
    y: 8 * box
}

let comida= {
    x: Math.floor(Math.random() * 480 / box)* box + box,
    y: Math.floor(Math.random() * 480 / box)* box + box,
}

let direction = "up";
const scoreDisplay = document.querySelector('[data-input]');
let scorePoints = 0;
let gameSpeed = 115;
let gameOver = document.querySelector('[data-over]');
let gameOverButton = document.querySelector('[data-game-over__button]');
let recordShow = document.querySelector('[data-record]');
let recordArray = JSON.parse(window.localStorage.getItem('record'));

function criaBackground() {
    context.fillStyle = 'black';
    context.fillRect(0 ,0 ,16*box, 16 * box)
}

function criaCobrinha() {
    for (i= 0; i < snake.length; i++) {
        context.fillStyle = 'white';
        context.fillRect(snake[i].x -box,snake[i].y -box, box, box )   
    }   
}

function criaComida(){
    context.fillStyle = '#62635d ';
    context.fillRect(comida.x, comida.y, box, box)
    
}

document.addEventListener('keydown',update);

function update(event){    
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down' ; 
}

function getMaxOfArray(array) {
    return Math.max.apply(null, array);
}


function iniciarJogo() {
    criaBackground();
    criaCobrinha();
    criaComida();
    
    recordArray = JSON.parse(localStorage.getItem('record'));

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let comidaX = comida.x;
    let comidaY = comida.y;
    
   
    if (direction == 'right') snakeX += box    
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY -= box
    if (direction == 'down') snakeY += box
    
    if (snakeY < box ) snakeY = 512
    if (snakeY > 513 ) snakeY = box
    if (snakeX < box ) snakeX = 512
    if (snakeX > 513 ) snakeX = box
    
    if (snakeY == comidaY + box && snakeX  == comidaX + box)  {
        let countPoints = 10
        scoreDisplay.textContent = scorePoints + countPoints ;
        scorePoints = countPoints + scorePoints;
        comida = {
        x: Math.floor(Math.random() * 480 / box)* box,
        y: Math.floor(Math.random() * 480 / box)* box 
        }
        
        let newHead = {
            x: snakeX,
            y:  snakeY
        }
        snake.unshift(newHead)
    }   

    snake.pop();
    let newHead = {
        x: snakeX,
        y:  snakeY
    }
    snake.unshift(newHead);

    for (i = 2; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y ) {
            let record = JSON.parse(localStorage.getItem('record'))  || [];
            const recordRegister = [...record, scorePoints];
            localStorage.setItem('record',JSON.stringify(recordRegister));
            window.clearInterval(jogo);
            gameOver.classList.add('game-over--show');

            scorePoints = 0 ;
            
            let sankeLength  = snake.length; 
            snake.length = sankeLength - sankeLength + 1;
                 
        }
    }  
}

let jogo;
if (recordArray == null) {
    jogo  =  setInterval(iniciarJogo, gameSpeed)
    
}else{

    recordShow.textContent = Math.max(...recordArray);
    jogo  =  setInterval(iniciarJogo, gameSpeed)
}

gameOverButton.addEventListener('click', ()=>{
    gameOver.classList.remove('game-over--show');
    recordArray = JSON.parse(window.localStorage.getItem('record'));
    recordShow.textContent = Math.max(...recordArray);
    jogo =  setInterval(iniciarJogo, gameSpeed)
    scoreDisplay.textContent = 0
})
