var path,train, leftBoundary,rightBoundary;
var pathImg,trainImg;
var i;
var coinIMG;
var coinsGroup;
var obs1,obs2;
var obstaclesGroup;

//GAMESTATES
var PLAY=1;
var END=0;
var gameState=PLAY;

var gameOverIMG,gameOver,restartIMG,restart;
var score=0;

function preload(){
  pathImg = loadImage("track.jpg");
  trainImg = loadImage("train.png");
  coinIMG =  loadImage("coin.png");
  obs1=loadImage("bomb.png");
  obs2=loadImage("oil-spilled-black-barrel-isolated-white-background-130246029-removebg-preview.png");
  gameOverIMG=loadImage("gameOver.png");
  restartIMG=loadImage("restart.png");
}

function setup(){
  
  createCanvas(840,655);
  push(); 
// Moving background
path=createSprite(420,300,50,50);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=4.3;




imageMode("CENTER");
pop();

//creating boy running
train = createSprite(180,340,30,30);
train.scale=0.4;
train.addImage("train",trainImg);
  
//creating gameover and restart
gameOver=createSprite(400,300,80,20);
gameOver.addImage(gameOverIMG);
gameOver.scale=0.9;
gameOver.visible=false

restart=createSprite(400,400,80,20);
restart.addImage(restartIMG);
restart.scale=0.9;
restart.visible=false

// create left Boundary
leftBoundary=createSprite(80,0,100,800);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(735,0,100,800);
rightBoundary.visible = false;

coinsGroup=new Group();
obstaclesGroup=new Group();

}

function draw() {
  
  background(0);

  textSize(30);
  fill("blue")
  //text("score:"+score,500,200);
  text(`Score:${score}`, 400, 150); 
  textAlign(CENTER, CENTER);
  

  
  if(gameState===PLAY){
     if(train.isTouching(coinsGroup)){
        coinsGroup.destroyEach();

          score=score+5;
     }
     path.velocityY = 4;

     

       // boy moving on Xaxis with mouse
  train.x = World.mouseX;
  
  edges= createEdgeSprites();
  train.collide(edges[3]);
  train.collide(edges[1]);
  train.collide(leftBoundary);
  train.collide(rightBoundary);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }

  spawnCoins();
  spawnObstacles();

  if(train.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    gameState =END
  }
}
else if(gameState===END){
  gameOver.visible=true;
  restart.visible=true;

  path.velocityY=0;
  train.velocityY=0;

  obstaclesGroup.setVelocityYEach(0);
  coinsGroup.setVelocityYEach(0);

  if(mousePressedOver(restart)){
 reset();
  }
}
  drawSprites();
}


function spawnCoins(){
 if(frameCount%60==0){
 var coin=createSprite(600,120,40,10);
 coin.x=Math.round(random(80,600));
 coin.addImage(coinIMG);
 coin.scale=0.5
 coin.velocityY=10;
 coin.lifetime=-1;
 coin.depth=train.depth;
 train.depth=train.depth+1;
coinsGroup.add(coin);
 }
}

function spawnObstacles(){
  if(frameCount%60==0){
  var obstacle=createSprite(80,80,40,10);
  obstacle.x=Math.round(random(60,800));
  obstacle.velocityY=5;
  var rand = Math.round(random(1,2));
  switch(rand){
  case 1 : obstacle.addImage(obs1);
             break;
 
 case 2 : obstacle.addImage(obs2);
             break;
default:break;

  }
  obstacle.scale=0.1
  obstacle.lifetime=-1;
  obstaclesGroup.add(obstacle);
  obstacle.depth=train.depth;
  train.depth=train.depth+1;
  }
 }

 function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  score=0;
 }

