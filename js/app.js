var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;
var dy = -2;

var paddleHeight = 12;
var paddleWidth = 95;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

const speech = document.querySelector('.speech');
const speech2 = document.querySelector('.speech2');


var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 30;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;



var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var score = 0;
var lives = 3;


// <<--------les controls----------->>
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2.10;
  }
}

function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}
// <<--------les controls fin----------->>

function drawBall() { //creation de la ball
    
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowColor = "black";
    ctx.fillStyle = "#93C1D7";
    ctx.fill();
    ctx.closePath();
    
  }
  

  function drawPaddle() { //creation de la raquette  
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
              var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#0095DD";
              ctx.fill();
              ctx.closePath();
          }
      }
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
          var b = bricks[c][r];
          if(b.status == 1) {
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                  dy = -dy;
                  b.status = 0;
                  score++;
                 
            
                  if(score == brickRowCount*brickColumnCount) {
                    speech2.classList.toggle('visible');
                    alert(`C'est gagn??, Bravo! ???? votre score : ${score}/15`);
                    document.location.reload();
                     // Needed for Chrome to end game
                }
              }
          }
      }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks()
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) { // D??placement de la balle
       
      dx = -dx;
      
     } 
     
    //  faire rebondire la ball  
     if(y + dy < ballRadius) {
      dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth ) {
        dy = -dy;
        dy=-4; dx=4;

    }else{
      lives--;
     
      if(!lives) { 
        speech.classList.toggle('visible');
        alert(`GAME OVER ???? votre score :  ${score}/15`);
      document.location.reload();
       // Needed for Chrome to end game
    }
    else{
      x = canvas.width/2;
      y = canvas.height-30;
      dx = 3;
      dy = -5;
      paddleX = (canvas.width-paddleWidth)/2;
    }
    }
      
  }
  
     
     if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
  }

    x +=dx;
    y +=dy;

    requestAnimationFrame(draw);
}

draw();

  

