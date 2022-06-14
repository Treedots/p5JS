let sprite_sheet;
let sprite_pallete = [];
let color_sheet;
let color_pallete = [];
let cells_grid = [];
let cells_gridSize = {'x':0,'y':0};
const sprite_cell = {'x':8,'y':8 };
const scale = 2;
const cells_size = {'x':sprite_cell.x*scale,'y':sprite_cell.y*scale };
const filled_cell = {'x':15*sprite_cell.x,'y':15*sprite_cell.y};
const grid_size = {'x':32,'y':32}
let frames_length = 8;
let updateDraw;
function preload(){
	sprite_sheet = loadImage('https://raw.githubusercontent.com/michael-lazar/playscii/master/charsets/jpetscii.png');
	}

let cnv;
let pressed;
let colorpallete_img;
let checkbox;
let old_foregroundData;
function setup(){
	cnv = createCanvas(8*3*32, 8*2*32);
	
	pressed = false
	//let d = pixelDensity();
		  //let Image = 4 * (img.width * d) * (img.height * d);
		  sprite_sheet.loadPixels();
		  cnv.mousePressed(process_click);
		  cnv.mouseReleased(process_released);
		  color_pallete = [color("#2e222f"),color("#3e3546"),color("#625565"),color("#966c6c"),color("#ab947a"),color("#694f62"),color("#7f708a"),color("#9babb2"),color("#c7dcd0"),color("#ffffff"),color("#6e2727"),color("#b33831"),color("#ea4f36"),color("#f57d4a"),color("#ae2334"),color("#e83b3b"),color("#fb6b1d"),color("#f79617"),color("#f9c22b"),color("#7a3045"),color("#9e4539"),color("#cd683d"),color("#e6904e"),color("#fbb954"),color("#4c3e24"),color("#676633"),color("#a2a947"),color("#d5e04b"),color("#fbff86"),color("#165a4c"),color("#239063"),color("#1ebc73"),color("#91db69"),color("#cddf6c"),color("#313638"),color("#374e4a"),color("#547e64"),color("#92a984"),color("#b2ba90"),color("#0b5e65"),color("#0b8a8f"),color("#0eaf9b"),color("#30e1b9"),color("#8ff8e2"),color("#323353"),color("#484a77"),color("#4d65b4"),color("#4d9be6"),color("#8fd3ff"),color("#45293f"),color("#6b3e75"),color("#905ea9"),color("#a884f3"),color("#eaaded"),color("#753c54"),color("#a24b6f"),color("#cf657f"),color("#ed8099"),color("#831c5d"),color("#c32454"),color("#f04f78"),color("#f68181"),color("#fca790"),color("#fdcbb0")];
		  let clrLength = color_pallete.length;
		  let sprWidth =sprite_sheet.width;
		  let sprHeight = sprite_sheet.height;
		  //
		  colorpallete_img = createImage(16,ceil(clrLength/16));
		  colorpallete_img.loadPixels();
		  for(let i = 0; i<clrLength;i++){
			let c = createImage(sprWidth,sprHeight);
			sprite_pallete.push(c);
			sprite_pallete[i].loadPixels();
			colorpallete_img.set(floor(i%16),floor(i/16),color_pallete[i])
		  }
		  colorpallete_img.updatePixels();
		  for (let i = 0; i < sprWidth; i++) {
			  for (let j = 0; j < sprHeight; j++) {
				let c = sprite_sheet.get(i,j);
				
				if(c[0]==255&&c[1]==255&&c[2]==255){
					//img.set(i, j, color(0, 0,0,0));
					for(let k = 0; k<clrLength;k++){
						//console.log(k,i,j)
						sprite_pallete[k].set(i,j,color_pallete[k]);
					}
				}
				//
			  }
			}
			
			for(let i = 0; i<clrLength;i++){
			sprite_pallete[i].updatePixels();
		  }
		  console.log("Done")
		  //img.updatePixels();
		  noSmooth();
		  updateDraw = false;
		  foreground_change = true;
		  old_foregroundData = 0;
		  generateGrid(grid_size.x,grid_size.y)
}
class cell{
	constructor(x,y,px,py,fg,bg){
		this.x = x * cells_size.x;
		this.y = y * cells_size.y;
		this.px = px * sprite_cell.x;
		this.py = py * sprite_cell.y;
		this.fg = fg;
		this.bg = bg;
	}
	drawin(){
		image(sprite_pallete[this.bg],this.x,this.y,cells_size.x,cells_size.y,filled_cell.x,filled_cell.y,sprite_cell.x,sprite_cell.y);
		image(sprite_pallete[this.fg],this.x,this.y,cells_size.x,cells_size.y,this.px,this.py,sprite_cell.x,sprite_cell.y);
		//image(img_sheet[x1],j*8*2,i*8*2,8*2,8*2, x*8, y*8,8,8);
	}
	updateCell(x,y,f,g){
		this.px = x * sprite_cell.x;
		this.py = y * sprite_cell.y;
		this.fg = f;
		this.bg = g;
	}
	setBackground(bg){
		this.bg = bg;
	}
	setForeground(fg){
		this.fg = fg;
	}
	setChar(x,y){
		this.px = x * sprite_cell.x;
		this.py = y * sprite_cell.y;
	}
	update(){
		
	}
	noise(){
		let xo = this.x + xoff;
		let yo = this.y + yoff;
		let x = noise(xo*0.005,yo*0.005,0) * 16;
		let y = noise(xo*0.005,yo*0.005,0.5) * 16;
		let a = noise(xo*0.005,yo*0.005,2) * 64;
		let b = noise(xo*0.005,yo*0.005,2.1) * 64;
		this.px = floor(x) * sprite_cell.x;
		this.py = floor(y) * sprite_cell.y;
		this.fg = floor(a);
		this.bg = floor(b);
	}
}
function process_click(){

	pressed = true;
	let x = floor(mouseX / cells_size.x);
	let y = floor(mouseY / cells_size.y);
	if(x>=grid_size.x&&x<grid_size.x+cells_size.x*16&&y>=0&&y<grid_size.y+cells_size.y*16){
		let x1 = x - grid_size.x;
		let y1 = y -16
		if(y1<=3&&selection.fg!=(x1) + (y1)*16){
			old_foregroundData = selection.fg
		}
	}
}

function mouseClicked() {
	let x = floor(mouseX / cells_size.x);
	let y = floor(mouseY / cells_size.y);
	if(x>=grid_size.x&&x<grid_size.x+cells_size.x*16&&y>=0&&y<grid_size.y+cells_size.y*16){
		let x1 = x - grid_size.x;
		let y1 = y
		if(x1<16&&y1<16){
			selection.x = x1;
			selection.y = y1;
		}
		else{
			let y2 = y1 -16;
			console.log(x1);
			if (y2<=3){
				if(selection.fg!=(x1) + (y2)*16){
					selection.fg = (x1) + (y2)*16
				}
				
			}
			else if(y2==4){
				if(x1<=1){
					selection.char = ! selection.char
				}
				else if(x1<=3){
					selection.foreground = !selection.foreground
				}
				else if(x1<=5){
					selection.background = !selection.background
				}
				else if(x1<=9){
					generateGrid(grid_size.x,grid_size.y)
				}
				else if(x1<=12){
					generateNoise(grid_size.x,grid_size.y)
				}
			}
			else{

			}
			
		}
		
	}
}
let foreground_change;
function doubleClicked() {
	let x = floor(mouseX / cells_size.x);
	let y = floor(mouseY / cells_size.y);
	if(x>=grid_size.x&&x<grid_size.x+cells_size.x*16&&y>=0&&y<grid_size.y+cells_size.y*16){
		let x1 = x - grid_size.x;
		let y1 = y -16
		if(y1<=3){
			foreground_change = false;
			selection.bg = (x1) + (y1)*16
			selection.fg = old_foregroundData;
			foreground_change = true;
		}
		else if(y1==4){
				if(x1<=3){
					foreground_change = true;
				}
				else if(x1<=5){
					foreground_change = false;
				}
			}
	}
}
function process_released(){
	pressed = false;
	
}

function generateGrid(x,y){
	//Clear Cells
	cells_grid = [];
	for(i=0;i<y;i++){
		for(j=0;j<x;j++){
		if(j==0){
			cells_grid[i] = [];
		}
		cells_grid[i][j] =  new cell(j,i,0,0,0,0);
		//cells_grid[i][j].noise();
	}
	}
	cells_gridSize.x = x;
	cells_gridSize.y = y;
	updateDraw = true;
}

function generateNoise(x,y){
	//Clear Cells
	noiseSeed(random(999999999));
	cells_grid = [];
	for(i=0;i<y;i++){
		for(j=0;j<x;j++){
		if(j==0){
			cells_grid[i] = [];
		}
		cells_grid[i][j] =  new cell(j,i,0,0,0,0);
		cells_grid[i][j].noise();
	}
	}
	cells_gridSize.x = x;
	cells_gridSize.y = y;
	updateDraw = true;
}

let c= 0;
let xoff = 1;
let yoff = 1;
let selection = {'x':0,'y':0,'bg':0,'fg':1,'char':true,'background':false,'foreground':true};

class panelTool{
	constructor(){
		
	}
}
function onHold(){
	let x = floor(mouseX / cells_size.x);
	let y = floor(mouseY / cells_size.y);
	if(x>=0&&x<grid_size.x&&y>=0&&y<grid_size.y){
		let x1,y1,b,g;
		if(selection.char){
			cells_grid[y][x].setChar(selection.x,selection.y)
		}
		if(selection.background){
			cells_grid[y][x].setBackground(selection.bg)
		}
		if(selection.foreground){
			cells_grid[y][x].setForeground(selection.fg)
		}
		
		//cells_grid[y][x].updateCell(selection.x,selection.y,0,0)
	}
	
}
function draw(){
	if(pressed){
		onHold()
	}
	if(updateDraw){
		background(0,0,0);
		for(i=0;i<cells_gridSize.y;i++){
		for(j=0;j<cells_gridSize.x;j++){
		cells_grid[i][j].drawin();
	}
	}
		
		//updateDraw = false;
	}
	image(sprite_sheet,width/4*2+cells_size.x*8,0,cells_size.x*16,cells_size.y*16,0,0)
	image(colorpallete_img,width/4*2+cells_size.x*8,cells_size.y*16,cells_size.x*16,cells_size.y*4,0,0)
	let x = floor(mouseX / cells_size.x) * cells_size.x;
	let y = floor(mouseY / cells_size.y) * cells_size.y;
	if(selection.background){
		image(sprite_pallete[selection.bg],x,y,cells_size.x,cells_size.y,15*sprite_cell.x,15*sprite_cell.y,sprite_cell.x,sprite_cell.y)
	}
	if(selection.foreground){
		image(sprite_pallete[selection.fg],x,y,cells_size.x,cells_size.y,selection.x*sprite_cell.x,selection.y*sprite_cell.y,sprite_cell.x,sprite_cell.y)
	}
	if(!selection.foreground&&!selection.background&&selection.char){
		image(sprite_sheet,x,y,cells_size.x,cells_size.y,selection.x*sprite_cell.x,selection.y*sprite_cell.y,sprite_cell.x,sprite_cell.y)
	}
	
	
	//Settings
	
	textSize(cells_size.y-2)
	
	if(selection.char){
		fill(128,255,255,255);
		rect(width/4*2+cells_size.x*8,cells_size.y*20,cells_size.x*2,cells_size.y);
		fill(0)
		text("CH", width/4*2+cells_size.x*8.4, cells_size.y*20.8)
	}
	else{
		fill(255)
		text("CH", width/4*2+cells_size.x*8.4, cells_size.y*20.8)
	
	}
	
	if(selection.foreground){
		fill(0,0,255,255)
		rect(width/4*2+cells_size.x*10,cells_size.y*20,cells_size.x*2,cells_size.y);
		fill(0)
		text("FG", width/4*2+cells_size.x*10.4, cells_size.y*20.8)
	}
	else{
		fill(255)
		text("FG", width/4*2+cells_size.x*10.4, cells_size.y*20.8)
	}
	
	if(selection.background){
		fill(0,255,0,255)
		rect(width/4*2+cells_size.x*12,cells_size.y*20,cells_size.x*2,cells_size.y);
		fill(0)
		text("BG", width/4*2+cells_size.x*12.4, cells_size.y*20.8)
	}
	else{
		fill(255)
		text("BG", width/4*2+cells_size.x*12.4, cells_size.y*20.8)
	}
	fill(128,255,255,255)
	
	rect(width/4*2+cells_size.x*14,cells_size.y*20,cells_size.x*4,cells_size.y);
	rect(width/4*2+cells_size.x*18,cells_size.y*20,cells_size.x*3,cells_size.y);
	fill(0)
	text("CLEAR", width/4*2+cells_size.x*14.4, cells_size.y*20.8)
	text("Noise", width/4*2+cells_size.x*18.4, cells_size.y*20.8)
	push()
	noFill();
	stroke(255,0,0)
	rect(width/4*2+cells_size.x*8+selection.x*cells_size.x,selection.y*cells_size.y,cells_size.x,cells_size.y)
	let bg_loc = selection.bg;
	let fg_loc = selection.fg;
	stroke(0,0,255,255)
	rect(width/4*2+cells_size.x*8+(fg_loc%16)*cells_size.x,floor(fg_loc/16)*cells_size.y+cells_size.y*16,cells_size.x,cells_size.y)
	stroke(0,255,0,255)
	rect(width/4*2+cells_size.x*8+(bg_loc%16)*cells_size.x,floor(bg_loc/16)*cells_size.y+cells_size.y*16,cells_size.x,cells_size.y)
	pop()
	
		
	//console.log(frameRate());
	
	
}
	
