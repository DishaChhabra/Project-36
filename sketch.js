var dog,sadDog,happyDog;
var feedButton, addButton;
var foodObj;
var fedTime;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database()

  foodObj = new Food()

  foodStock = database.ref("foodStock").on("value", readStock)

  feedButton = createButton("Click To Feed The Dog")
  feedButton.position(500,100)
  feedButton.mousePressed(feedDog)

  addButton = createButton("Click To Add Food")
  addButton.position(680,100)
  addButton.mousePressed(addFood)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);
  foodObj.display()
  fedTime = database.ref("fedTime").on("value", function(data){
    lastFed = data.val()
  })
 console.log(lastFed)
  drawSprites();
  fill("white")
  textSize(15)
  if(lastFed>12){
    text("LAST FED AT : " + lastFed + "PM", 90, 35)
  } 
  if(lastFed<12){
    text("LAST FED AT : " + lastFed + "AM", 90, 35)
  }
  if(lastFed === 12){
    text("LAST FED AT : 12 NOON", 90, 35)
  }
}

//function to read food Stock
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}
//function to update food stock and last fed time
function feedDog(){
  console.log("feedDog")
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    foodStock:foodObj.getFoodStock(),
    fedTime:hour()
  })
}
//function to add food in stock
function addFood(){
  console.log("addFood")
  foodS++
  database.ref("/").update({
    foodStock: foodS
  })
}