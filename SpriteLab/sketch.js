

let img;
let color_scheme;
let img_pallete = {};
let gridImage = [];
function preload() {
    // preload() runs once
    img = loadImage("https://raw.githubusercontent.com/michael-lazar/playscii/master/charsets/jpetscii.png");
    console.log(img.width);
  }

function setup() {
   
    color_scheme = [color("#312629"),color("#463c3c"),color("#62554c"),color("#8b6a44"),color("#8a8969"),color("#b4c788"),color("#f7ffc5"),color("#d6f5e4")];
    
    for(x=0;x<img.width/8;x++){
        for(y=0;y<img.height/8;y++){
            let arr = img.get(x*8,y*8,8,8);
            let t = x+"|"+y;
            img_pallete[t] = arr;
        }
    }
    for(let x=0;x<800/8;x++){
        for(let y=0;y<800/8;y++){
            let x1 = new cell(x,y,"1|2");
            gridImage.push(x1);
        }

    }
    noSmooth();
    createCanvas(800, 816);
    for(i=0;i<gridImage.length;i++){
        gridImage[i].update();
    }
  }

  let z = 0;

  class cell{
    constructor(x,y,index){
        this.x = x;
        this.y = y;
        this.index = index;
    }
    draw() {
        console.log(this.index);
        image(img_pallete[this.index],this.x*8,this.y*8);
    }
    update(){
        let n = noise(this.x*0.2+z,this.y*0.2,1)*256;
        let h = noise(this.x*0.2+z,this.y*0.2,1)*64;
        let a = floor(n % 16);
        let b = floor(n/16);
        let hue1 = floor(h%8);
        let hue2 = floor(h/8);
        this.index = a +"|"+ b;
        //console.log(this.index);
    }
  }

  function updateImage(){
    
    
    for(let x=0;x<800/8;x++){
        for(let y=0;y<800/8;y++){
            
            image(img_pallete[hue2],x*8,y*8,8,8,15*8,15*8,8,8);           
            image(img_pallete[hue1],x*8,y*8,8,8,a*8,b*8,8,8);
            
        }
    }
    if(!imageB){
        console.log(get(200,200));
        imageB = true;
    }
  }

  function draw() {
    z += 0.01;
    
    background(color_scheme[0]);
    for(i=0;i<gridImage.length;i++){
        gridImage[i].draw();
    }
    fill(color_scheme[7]);
    rect(floor(mouseX/8)*8,floor(mouseY/8)*8,8,8);
    textSize(16)
    text(floor(mouseX/8) +"/"+ floor(mouseY/8),0,400);
    
    text(frameRate(), 0, height);
  }