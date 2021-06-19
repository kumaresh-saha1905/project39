var PLAY=1;
var END=0;
var gameState=PLAY;
var house1,house2,house3;
var hgroup;
var gameOver,gameOverImage;
var g1;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
  var re;ri;
 var tension; t2;

var o1,o2,o3,o4,o5;
var coin1,coin2;
var s1;
 var ground;
var player,playerImage;
var invisibleGround;
var c1,c2;
var score=0;
var c=0;
var backgroundImage;
var cycleGroup,coinGroup,cycleGroup2;
var b;
function preload(){
playerImage=loadImage("m2.gif");

backgroundImage=loadImage("ground.png");

c1=loadImage("mainCycle1.gif");
c2=loadImage("mainCycle2.gif");
coin1=loadImage("coin1.png");
coin2=loadImage("coin2.png");

o1=loadImage("m3.gif");
o2=loadImage("m4.gif");
o3=loadImage("m5.gif");
o4=loadImage("m8.gif");
o5=loadImage("m9.gif");

s1=loadSound("jump.wav");
b=loadImage("b.png");

house1=loadImage("h1.gif");
house2=loadImage("h2.gif");
house3=loadImage("h3.png");

gameOverImage=loadImage("gameOver.png");

ri=loadImage("restart.png");

tension=loadImage("a.jpg");
}

function setup(){
createCanvas(windowWidth,windowHeight);

player=createSprite(windowWidth/2,windowHeight-85);
player.addImage(playerImage);
player.scale=0.5;
player.setCollider('circle',0,0,100);
player.debug=false;

///invisibleGround creation
invisibleGround=createSprite(0,height-50,width*2,20);
invisibleGround.visible=false;

ground = createSprite(0,height+90,2*width,2);
ground.addImage("ground",backgroundImage);
ground.scale=0.00000000000000001;
//the increasement of the ground
ground.x = width/4
ground.velocityX =-6
ground.scale=windowHeight/300;


 cycleGroup=new Group();
 cycleGroup2=new Group();
 coinGroup=new Group();
 hgroup=new Group();
score=0;
c=0;

 gameOver=createSprite(windowWidth/2,windowHeight/2);
 gameOver.addImage(gameOverImage);
 gameOver.scale=1;
 gameOver.visible=false;

 r=createSprite(gameOver.x,gameOver.y+100);
 r.addImage(ri);
 r.scale=0.2;
 r.visible=false;

t2=createSprite(gameOver.x-250,gameOver.y);
t2.addImage(tension);
t2.scale=0.5;
t2.visible=false;
}

function draw(){
 
  background(b);
  if(gameState===PLAY){
  ground.display();
  house();
  if(player.isTouching(cycleGroup2)){
    cycleGroup2.destroyEach();
    gameState=END;
    }
    if(player.isTouching(cycleGroup)){
    cycleGroup.destroyEach();
    gameState=END;
  }
  if(player.isTouching(cycleGroup) || player.isTouching(cycleGroup2))
  gameState=END;

  fill("blue");
  textSize(20);
   text("score:"+score ,windowWidth-200,13);
   score = score + Math.round(getFrameRate()/60);
   fill("red");
   text("coin :"+c ,windowWidth-700,13)
   
   if (ground.x<625){
    ground.x = ground.width;
  }
  //ground.depth=player.depth;
  player.depth=player.depth+1;

  ///invisibleGround formation
  invisibleGround.display();
  player.collide(invisibleGround);
 //you===>the player
 player.display();

 ///jumping condition========>>>>
if(keyDown("SPACE") && player.y>=height-400 ){
  player.velocityY=-10;
}

//gravitational attraction force====>
player.velocityY=player.velocityY+0.8;


 obstacle2();
obstacle();
coin();

if(player.isTouching(coinGroup)){
coinGroup.destroyEach();
s1.play();
c=c+1;
}
if (cycleGroup.isTouching(player)) {
  gameState=END;
  
}


  }else if(gameState===END){
    ground.velocityX=0;
    coinGroup.setVelocityXEach(0);
    cycleGroup.setVelocityXEach(0);
    cycleGroup2.setVelocityXEach(0);
    ground.visible=false;
    player.visible=false;
    hgroup.destroyEach();
    coinGroup.destroyEach();
    cycleGroup.destroyEach();
    cycleGroup2.destroyEach();
    cycleGroup.setLifetimeEach(-1);
    cycleGroup2.setLifetimeEach(cycleGroup2.x);
    coinGroup.setLifetimeEach(-1);
    //var i=createSprite(0,0,windowWidth*2,windowHeight*5);
    fill("blue");
  textSize(20);
   text("score:"+score ,windowWidth-200,13);
  // score = score + Math.round(getFrameRate()/60);
   fill("red");
   text("coin :"+c ,windowWidth-700,13)
   
    hgroup.setVelocityXEach(0);
    hgroup.visible=false;
    gameOver.visible=true;
    r.visible=true;

    textSize(20);
   fill("blue");
    text("try for another time with your best",20,10)
      
    player.collide(invisibleGround);

    t2.visible=true;



  }
  if(gameState===END && keyDown("SPACE")){
    score=0;
    c=0;
    gameState=PLAY;
    gameOver.visible=false;
    r.visible=false;
    t2.visible=false;
    player.visible=true;
    ground.visible=true;
   

    
    //the increasement of the ground
    ground.x = width/4
    ground.velocityX =-6
    ground.scale=windowHeight/300;
   











  }


drawSprites();
}
function obstacle(){
  if(frameCount%90===0){
  var j=createSprite(windowWidth,Math.round(random(player.y,300)));
  j.scale=0.5;
 
 j.depth =j.depth+10000;
if(gameState===END){
  j.depth=0;
}

 var rand=Math.round(random(1,2));
 if(rand===1){
   j.addImage(c1);
   j.velocityX=-4;
 }else{
   j.addImage(c2);
   j.velocityX=-4;
 }
 cycleGroup.add(j);

  }
}
 function coin(){
   if(frameCount%60===0){
     var c=createSprite(windowWidth,Math.round(random(windowWidth-150,300)));
     c.scale=0.3;
     c.velocityX=-4;
     c.depth =c.depth+100;
     if(gameState===END){
      c.depth=0;
    }
     coinGroup.add(c);
     var rand=Math.round(random(1,2));
 if(rand===1){
   c.addImage(coin1);
 }else{
   c.addImage(coin2);
 }


   }
 }
 function obstacle2(){
   if(frameCount%120===0){
  var k=createSprite(0,Math.round(random(player.y,300)));
  k.scale=0.5;
  k.velocityX=4;
  k.depth=k.depth+1000;
  if(gameState===END){
    k.depth=0;
  }
 
  var rand=Math.round(random(1,5));
  if(rand===1){
  k.addImage(o1);
  k.scale=5;
  }
  if(rand===2){
  k.addImage(o2);
  k.scale=7;
  }
  if(rand===3){
  k.addImage(o3);
  k.scale=7;
  }
  if(rand===4){
  k.addImage(o4);
  k.scale=0.5;
  }
  else{
    k.addImage(o5);
    k.scale=1;
  }
  cycleGroup2.add(k);

   }
 }
  function house(){
    if(frameCount%200===0){
      var house=createSprite(windowWidth,Math.round(random(0,20)))
      house.velocityX=-5;
     
      hgroup.add(house);
      if(gameState===END){
        
      }
      house.depth=player.depth;
      player.depth=player.depth+1;
      var r=Math.round(random(1,3));
      if(r===1){
        house.addImage(house1);
        house.scale=0.11;
      }
      if (r===2) {
        house.addImage(house2)
        house.scale=0.11;
      }else{
        house.addImage(house3);
        house.scale=0.25;
      }
    }
  }