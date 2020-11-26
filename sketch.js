PLAY=0;
END=1;
var gameState=PLAY;
var monkey , monkey_running ;
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,360);
  
  monkey = createSprite(80,288,20,20);
  monkey.addAnimation("runninig",monkey_running);
  monkey.scale=0.2;
  
  ground = createSprite(400,354,1320,10);
  
  ground.x = ground.width/2;
  
  score=0;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,350,monkey.height);
  monkey.debug = false;
  
}


function draw() {
  background("brown");

  stroke("yellow");
  textSize(18);
  fill("yellow");
  text("score : " + score,490,50);
  
  stroke("black");
  textSize(18);
  fill("black");
  
  text("SurvivalTime : " + survivalTime,90,50);
  
  
  if(gameState===PLAY) {
  survivalTime=Math.ceil(frameCount/frameRate());
  
  if(monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score+1;
  }
  
  
  
  
  spawnBananas();
  spawnObstacle();
    
  }
  
  
  if(ground.x<0) {
    ground.x= ground.width/2;
    
  }
  
  ground.velocityX = -4;
    monkey.collide(ground);
  
  if(keyDown("space") && monkey.y>=250){
    monkey.velocityY = -12;
    console.log(monkey.y);
  }
  
   monkey.velocityY= monkey.velocityY + 0.8;
  
    if(gameState===END) {
      obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach();
      score = 0;
      survivalTime=survivalTime+0;
      
    }
  
  if(gameState===PLAY && monkey.isTouching(obstacleGroup)) {
  gameState=END;
  }
  
  drawSprites();
}

function spawnBananas() {
  if(frameCount%80===0) {
    banana = createSprite(300,Math.round(random(130,300),20,20));
    banana.addImage(bananaImage);
    banana.scale= 0.1;
    banana.velocityX = - 7;
    banana.lifetime = 90;
    FoodGroup.add(banana);
  }
}
function spawnObstacle() {
  if(frameCount%200===0) {
    obstacle = createSprite(Math.round(random(300,500)),335,20,20);
    obstacle.addImage(obstacleImage) ;
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 90;
    obstacleGroup.add(obstacle);
  }
}





