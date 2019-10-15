var mySong;
var analyzer;
var allMyEllipse = [];
var amountOfEllipse = 50;
var volume = 0;

function preload() {
  mySong = loadSound("./assets/Chad_Crouch_-_Algorithms.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // The analyzer allows to perform analysis on a sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  for (var i = 0; i < amountOfEllipse; i++) {
    var tempx = random() * windowWidth;
    var tempy = random() * windowHeight;
    var tempr = volume + 10;


    var tempEllipse = new Ellipse(tempx, tempy, tempr);
    tempEllipse.color = color(random() * 255, random() * 255, random() * 255);



    allMyEllipse.push(tempEllipse);

  }

}

function draw() {

  if (mouseIsPressed) {
    background('black');
    if (mySong.isPlaying() == false) {
      mySong.play();
      fill('limegreen');
    }

    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, height);
  } else {
    background('white');
    mySong.stop();
    fill('white');
  }
  noStroke();
  for (var i = 0; i < allMyEllipse.length; i++) {

    var tempEllipse = allMyEllipse[i];

    tempEllipse.move();
    tempEllipse.display();
  }

  textAlign(CENTER, CENTER);
  textSize(32);
  textFont('Anton');
  fill('#999999');
  text('keep pressed', windowWidth / 2, windowHeight - 60);
}

function Ellipse(_x, _y, _diameter) {

  this.size = _diameter;
  this.x = _x;
  this.y = _y;
  this.speed = 2;
  this.color = 'white';

  var xIncrease = this.speed;
  var yIncrease = this.speed;

  this.move = function() {
    this.x += xIncrease;
    this.y += yIncrease;

    //vertical bouncing
    if (this.y > windowHeight || this.y < 0) {
      yIncrease = -yIncrease;
    }

    //horizontal bouncing
    if (this.x > windowWidth || this.x < 0) {
      xIncrease = -xIncrease;
    }
  }

  this.display = function() {
    fill(this.color);
    push();
    translate(this.x, this.y);
    ellipse(volume + 10, volume + 10, volume + 10);
    pop();
  }
}
