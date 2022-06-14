
  let grid = [];
  let gridparticles = [];
  let cell_size = 16;
  let heighty,widthy;
  let particle_no = 200;
  let age = 0;
  
  class patricle_grid{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.d = createVector(random(0,2),random(0,2))
      this.spd = 4;
    };
    update(){
      this.x += this.d.x * this.spd;
      this.y += this.d.y * this.spd;

      let x_grid = floor(this.x/cell_size);
      let y_grid = floor(this.y/cell_size);
      if(x_grid>=0&&y_grid>=0&&x_grid<widthy&&y_grid<heighty){
        let ox = grid[y_grid][x_grid][0] //- x_grid*cell_size+cell_size/2;
        let oy = grid[y_grid][x_grid][1] //- y_grid*cell_size+cell_size/2;

        this.d.add(ox/2,oy/2);
        this.d.normalize();
        this.d.mult(1);
      }
      else{
        if(x_grid<0){
          this.x = width-1;
        }
        if(x_grid>widthy){
          this.x = 1;
        }
        if(y_grid<0){
          this.y = height-1;
        }
        if(y_grid>heighty){
          this.y = 1;
        }

      }
      
    }
    draw(){
      //console.log(this.x,this.y);
      let rgb = 7
      stroke(rgb_scheme[rgb],rgb_scheme[rgb+1],rgb_scheme[rgb+2],255);
      strokeWeight(cell_size/5);
      point(this.x,this.y);
      
    }
  }
  let rgb_scheme = [];
  function setup() {
    let color_scheme = [color("#29366f "),color("#3b5dc9"),color("#41a6f6"),color("#ffcd75"),color("#5d275d"),color("#a7f070"),color("#38b764"),color("#94b0c2")];
    for(i=0;i<color_scheme.length;i++){
      rgb_scheme[i*3] = red(color_scheme[i]);
      rgb_scheme[i*3+1] = green(color_scheme[i]);
      rgb_scheme[i*3+2] = blue(color_scheme[i]);
    }
    createCanvas(800, 800);
    background(0);
    widthy = width/cell_size;
    heighty = height/cell_size;
    
    for(let y=0;y<heighty;y++){
      grid[y] = [];
      for(let x=0;x<widthy;x++){
        let n = noise(x*cell_size*0.01,y*cell_size*0.01,zoff)
        grid[y][x] = [];        
      }

    }
    for(let i=0;i<particle_no;i++){
      let x = random(0,width);
      let y = random(0,height);
      let p = new patricle_grid(x,y);
      gridparticles[i] = p;
    }

    console.log("done")
    }

    let zoff = 0;
    let xoff = 0;
    let yoff = 0;
    function calculate(){
      let mid = cell_size/4
      for(let y = 0;y<heighty;y++){
        for(let x=0;x<widthy;x++){
          let n = noise(x*cell_size*0.01+xoff,y*cell_size*0.01+yoff,zoff)
          //grid[y][x] = n;
          let o = 2*PI*n;
          let xx = x*cell_size+mid;
          let yy = y*cell_size+mid;
          let xd = xx;
          let yd = y*cell_size;
          let si = sin(o);
          let co = cos(o)
          let x1 = (xd-xx)*co-(yd-yy)*si+xx;
          let y1 = (xd-xx)*si+(yd-yy)*co+yy;
          grid[y][x] = [x1-xx,y1-yy];
        }
        
      }
      xoff += 0.02;
      yoff+= 0.02;
      zoff += 0.01;

    }
  
  function draw() {
    calculate();
    for(let i=0;i<particle_no;i++){
      gridparticles[i].update();
    }
    background(0,1.5);
    //stroke(255);
    let mid = cell_size/2
    for(let y = 0;y<heighty;y++){
      for(let x=0;x<widthy;x++){
        //console.log("dine");
        let xx = x*cell_size+mid;
        let yy = y*cell_size+mid;
        stroke(255)
        let c = grid[y][x]
        //line(xx,yy,xx+c[0],yy+c[1]);
      }
    }

    
    for(let i=0;i<particle_no;i++){
      gridparticles[i].draw();
    }
    age++;
  }