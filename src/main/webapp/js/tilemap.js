class Grid{
    constructor(width, height, tileW, tileH){
        let canvas = document.createElement("canvas");
        this.grid = document.getElementsByClassName('Grid')[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.w = (width*tileW);
        this.h = (height*tileH);
        this.canvasW = canvas.width = window.innerWidth;
        this.canvasH = canvas.height = window.innerHeight;
        this.tileWidth = tileW;
        this.tileHeight = tileH;
        this.show = true;
        this.isDragging = false;
    }

    resize(width, height, tileW, tileH){
        this.w = canvas.width = (width*tileW);
        this.h = canvas.height = (height*tileH);
    }
 
    showGrid(offsetX=0, offsetY=0){
        this.ctx.clearRect(0,0,this.canvasW, this.canvasH);
        let rows = this.w/this.tileWidth | 0;
        let cols = this.h/this.tileHeight | 0;
        
        this.ctx.save();
        this.ctx.strokeStyle = "lightgrey";
        this.ctx.beginPath();

        for(let y =offsetY ; y<=offsetY+(cols * this.tileHeight) ; y+=this.tileHeight) {
            this.drawLine(offsetX, y, offsetX+this.w, y);
        }

        for(let x =offsetX ; x<=offsetX+(rows * this.tileWidth) ; x+=this.tileWidth) {
            this.drawLine(x, offsetY, x, offsetY+this.h);
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

    showOrHide(){
        if(this.show == true){
            document.getElementsByClassName('Grid')[0].style.display = "none";
            this.show = false;
        } else{
            document.getElementsByClassName('Grid')[0].style.display = "block";
            this.show = true;
        }
    }

    onDragEvent(){
        var gridCanvas = this.grid;
        if(gridCanvas){
            gridCanvas.addEventListener('mousedown', this.dragStart);
            gridCanvas.addEventListener('mousemove', this.dragging);
            gridCanvas.addEventListener('mouseup', this.dragEnd);
        }
    }

    offDragEvent(){
        var gridCanvas = this.grid;
        gridCanvas.removeEventListener('mousedown', this.dragStart);
        gridCanvas.removeEventListener('mousemove', this.dragging);
        gridCanvas.removeEventListener('mouseup', this.dragEnd);
    }

    dragStart(e){
       editor.grid.isDragging = true;
    }

    dragging(e){
        if(editor.grid.isDragging){
            var target = editor.grid;
            var [x, y] = [e.offsetX, e.offsetY];
            var layerList = editor.currentMap.LayerList;
            var topLayerIndex = layerList.size-1;
            var targetLayer = layerList.get(topLayerIndex);
            target.showGrid(x, y);
            targetLayer.canvasLayer.canvas.style.left = x+"px";
            targetLayer.canvasLayer.canvas.style.top = y+"px";
        }
    }
    dragEnd(e){
        editor.grid.isDragging = false;
    }
}
 var col;
 var row;
class TiledCanvas{
    constructor(width, height, tileW, tileH, layer){
        let canvas = document.createElement("canvas");
        canvas.id = layer.id;
        canvas.style.position = "position"; 
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.addEventListener("click", addEvent);

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
    getCSVvalue(){
        return editor.currentMap.LayerList.get(editor.currentMap.LayerList.size-1).csv[col][row];
    }
    removeEvent(){
        this.canvas.removeEventListener('click', addEvent);
    }
    addEventAgain(layer){
        this.canvas.addEventListener("click", addEvent);
    }
}
function addEvent(){
    var current = editor.currentMap;
    var topLayerIndex = current.LayerList.size-1;
    var mousePos = getMousePos(current.LayerList.get(topLayerIndex).canvasLayer.canvas, event);
    row = Math.floor(mousePos.x/current.tileWidth);
    col = Math.floor(mousePos.y/current.tileHeight);
   var message = 'Mouse position: ' + row  + ',' + col;
   console.log(message);
   if(active == 0){
       getTWTH();
       current.LayerList.get(topLayerIndex).eraseTile(row, col, current.LayerList.get(topLayerIndex).canvasLayer.canvas, tsH, tsW);
   }
   else{
    current.LayerList.get(topLayerIndex).fillTiles(row, col, current.LayerList.get(topLayerIndex).canvasLayer.canvas);
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
    // hideCanvas(){
    //     this.ctx.clearRect(0, 0, this.w, this.h);
    // }
    // showCanvas(layer){
    //     console.log("showCanvas, will be implemented after tileset function is done");
    // }
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

