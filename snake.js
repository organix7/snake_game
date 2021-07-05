function init(){
    for (let i = 0; i < width; i++)
        for (let j = 0; j < height; j++)
            squarePosition[i][j] = {x:40*i+2,y:40*j+2}

    drawGrid()
    drawSnake(snakePos.length,direction)
}

function reset(){
    if(score > bestScore){ // change best score
        bestScore = score
        bestScoreText.textContent = bestScore
    }
    score=0
    shiftedPos = null
    clearInterval(interval)
    canvas = document.getElementById("canvas") //canvas 600x600px
    ctx = canvas.getContext("2d")
    snakePos = [{x:5,y:7},{x:6,y:7},{x:7,y:7}]
    direction = 'r' // r = rigth; l = left; u = up, other = down
    rate = 1000
    foodPos = getFood()
    init()
    framerate(rate)
}

function drawGrid(){
    ctx.fillStyle = "#003366"

    for (let i = 0; i < width; i++) 
        for (let j = 0; j < height; j++)
            ctx.fillRect(squarePosition[i][j].x,squarePosition[i][j].y,square,square)   
}

function drawSnake(l){
    ctx.fillStyle = "#FFFF00"

    for (let i = 0; i < l-1; i++) 
        ctx.fillRect(squarePosition[snakePos[i].x][snakePos[i].y].x,squarePosition[snakePos[i].x][snakePos[i].y].y,square,square)
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(squarePosition[snakePos[snakePos.length-1].x][snakePos[snakePos.length-1].y].x,squarePosition[snakePos[snakePos.length-1].x][snakePos[snakePos.length-1].y].y,square,square)
}

function drawFood(){
    ctx.fillStyle = "#7D00FF"

    let x = foodPos.x
    let y = foodPos.y
    ctx.beginPath();
    ctx.arc(squarePosition[x][y].x+18, squarePosition[x][y].y+18, 18, 0, 2 * Math.PI)
    ctx.fill()
}

function eatFood(){
    if(snakePos[snakePos.length-1].x === foodPos.x && snakePos[snakePos.length-1].y === foodPos.y){
        ++score
        scoreText.textContent=score
        rate = rate-(rate*0.03)//increase rate
        clearInterval(interval)
        framerate(rate)
        snakePos.unshift(shiftedPos)//add length
        let goodFood = true
        do{ //add a food not on the snake
            goodFood = true
            foodPos = getFood()
            for (let i = 0; i < snakePos.length; i++)
                if(snakePos[i].x === foodPos.x && snakePos[i].y === foodPos.y)
                    goodFood = false
        }while(!goodFood)
    }
}

function positionSnake(l,d){
    let x = snakePos[l-1].x
    let y = snakePos[l-1].y
    shiftedPos = snakePos.shift()
    direction = d

    if(d==='r'){
        ++x
        if(x>width-1)
            snakePos.push({x:0,y:y})
        else
            snakePos.push({x:x,y:y})
    }
    else if(d==='l'){  
        --x
        if(x<0)
            snakePos.push({x:width-1,y:y})
        else
            snakePos.push({x:x,y:y})
    }
    else if(d==='u'){
        --y
        if(y<0)
            snakePos.push({x:x,y:height-1})
        else
            snakePos.push({x:x,y:y})
    }
    else{
        ++y
        if(y>height-1)
            snakePos.push({x:x,y:0})
        else
            snakePos.push({x:x,y:y})
    }
}

function getFood(){
    let x = Math.floor(Math.random()*15)
    let y = Math.floor(Math.random()*15)
    return {x:x,y:y}
}

function game(){
    positionSnake(snakePos.length,directionTemp)
    hitCheck()
    drawGrid()
    eatFood()
    drawFood()
    drawSnake(snakePos.length)
}

function hitCheck(){
    for (let i = 0; i < snakePos.length-1; i++) {
        if(snakePos[snakePos.length-1].x === snakePos[i].x && snakePos[snakePos.length-1].y === snakePos[i].y){
            reset()
            break
        }
    }
}

function framerate(rate){
    interval = setInterval(game,rate)
}

document.addEventListener("keydown",(e) => { //snake's controls
    if(e.key === "ArrowRight" && direction !== 'l')
        directionTemp = 'r'
    else if (e.key === "ArrowLeft" && direction !== 'r')
        directionTemp = 'l'
    else if (e.key === "ArrowUp" && direction !== 'd')
        directionTemp = 'u'
    else if (e.key === "ArrowDown" && direction !== 'u')
         directionTemp = 'd'
})

let scoreText = document.getElementById("scoreNumber")
let score = 0
let bestScoreText = document.getElementById("bestScoreNumber")
let bestScore = 0
scoreText.textContent=score
bestScoreText.textContent=score
let canvas = document.getElementById("canvas") //canvas 600x600px
let ctx = canvas.getContext("2d")
let snakePos = [{x:5,y:7},{x:6,y:7},{x:7,y:7}]
let direction = directionTemp = 'r' // r = rigth; l = left; u = up, other = down
let rate = 700
let square = 36 
let width = height = 15
let squarePosition = [width];
let foodPos = getFood()
let shiftedPos
let interval
for (let i=0;i<width;i++) 
    squarePosition[i] = [height];

init()
framerate(rate)
