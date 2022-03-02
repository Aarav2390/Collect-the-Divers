//create variables
  var submarineImg,submarine,sharkImg,shark,sharkG
  var underwaterImg,underwater
  var diver1Img,diver1,diver2Img,diver2,diver1G,diver2G
  var explosionImg,explosion
  var diamondImg,diamond,diamondG
  var gameState = "play";
  var score = 0

function preload(){
    
 //load all images
   submarineImg = loadImage("Images/yellow_submarine.png");
   sharkImg = loadImage("Images/shark.png");
   underwaterImg = loadImage("Images/underwater.jpg.png");
   diver1Img = loadImage("Images/diver_1.png");
   diver2Img = loadImage("Images/diver_2.png");
   explosionImg = loadImage("Images/explosion.png")
   diamondImg = loadImage("Images/diamond.png");
}

function setup() {
 //set canvas size
  createCanvas(600,350);

 //add submarine and underwater scene image
  underwater = createSprite(350,175);
  submarine = createSprite(85,200);
  
 
   submarine.addImage(submarineImg);
   underwater.addImage(underwaterImg);
   
   underwater.scale = 1.45
   submarine.scale = 0.55

   submarine.debug = false
   submarine.setCollider("rectangle",0,-10,submarine.width,130)
   
   diver2G = createGroup();
   diver1G = createGroup();
   sharkG = createGroup();
   diamondG = createGroup();
   
   
 }

function draw() {
 //set background
 background(0);

   
   if(gameState == "play"){

   

 
    submarine.y = World.mouseY;

    if(frameCount % 330 == 0){
      spawnSharks();
    }
    
    if(frameCount % 200 == 0){
      spawnDiver1();
    }
    
    if(frameCount % 275 == 0){
      spawnDiver2();
    }

    if(frameCount % 2000 == 0){
      spawnDiamond();
    }

    
    //spawnSharks function
      function spawnSharks(){
       shark = createSprite(650,random(30,300));
       shark.addImage(sharkImg);
       shark.velocityX = -4;
       sharkG.lifetime = 300;
       sharkG.bounceOff(submarine)
       sharkG.add(shark)
       shark.scale = 0.4
      //Speed gets faster
       if(score % 4 === 0){
        shark.velocityX = shark.velocityX-3;
       }
       
      }

      function spawnDiver1(){
        diver1 = createSprite(650,random(30,300));
        diver1.addImage(diver1Img);
        diver1.velocityX = -3;
        diver1G.lifetime = 300;
        diver1.scale = 0.2
        diver1G.add(diver1)
      //Speed gets faster
       if(score % 4 === 0){
         diver1.velocityX = diver1.velocityX-1;
       }
      }

      function spawnDiver2(){
        diver2 = createSprite(600,random(30,300));
        diver2.addImage(diver2Img);
        diver2.velocityX = -3;
        diver2G.lifetime = 300;
        diver2.scale = 0.2
        diver2G.add(diver2);
      //Speed gets faster
       if(score % 4 === 0){
         diver2.velocityX = diver2.velocityX-3;
       }
      }

      function spawnDiamond(){
        diamond = createSprite(600,random(30,300));
        diamond.addImage(diamondImg);
        diamondG.add(diamond)
        diamond.velocityX = -4;
        diamond.lifetime = 300;
        diamond.scale = 0.3
      }

      if(diver1G.isTouching(submarine)){
        score = score+1;
        diver1G.destroyEach();
      }

      if(diver2G.isTouching(submarine)){
        score = score+1;
        diver2G.destroyEach();
      }

      if(sharkG.isTouching(submarine)){
        gameState = "end"
      }

      if(diamondG.isTouching(submarine)){
        gameState = "win"
      }
    }
      
      if(gameState == "end"){

      
        sharkG.destroyEach();
        diver1G.destroyEach();
        diver2G.destroyEach();
        
        submarine.velocityY = 0;
          
        explosion = createSprite(submarine.x,submarine.y)
        explosion.addImage(explosionImg)
        explosion.scale = 0.5

        
      }    

      if(gameState == "win"){
        diver1G.destroyEach();
        diver2G.destroyEach();
        sharkG.destroyEach();
        diamond.scale = 1.7
        diamond.x = 200
        diamond.y = 200
        diamond.x = 200
        diamond.y = 200
      }
      

     drawSprites();

     textSize(14)
      fill("red")
      text("Divers collected: "+score,450,20);

    
    }
   






 
