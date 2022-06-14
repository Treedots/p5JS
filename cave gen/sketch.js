  
  let grid_1 = [];
  let grid_2 = [];
  let cell_size = 4;
  let heighty,widthy;
  let state_grid = 0;

  function setup() {
    
  createCanvas(800, 800);
  heighty = height/cell_size;
  widthy = width/cell_size;
    for(let y = 0;y<heighty;y++){
      grid_1[y] = [];
      grid_2[y] = [];
      for(let x=0;x<widthy;x++){
        grid_1[y][x] = floor(random(2));
      }
    }
    celluar();
  }

  let eightNeighbour = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
  let pause = false;

  function celluar(){
    for(let y = 0;y<heighty;y++){
      for(let x=0;x<widthy;x++){
        let n = 0;
        let alive = 0;
        if(state_grid%2==0){
          if(grid_1[y][x]==1)
            alive = 1;
        }
        else{
          if(grid_2[y][x]==1)
            alive = 1;
        }
        for(let z=0;z<8;z++){
          let xx = x+ eightNeighbour[z][0];
          let yy = y+ eightNeighbour[z][1];
          if(xx<0||xx>=widthy||yy<0||yy>=heighty){

          }
          else{
            if(state_grid%2==0){
              if(grid_1[yy][xx]==1)
                n++;
            }
            else{
              if(grid_2[yy][xx]==1)
                n++;
            }
          }

        }

        switch(n){
          case 2:
            if(alive)
              alive = 1;
            break
          case 3:
            alive = 1;
              break;
          default:
            if(alive)
              alive = 0;
        }
        if(state_grid%2==0){
          grid_2[y][x] = alive;
        }
        else{
          grid_1[y][x]= alive;
        } 
      }
    }
    state_grid++;
  }
  function mousePressed() {
    pause = true;
  }
  function mouseCheck() {
      let grid_x = floor(mouseX/cell_size);
      let grid_y = floor(mouseY/cell_size);
      grid_1[grid_y][grid_x] = 1;
      grid_2[grid_y][grid_x] = 1;
   }
  function mouseReleased(){
    pause = false;
    state_grid = 0;
  }
  function keyPressed() {
    if(keyCode==27){
      restart();
    }
  }

  function restart(){
    background(255);
    for(let y = 0;y<heighty;y++){
      for(let x=0;x<widthy;x++){
        grid_1[y][x] = floor(random(2));
        grid_2[y][x] = floor(random(2));
      }
    }
    state_grid = 0;
    pause = false;
    celluar();
  }
  function normaly(val,max,min){
    return (val-min)/(max-min);
  }
  function draw() {
    //background(255);
    if(!pause&&state_grid<32)
      celluar();
    else{
      mouseCheck()
    }
    loadPixels();
    //state_grid++;
    for(let y = 0;y<heighty;y++){
      for(let x=0;x<widthy;x++){
        let cell = 0;
            if(state_grid%2==0){
              cell = 1-grid_1[y][x];       
            }
            else{
              cell = 1-grid_2[y][x];
        }
        for(let x1=0;x1<cell_size;x1++){
          for(let y1=0;y1<cell_size;y1++){
            let xx = x1 + x*cell_size;
            let yy = y1 + y*cell_size;
            var index = (xx+yy*width) *4;
            
            if(cell==0){
              pixels[index] = cell*255;
              pixels[index+1] = cell*255;
              pixels[index+2] = cell*255;
              pixels[index+3] = 255;
            }
            
          }
        }

      }
    }
    updatePixels();

  }