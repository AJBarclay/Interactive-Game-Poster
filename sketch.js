let lrsCount = 0;
let pluck1;
let lat = 0;
function preload() {
  Odin = loadFont('assets/Odin Rounded - Bold.otf');
  earth = loadImage('assets/EarthHD.png');
  cousin = loadImage('assets/cousin.gif');
  katamari = loadImage('assets/Katamari.png'); 
  
  soundFormats('mp3');
  pluck1 = loadSound('assets/KatamariPluck1.mp3');
  pluck2 = loadSound('assets/KatamariPluck2.mp3');
  pluck3 = loadSound('assets/KatamariPluck3.mp3');
  lrs1 = loadSound('assets/Katamari Damacy OST - Lonely Rolling Star p1.mp3');
  lrs2 = loadSound('assets/Katamari Damacy OST - Lonely Rolling Star p2.mp3');
  lrs3 = loadSound('assets/Katamari Damacy OST - Lonely Rolling Star p3.mp3');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  fullscreen();
  noCursor();
  plucks = [pluck1,pluck2,pluck3];
  lrs1.play();
  
  let red = color('#fd7e72');
  let yellow = color('#fffcad');
  let green = color('#b5dd7e');
  let blue = color('#a2d6f9');
  let white = color('white');
  
  
  push();
  imageMode(CENTER);
  translate(mouseX,mouseY);
  rotate(PI/2 * (mouseX+mouseY)/(windowWidth/6));
  katamariImage = image(katamari,0,0, 300, 300);
  pop();
  push();
  imageMode(CENTER);
  translate(mouseX+katamari.width/8,mouseY+katamari.height/8)
  this.cImage = image(cousin,0,0, katamari.width/8, katamari.height/8);
  pop();
  k1 = new Katamari(mouseX,mouseY,150,katamari,cousin);
  
  
  t1 = new TextBlock(80,240,'Katamari', Odin, 80, blue, k1);
  let bounds = Odin.textBounds('Katamari', 80, 240, 80);
  t12 = new TextBlock(bounds.w+11+80,240,' Damacy', Odin, 80, blue, k1);
  t2 = new TextBlock(80,160,'Keita', Odin, 80, yellow, k1);
  bounds = Odin.textBounds('Keita', 80, 160, 80);
  t22 = new TextBlock(bounds.w+11+80,160,' Takahashi', Odin, 80, yellow, k1);
  t3 = new TextBlock(80, 80,'NAMCO', Odin, 80, red, k1);
  t4 = new TextBlock(80, 320, 'Coming', Odin, 60, green, k1);
  bounds = Odin.textBounds('Coming',80,320,60);
  let t42x = 80 + 11 + bounds.w;
  t42 = new TextBlock(t42x, 320, ' Spring', Odin, 60, green, k1);
  bounds = Odin.textBounds(' Spring',t42x,320,60);
  t43 = new TextBlock(t42x+51+bounds.w, 320, ' 2004', Odin, 60, green, k1);
  
  let lastX;
  let yMod = 0;
  let c;
  let colors = [red,yellow,blue,green];
  let sentence = 'Experience the spirit of gravity and stickiness with Katamari Damacy! Guide the prince of the cosmos to grow that katamari! Everything the katamari touches will join in on the fun (touch me!)';
  words = sentence.split(" ");
  for(let x = 0; x < words.length; x++) {
    c = x%4;
    bounds = Odin.textBounds(words[x]+" ",lastX, 400, 40);
    if(lastX + bounds.w > windowWidth - 80){yMod += 50; lastX = 80;}
    if(x == 0) {lastX = 160;}
    words[x] = new TextBlock(lastX, 400+ yMod,words[x], Odin, 40, colors[c],k1);
    lastX = bounds.w + lastX;
  }
  
  
}

function draw() {
  lat++;
  background(33,29,53);
  push();
  imageMode(CENTER);
  translate(windowWidth-(earth.width/2),windowHeight-(earth.height *1)/3);
  rotate((PI/2) * (lat/18));
  earthImage = image(earth, 0,0);
  pop();
  
  if(!lrs1.isPlaying()){
    if(!lrs3.isPlaying()){
       if(!lrs2.isPlaying()){
         if(lrsCount < 3){
           lrs2.play();
         }
         else {
           lrs3.play();
         }
         lrsCount++;
       }
       }
  }
  
  
  k1.update();
  t1.update();
  t12.update();
  t2.update();
  t22.update();
  t3.update();
  t4.update();
  t42.update();
  t43.update();
  
  for(let x = 0; x < words.length; x++){
    words[x].update();
  }
}

function mouseWheel(event) {
  lat += event.delta;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


class Katamari {
  constructor (x,y,r,k,c) {
    this.x = x;
    this.y = y;
    this.r = r;
    
    this.k = k;
    push();
    imageMode(CENTER);
    translate(mouseX,mouseY);
    rotate(PI/2 * (mouseX+mouseY)/(windowWidth/6));
    this.kImage = image(this.k,0,0, this.r * 2, this.r * 2);
    pop(); 
    
    this.c = c;
    push();
    imageMode(CENTER);
    translate(mouseX+this.k.width/8,mouseY+this.k.height/8);
    this.cImage = image(this.c,0,0, this.k.width/8, this.k.height/8);
    pop();
  }
  
  update() {
    this.x = mouseX;
    this.y = mouseY;
    push();
    imageMode(CENTER);
    translate(mouseX,mouseY);
    rotate(PI/2 * (mouseX+mouseY)/(windowWidth/6));
    this.kImage = image(this.k,0,0, this.r * 2, this.r * 2);
    pop();
    
    push();
    imageMode(CENTER);
    translate(mouseX+this.k.width/8,mouseY+this.k.height/8)
    this.cImage = image(this.c,0,0, this.k.width/8, this.k.height/8);
    pop();
  }
}


class TextBlock {
  constructor(x, y, message, font, size, color, katamari) {
    this.x = x;
    this.y = y;
    this.message = message;
    this.font = font;
    this.size = size;
    this.color = color;
    this.stuck = false;
    this.katamari = katamari;
  }
  
  update() {
    
    textFont(this.font);
    textSize(this.size);
    
    let bounds = this.font.textBounds(this.message, this.x, this.y, this.size);
    this.oX = this.x + bounds.w / 2;
    this.oY = this.y + bounds.h / 2;
    this.w = bounds.w;
    this.h = bounds.h;
    
    if(this.stuck == false) {
      let d = dist(this.oX,this.oY,this.katamari.x,this.katamari.y);
      if(d < this.katamari.r*0.65) {
        this.stuck = true;
        let p = random(plucks);
        p.play();
      }
    }
    if(this.stuck == true) {
        push();
        translate(mouseX,mouseY);
        rotate(PI/2 * (mouseX+this.oX+mouseY+this.oY)/(windowWidth/6));
        fill(this.color);
        text(this.message, -bounds.w/2, -bounds.h/2);
        pop();
      }
      else {
        push();
        translate(this.x,this.y);
        fill(this.color);
        text(this.message,0,0);
        pop();
      }
  }
  
  display() {
    
  }
}