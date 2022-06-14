    let color_scheme;
    let rgb_scheme=[];
    function setup() {
    color_scheme = [color("#29366f "),color("#3b5dc9"),color("#41a6f6"),color("#ffcd75"),color("#5d275d"),color("#a7f070"),color("#38b764"),color("#94b0c2")];
    for(i=0;i<color_scheme.length;i++){
      rgb_scheme[i*3] = red(color_scheme[i]);
      rgb_scheme[i*3+1] = green(color_scheme[i]);
      rgb_scheme[i*3+2] = blue(color_scheme[i]);
    }
    createCanvas(800, 800);
    noSmooth();
    }

  let xoff = 0;
  let yoff = 0;
  let zoff = 0;
  let pixelation = 8
  function draw() {
    let frameskip = 1;
    if(frameCount%frameskip==0){
      background(0);
      loadPixels();
      xoff += 0.01*frameskip
      yoff += 0.01*frameskip;
      zoff += 0.001*frameskip;
      for(let x=0;x<width/pixelation;x++){
        for(let y=0;y<height/pixelation;y++){
          //var index = (x*4+y*width*4) *4;
          let n = noise(x*pixelation*0.005+xoff,y*pixelation*0.005+yoff,0.1+zoff) * 64;
          let a = floor(n/8);
          for(let x1=0;x1<pixelation;x1++){
            for(let y1=0;y1<pixelation;y1++){
              let xx = x1 + x*pixelation;
              let yy = y1 + y*pixelation;
              var index = (xx+yy*width) *4;
              pixels[index] = rgb_scheme[a*3];
              pixels[index+1] = rgb_scheme[a*3+1];
              pixels[index+2] = rgb_scheme[a*3+2];
              pixels[index+3] = 255;
            }
          }
        }
        
      }
      updatePixels();
    }
    
    
    //console.log(frameRate());
  }