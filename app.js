const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const reload = document.querySelector("#replay");
const game = document.querySelector('.game')
const darkMode = document.querySelector("#dark");
const playPause =document.querySelector("#playPause")
darkMode.addEventListener('click',function(){
    console.log("working");
    game.classList.toggle('change');
    grid.classList.toggle('changeGrid');
    
})
reload.addEventListener('click',function(){
    window.location.reload();
})



const playButton = document.querySelector('.play');
const frontPage = document.querySelector('.front-page');
playButton.addEventListener('click',function(){
    game.style.display = 'block';
    game.style.pointerEvents = "all";
    frontPage.classList.add('front-change');

    


let score = 0;
const blockWidth = 100;
const  blockHeight = 20;
const boardWidth = 670;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
let xDirection = 2;
let yDirection = 2;
const userStart = [230,10];
const ballStart = [270,40];
let ballCurrentPosition = ballStart;
let currentPosition = userStart;
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis+blockWidth,yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth,yAxis+blockHeight]
    }
}
const blocks =[
    new Block(10,270),
    new Block(120,270),
    
    new Block(340,270),
    new Block(450,270),
    
    new Block(10,240),
    new Block(120,240),
    
    new Block(340,240),
    new Block(450,240),
   
    new Block (10,210),
    new Block(120,210),
    new Block(230,210),
    
    new Block(450,210),
    new Block(560,210),
   
]
const specialBlocks=[
    new Block(230,270),
    new Block(560,270),
    new Block(560,240),
    new Block(340,210),
    new Block(230,240),
]
console.log(blocks);
function addBlock(){
    for(let i=0;i<blocks.length;i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0]+'px';
        block.style.bottom = blocks[i].bottomLeft[1]+'px';
        grid.appendChild(block);
    }
    for(let i=0;i<specialBlocks.length;i++){
        const specialBlock = document.createElement('div');
        specialBlock.classList.add('specialBlocks');
        specialBlock.style.left = specialBlocks[i].bottomLeft[0]+'px';
        specialBlock.style.bottom = specialBlocks[i].bottomLeft[1]+'px';
        grid.appendChild(specialBlock);
    }

}
addBlock()

//add user

const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();
function drawUser(){
    user.style.left = currentPosition[0]+'px';
    user.style.bottom = currentPosition[1]+'px';
}

function drawBall(){
    ball.style.left = ballCurrentPosition[0]+'px';
ball.style.bottom = ballCurrentPosition[1]+'px'
}
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0]>0){
                currentPosition[0] -= 10
                drawUser();
                
            }
            break;
           

        case 'ArrowRight':
            if(currentPosition[0]<boardWidth-blockWidth){
                currentPosition[0] += 10
                drawUser();
                
            }
            break;
            
    }
}

document.addEventListener('keydown',moveUser);

//ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//moveball

function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}
timerId = setInterval(moveBall,15)

//check for collisions

function checkForCollisions(){

    //check for block collision
    for(let i=0;i<blocks.length;i++){
        if(
            (ballCurrentPosition[0]>blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0] )&&
            ((ballCurrentPosition[1]+ballDiameter)>blocks[i].bottomLeft[1] && ballCurrentPosition[1]<blocks[i].topLeft[1])){
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                // console.log(allBlocks);
                allBlocks[i].classList.remove('block');
                blocks.splice(i,1);
                changeDirection();
                score++;
                scoreDisplay.innerHTML= score


            }
        
    }
    //check for specialblock collision
    for(let j=0;j<specialBlocks.length;j++){
        if(
            (ballCurrentPosition[0]>specialBlocks[j].bottomLeft[0] && ballCurrentPosition[0]<specialBlocks[j].bottomRight[0] )&&
            ((ballCurrentPosition[1]+ballDiameter)>specialBlocks[j].bottomLeft[1] && ballCurrentPosition[1]<specialBlocks[j].topLeft[1])){
                const allBlocks = Array.from(document.querySelectorAll('.specialBlocks'))
                // console.log(allBlocks);
                allBlocks[j].classList.remove('specialBlocks');
                specialBlocks.splice(j,1);
                changeDirection();
                score+=2;
                scoreDisplay.innerHTML= score


            }
        
    }
    
    if(ballCurrentPosition[0] >= (boardWidth-ballDiameter)|| 
    ballCurrentPosition[1]>=(boardHeight-ballDiameter)||
    ballCurrentPosition[0]<=0){
        changeDirection();
    }

    //check for user collisions
    if(
        (ballCurrentPosition[0]>currentPosition[0] && ballCurrentPosition[0]<currentPosition[0]+blockWidth)&&
        (ballCurrentPosition[1]>currentPosition[1] && ballCurrentPosition[1]<currentPosition[1]+blockHeight))
        {
            changeDirection();
        }
    //check for win
    if(blocks.length===0){
        scoreDisplay.innerHTML = "You win";
        clearInterval(timerId);
        
    }
   
    //check for game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId);
        scoreDisplay.innerHTML='You Lose';
        
    }
}
function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        xDirection = -2
        return
    }
    if(xDirection===-2 && yDirection===2){
        yDirection =-2;
        return;
    }
    if(xDirection ===-2 && yDirection===-2){
        xDirection= 2;
        return;
    }
    if(xDirection ===2 && yDirection===-2){
        yDirection =2;
        return;
    }
}

})