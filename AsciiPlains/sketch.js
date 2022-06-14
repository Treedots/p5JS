    
    let font_bold, font_light, font_medium, font_reg, font_ret,font_semibold;
    function preload(){
      font_bold =  loadFont("../Font/FiraCode-Bold.ttf");
      font_light = loadFont("../Font/FiraCode-Light.ttf");
      font_medium  = loadFont("../Font/FiraCode-Medium.ttf");;
      font_reg = loadFont("../Font/FiraCode-Regular.ttf");
      font_ret = loadFont("../Font/FiraCode-Retina.ttf");
      font_semibold = loadFont("../Font/FiraCode-SemiBold.ttf");
    }
    
    let cell_size = 16;
    let widthy,heighty;
    function setup() {
    createCanvas(800, 800);
    widthy = width/16;
    heighty = height/16;
    }
  
  let xoff=0;
  let yoff=0;

  class player{
    constructor(x,y){ 
      this.x = x;
      this.y = y;
    }
    update(){

    }
    draw(){

    }
  }
  let s = '._//#|+"';
  let c1 = '/|\\'
  let age = 0;
  function draw() {
    background(0);
    textFont(font_light);
    fill('green')
      .strokeWeight(0)
      .textSize(cell_size);
    
    for(y=0;y<heighty;y++){
      for(x=0;x<widthy;x++){
        let n =  noise((x+xoff)*cell_size*0.01,(y+yoff)*cell_size*0.01)*cell_size-cell_size/2;
        let a = n%(cell_size/2);
        let b = n/(cell_size/2);
        let c = s[floor(abs(a%8))];
        if(c=="/"){
          c = c1[floor(abs(a%3))];
        }
        text(c,x*cell_size+a,y*cell_size+b);
      }
    }
    xoff += 1;
    yoff += 1;
  }