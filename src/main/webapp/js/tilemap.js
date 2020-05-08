class Grid{
    constructor(width, height, tileW, tileH){
        let canvas = document.createElement("canvas");
        this.grid = document.getElementsByClassName('Grid')[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.w = canvas.width = (width*tileW);
        this.h = canvas.height = (height*tileH);
        this.tileWidth = tileW;
        this.tileHeight = tileH;
        this.show = false;
    }

    resize(width, height, tileW, tileH){
        this.w = canvas.width = (width*tileW);
        this.h = canvas.height = (height*tileH);
    }
 
    showGrid(){
        let cols = this.w/this.tileWidth | 0;
        let rows = this.h/this.tileHeight | 0;
        
        this.ctx.save();
        this.ctx.strokeStyle = "lightgrey";
        this.ctx.beginPath();

        for(let x =0 ; x<=cols * this.tileWidth ; x+=this.tileWidth) {
            this.drawLine(x, 0, x, this.w);
        }

        for(let y =0 ; y<=rows * this.tileHeight ; y+=this.tileHeight) {
            this.drawLine(0, y, this.h, y);
        }
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(0, 0, cols, rows);
        this.ctx.restore();
        this.show = true;

    }
    drawLine(x1, y1, x2, y2){
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
    }

    hideGrid(){
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.show = false;
    }

    showOrHide(){
        if(this.show == true){
            this.hideGrid();
        } else{
            this.showGrid();
        }
    }

}
class TiledCanvas{
    constructor(width, height, tileW, tileH, layer){
         // should be get a layer
        let canvas = document.createElement("canvas");
        canvas.id = layer.id;
        canvas.addEventListener('click', function(event) {
            var mousePos = getMousePos(canvas, event);
            var row = Math.floor(mousePos.x/tileW);
            var col = Math.floor(mousePos.y/tileH);
            var message = 'Mouse position: ' + row  + ',' + col;
            layer.fillTiles(row, col, canvas);
            console.log(message);
        });
        this.w = canvas.width = (width*tileW);
        this.h = canvas.height = (height*tileH);
        this.canvas = document.getElementsByClassName('Map')[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }
    hideCanvas(){
        document.getElementById(this.canvas.id).style.display="none";
    }
    showCanvas(layer){
        this.canvas.style.display="block";
    }
}
class ObjectCanvas{
    constructor(width, height, layer){
         // should be get a layer
        let canvas = document.createElement("canvas");
        canvas.id = layer.id;
        canvas.addEventListener('click', function(event) {
            var mousePos = getMousePos(canvas, event);
            var row = Math.floor(mousePos.x);
            var col = Math.floor(mousePos.y);
            var message = 'Mouse position: ' + row  + ',' + col;

            layer.fillObject(row, col);
            console.log(message);
        });
        this.w = canvas.width = width;
        this.h = canvas.height = height;
        this.canvas = document.getElementsByClassName('Map')[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }
    hideCanvas(){
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    showCanvas(layer){
        console.log("showCanvas, will be implemented after tileset function is done");
    }
}
class Tilecursor{
        constructor(canvas, x, y, tileWidth, tileHeight){
            this.canvas = canvas;
            this.x= x;
            this.y = y;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;
        }
        draw(){
            let[s, ctx] = [this.tileSize, this.canvas.ctx];
    
            ctx.save();
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.strokeRect(this.x*s, this.y*s, s,s);
            ctx.stroke();
            ctx.restore();
        }
    }

function getMousePos(canvasNode, event) {
    var rect = canvasNode.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

