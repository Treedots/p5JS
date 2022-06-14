    
    let font_bold, font_light, font_medium, font_reg, font_ret,font_semibold;
    function preload(){
      font_bold =  loadFont("../Font/FiraCode-Bold.ttf");
      font_light = loadFont("../Font/FiraCode-Light.ttf");
      font_medium  = loadFont("../Font/FiraCode-Medium.ttf");;
      font_reg = loadFont("../Font/FiraCode-Regular.ttf");
      font_ret = loadFont("../Font/FiraCode-Retina.ttf");
      font_semibold = loadFont("../Font/FiraCode-SemiBold.ttf");
    }
    
    let cell_size = 8;
    let widthy,heighty;
    let gridMap = [];
    let rooms = [];
    function setup() {
    createCanvas(800, 800);
    widthy = width/ cell_size;
    heighty = height/ cell_size;
    gridMap.length = heighty;
    for(let y = 0 ;y<heighty;y++){
      gridMap[y] = [];
      gridMap[y].length = widthy;
      for(let x = 0 ;x<widthy;x++){
        gridMap[y].fill(0);
      }
    }
    //generateGridMap()
    }
    let no_of_rooms = 250;
    let runtime = 0;
    let runtimemax = 25;
    function placeRoom(){
      if(runtime>runtimemax){
        return;
      }
      let w = floor(random(4,8));
      let h = floor(random(4,8));
      let x = floor(random(w,widthy-w));
      let y = floor(random(h,heighty-h));
      
      // check collision
      let running = false;
      let room_length = rooms.length;
      for(let i=0;i<room_length;i++){
        let r = rooms[i];
        running = checkCollision(x,y,w,h,r[0],r[1],r[2],r[3]);
        if(running) break;
      }
      runtime++;
      if(running) placeRoom();
      else{
        rooms.push([x,y,w,h])
        let marker = false;
        for(let yy = y;yy<y+h;yy++){
        for(let xx = x;xx<x+w;xx++){
          console.log(yy,xx)
          if(xx>=0&&xx<widthy&&yy>=0&&yy<heighty){
            if(xx==x||yy==y||xx==x+w-1||yy==y+h-1){
              gridMap[yy][xx] = 2;
            }
            else{
              if(!marker){
                gridMap[yy][xx] = String.fromCharCode(65+room_length);
                marker = true;
              }
              else{
                gridMap[yy][xx] = 1;
              }
              
            }
          }              
            
        }
        }
      };
    }

    function createCorridor(){


    }

    function checkCollision(x,y,w,h,x2,y2,w2,h2){
      return x < x2 + w2 && x + w > x2 && y < y2 + h2 && h + y > y2;
    }
    function generateGridMap(){
      for(let x=0;x<no_of_rooms;x++){
        runtime = 0;
        placeRoom()
      }
      console.log(rooms.length);
    }
  
  let s = " -+"
  function draw() {
    background(0);
    textFont(font_light);
    if(rooms.length<no_of_rooms&&runtime<runtimemax){
      runtime = 0;
      placeRoom()
    }
    fill('green')
      .strokeWeight(0)
      .textSize(cell_size);
    for(let y = 0 ;y<heighty;y++){
      for(let x = 0 ;x<widthy;x++){
        let c = gridMap[y][x]<3?s[gridMap[y][x]]:gridMap[y][x];
        text(c,x*cell_size+cell_size/4,y*cell_size+cell_size)
      }
    }
  }