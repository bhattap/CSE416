
class Grid{
    constructor(layer){
        this.w = layer.width;
        this.h = layer.height;
        this.tileWidth = layer.tileW;
        this.tileHeight = layer.tileH;
        this.canvas = new Canvas(layer);
    }

    updateCells(){
        // this.canvas.clear();
        this.canvas.drawGrid(this.w, this.h, this.tileWidth, this.tileHeight);
        // this.tileCursor.draw();
    }

}
class Canvas{
    constructor(layer){
         // should be get a layer
        let canvas = document.createElement("canvas");
        canvas.addEventListener('click', function(event) {
            var mousePos = getMousePos(canvas, event);
            var row = Math.floor(mousePos.x/layer.tileW);
            var col = Math.floor(mousePos.y/layer.tileH);
            var message = 'Mouse position: ' + row  + ',' + col;
            layer.fillTiles(row, col, canvas);
            console.log(message);
        });
        this.w = canvas.width = (layer.width*layer.tileW);
        this.h = canvas.height = (layer.height*layer.tileH);
        document.getElementsByClassName(layer.name)[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.layer = layer;
    }

    drawGrid(w, h, tileWidth, tileHeight){
        let cols = w | 0;
        let rows = h | 0;
        
        this.ctx.save();
        this.ctx.strokeStyle = "lightgrey";
        this.ctx.beginPath();

        for(let x =0 ; x<=cols * tileWidth ; x+=tileWidth) {
            this.drawLine(x, 0, x, this.w*tileWidth);
        }

        for(let y =0 ; y<=rows * tileHeight ; y+=tileHeight) {
            this.drawLine(0, y, this.h*tileHeight, y);
        }
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(0, 0, this.w, this.h);
        this.ctx.restore();

    }
    drawLine(x1, y1, x2, y2){
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
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

