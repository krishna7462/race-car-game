var scoreArea = document.querySelector(".score");
var startArea = document.querySelector(".start");
var roadArea = document.querySelector(".road");
let carPosition = { speed:3, score:0,collide:false };

let player ={ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};

startArea.addEventListener('click',startgame);

function startgame(){
    carPosition.collide=false;
    carPosition.score=0;
    //hiding the start area after click
    startArea.classList.add('hide');
    roadArea.innerHTML="";
    //startArea.setAttribute('class','hide');
    //create car 
    var car = document.createElement('div');
    car.setAttribute('class','car');
    //add car in roadArea
    roadArea.appendChild(car);
    carPosition.x = car.offsetLeft;
    carPosition.y =  car.offsetTop;
    //create lines
    for(var i =0;i<6;i++){
        var line = document.createElement("div");
        line.classList.add("lines");
        //give the space from top
        line.y = (i*80);
        line.style.top = line.y+"px";
        //add line in roadArea
        roadArea.appendChild(line);
    }
    window.requestAnimationFrame(renderGame);
    for(var i =0;i<4;i++){
        var enemyCar = document.createElement("div");
        enemyCar.classList.add("enemy");
        //give the space from top
        enemyCar.y = ((i+1)*140)* -1;
        enemyCar.style.top = enemyCar.y+"px";
        enemyCar.style.left = Math.floor(Math.random()*300) +"px";
        //add enemyCar in roadArea
        roadArea.appendChild(enemyCar);
    
    }
}

document.addEventListener('keyup',Unpress);
document.addEventListener('keydown',press);


function press(e){
    e.preventDefault();
    player[e.key] = true;
}               
function Unpress(e){
    e.preventDefault();
    player[e.key] = false;
}               
function movelines(){
    var lines = document.querySelectorAll('.lines');
    lines.forEach(function (value) {
        if(value.y >= 500){
            value.y -= 500;
        }
        value.y += carPosition.speed+2;
        value.style.top = value.y + "px";
    })
}
function endGame(){
   carPosition.collide = true;
   startArea.classList.remove('hide');
   startArea.innerHTML= "Game Over <br> Your final score : "+carPosition.score+"<br> Press here to restart the game";
}
function MoveEnemycar(car){
    var enemycar = document.querySelectorAll('.enemy');
    enemycar.forEach(function (value) {
        if(Collision(car,value)){
            console.log("colide");
            endGame();
        }
        if(value.y >= 500){
            value.y -= 550;
            value.style.left = Math.floor(Math.random()*250) +"px";
        }
        
        value.y += carPosition.speed-1;
        value.style.top = value.y + "px";
    })
}

function Collision(mc,ec){
    mcRect = mc.getBoundingClientRect();
    ecRect = ec.getBoundingClientRect();
    
    return !((mcRect.bottom<ecRect.top)||(mcRect.top>ecRect.bottom)||(mcRect.right<ecRect.left)||(mcRect.left>ecRect.right));
}

function renderGame(millisecond){ 
   
    let car = document.querySelector('.car');
    let carLimits = roadArea.getBoundingClientRect();
    if((carPosition.collide == false)){
    movelines();
    MoveEnemycar(car);
    if(player.ArrowUp && carPosition.y > carLimits.top+60){
        carPosition.y -= carPosition.speed
    }
    if(player.ArrowDown && carPosition.y < (carLimits.bottom-100)){
        carPosition.y += carPosition.speed;
    }
    if(player.ArrowLeft && carPosition.x>0){
        carPosition.x -= carPosition.speed;
    }
    if(player.ArrowRight && carPosition.x < carLimits.width-30){
        carPosition.x += carPosition.speed;
    }
    car.style.top = carPosition.y + 'px';
    car.style.left = carPosition.x + 'px';
    window.requestAnimationFrame(renderGame);
    carPosition.score++;

    scoreArea.innerText = "Score : "+ carPosition.score;
}
};

