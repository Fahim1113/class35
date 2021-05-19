var ball;
var ball1, database, position;

function setup(){
    //database added
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //refer to the database
    ball1=database.ref("ball/position")
    //creating a listner which keeps listning to the changes
    ball1.on("value", readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //refering the values and changing it
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
}
function readPosition(data){
    //read the data from the database
    position=data.val()
    //assigning the position of the ball sprite with the database position
    ball.x=position.x;
    ball.y=position.y;

}
function showError(){
    console.log("errorin writing the values in the database")
}