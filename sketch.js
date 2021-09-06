//CREATED BY AADI GOLECHA ON 3RD SEPTEMBER 2021
//feed the bunny level up

//nameSpacing to make our code more readable
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

//declaring all the required variables
var rope,fruit,ground;
var floor;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,button2;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

var bubble, bubbleImg, blank, bubble_sound;
var melon_bubble;
var flying = false;

function preload()
{
  //loaded all the images needed
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg = loadImage('bubble.png');
  melon_bubble = loadImage('bubble_melon.png');
  blank = loadImage('blank.png');

  //loaded sounds
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  bubble_sound = loadSound('bubble.mp3');

  //made animation with a number of images 
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
    canW = 900;
    canH = 800;
    createCanvas(canW, canH);
  
  frameRate(80);

  //playing background music
  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,300);
  button.size(60,60);
  button.mouseClicked(drop);

  //btn 2
  button2 = createImg('cut_btn.png');
  button2.position(530,270);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  //blower to blow the ball
  blower = createImg('balloon.png');
  blower.position(400,100);
  blower.size(150,100);
  blower.mouseClicked(airBlow);
 
  //mute button to pause background music
  mute_btn = createImg('mute.png');
  mute_btn.position(850,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  //hanging fruit with two ropes
  rope = new Rope(7,{x:button.x,y:button.y});
  rope2 = new Rope(7,{x:button2.x,y:button2.y});

  //created ground and floor for bunny
  ground = new Ground(200,canH,6000,20);
  floor = new Ground(700, 200, 100, 20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  //created the bunny 
  bunny = createSprite(700,120,100,100);
  bunny.scale = 0.2;

  //added all the required animations
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
 
  //created the bubble to give levation to the fruit
  bubble = createSprite(680, 500, 10,10);
  bubble.addImage('blank',blank);
  bubble.addImage('empty_bubble',bubbleImg);
  bubble.changeImage('empty_bubble');
  bubble.scale = 0.14;
  
  //created fruit and added it to the chain
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  //made two new connection between ropes and fruit
  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW + 80, canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();
  floor.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
    drop2();
    fruit.position.x = -400
    fruit.isStatic = true;
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }

   if(fruit!=null && fruit.position.y<=-40)
  {
    flying = false;
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
    drop2();
   }
   
   fly();
   if(fruit!=null)
        {
         var d = dist(fruit.position.x,fruit.position.y,bubble.position.x,bubble.position.y);
          if(d<=80)
            {
              bubble_sound.play();
              flying = true
              bubble.position.x = 4000;
            }
         }
  }

  //drop function to disconnet the rope1
function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

//drop function to disconnet the rope2
function drop2()
{
  fruit_con_2.detach();
  cut_sound.play();
  rope2.break();
  fruit_con_2 = null;
}


//collide function to check collision between body and sprite
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

//function to mute and unmute the background music
function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

//fly function to make to melon fly 
function fly()
{
  if(flying === true)
  {
    Body.setVelocity(fruit, {x:0,y:-4});
    imageMode(CENTER);
    image(melon_bubble,fruit.position.x,fruit.position.y,70,70);
    bubble.changeImage('blank',blank);
  }
}

//airblow function to blow the melon
function airBlow()
{
  console.log('air');
  Matter.Body.applyForce(fruit, {x:0 , y :0 }, {x : 0.1 , y : 0 } );
  air.play();
}