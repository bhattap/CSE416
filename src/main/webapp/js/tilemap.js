class Grid{
    constructor(width, height, tileW, tileH){
        let canvas = document.createElement("canvas");
        this.grid = document.getElementsByClassName('Grid')[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.w = (width*tileW);
        this.h = (height*tileH);
        this.canvasW = canvas.width = document.getElementsByClassName("surface tab")[0].offsetWidth;
        this.canvasH = canvas.height = document.getElementsByClassName("surface tab")[0].offsetHeight;
        if(this.w> this.canvasW){
            this.canvasW = canvas.width =document.getElementsByClassName("Map")[0].lastElementChild.width;
        }
        if(this.h >this.canvasH){
            this.canvasH = canvas.height =document.getElementsByClassName("Map")[0].lastElementChild.height;
        }
        this.tileWidth = tileW;
        this.tileHeight = tileH;
        this.show = true;
        this.isDragging = false;
    }

    resize(x, y, offsetX, offsetY){
        this.ctx.clearRect(0, 0, this.w, this.w);
        this.w  = this.tileWidth * x;
        this.h  = this.tileHeight * y;
        this.showGrid(offsetX, offsetY);
    }

    updateZoom(resetGridRatioX, resetGridRatioY){
    this.grid.width
        = document.getElementsByClassName("surface tab")[0].offsetWidth*resetGridRatioX;
    this.grid.height
        = document.getElementsByClassName("surface tab")[0].offsetHeight*resetGridRatioY;
    document.getElementsByClassName("editor-container")[0].style.width
        = resetGridRatioX*100 +"%";
    document.getElementsByClassName("editor-container")[0].style.height
        = resetGridRatioY*100 +"%";
    }
 
    showGrid(offsetX=0, offsetY=0){
        var zoomFeature = editor.zoomFeature;

        this.ctx.clearRect(0,0,this.canvasW, this.canvasH);
        let rows = (this.w*zoomFeature.ratioX)/(this.tileWidth*zoomFeature.ratioX) | 0;
        let cols = (this.h*zoomFeature.ratioY)/(this.tileHeight*zoomFeature.ratioY) | 0;
        
        this.ctx.save();
        this.ctx.strokeStyle = "lightgrey";
        this.ctx.beginPath();

        for(let y =offsetY ; y<=offsetY+(cols * (this.tileHeight*zoomFeature.ratioY)) ; y+=(this.tileHeight*zoomFeature.ratioY)) {
            this.drawLine(offsetX, y, offsetX+(this.w*zoomFeature.ratioX), y);
        }

        for(let x =offsetX ; x<=offsetX+(rows * (this.tileWidth*zoomFeature.ratioX)) ; x+=(this.tileWidth*zoomFeature.ratioX)) {
            this.drawLine(x, offsetY, x, offsetY+(this.h*zoomFeature.ratioY));
        }
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "lightgrey";
        // this.ctx.strokeRect(0, 0, cols, rows);
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

    onScrollEvent(){
        var gridCanvas = this.grid;
        if(gridCanvas){
            gridCanvas.addEventListener('scroll', this.zoomScroll);
            gridCanvas.addEventListener('mousemove', this.setCenter);
            gridCanvas.style.zIndex = 999;
        }
    }
    offScrollEvent(){
        var gridCanvas = this.grid;
        if(gridCanvas){
            gridCanvas.removeEventListener('scroll', this.zoomScroll);
            gridCanvas.removeEventListener('mousemove', this.setCenter);
            gridCanvas.style.zIndex = "";
        }
    }

    zoomScroll(e){
        if(e.deltaY == 150){ zoomOut();}
        else if(e.deltaY == -150){zoomIn();}
    }
    setCenter(e){
        editor.zoomFeature.centerX = e.clientX;
        editor.zoomFeature.centerY = e.clientY;
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
            target.showGrid(x,y);
            targetLayer.canvasLayer.canvas.style.left = x+"px";
            targetLayer.canvasLayer.canvas.style.top = y+"px";
            [targetLayer.offsetX, targetLayer.offsetY] = [x, y];
            // targetLayer.offsetX = parseInt(targetLayer.canvasLayer.canvas.style.left.replace("px", ""));
            // targetLayer.offsetY = parseInt(targetLayer.canvasLayer.canvas.style.top.replace("px", ""));
        }
    }
    dragEnd(e){
        editor.grid.isDragging = false;
    }
}
 var col;
 var row;
class TiledCanvas{
    constructor(width, height, tileW, tileH, layer, offsetX, offsetY){
        let canvas = document.createElement("canvas");
        canvas.id = layer.id;
        canvas.style.position = "position"; 
        canvas.style.left = offsetX+ "px";
        canvas.style.top = offsetY +"px";
        canvas.addEventListener("click", addEvent);

        let canvasHover = document.createElement("canvas");
        canvasHover.id = layer.id +"hover";
        canvasHover.style.position = "position"; 
        canvasHover.style.left = offsetX+ "px";
        canvasHover.style.top = offsetY +"px";
        canvasHover.style.zIndex = -1;

        let canvasclicked = document.createElement("canvas");
        canvasclicked.id = layer.id +"click";
        canvasclicked.style.position = "position"; 
        canvasclicked.style.left = offsetX+ "px";
        canvasclicked.style.top = offsetY +"px";
        canvasclicked.style.zIndex = -1;

        this.w = canvas.width = canvasHover.width = canvasclicked.width = (width*tileW);
        this.h = canvas.height = canvasHover.height = canvasclicked.height = (height*tileH);
        this.canvas = document.getElementsByClassName('Map')[0].appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.canvasHover = document.getElementsByClassName('Map')[0].appendChild(canvasHover);
        this.ctxHover = canvasHover.getContext("2d");
        this.canvasclicked = document.getElementsByClassName('Map')[0].appendChild(canvasclicked);
        this.ctxClicked = canvasclicked.getContext("2d");
    }
    
    resize(x, y, tileW, tileH){
        this.w = this.canvas.width = x * tileW;
        this.h = this.canvas.height = y * tileH;
        this.w = this.canvasHover.width = x * tileW;
        this.h = this.canvasHover.height = y * tileH;
        this.w = this.canvasclicked.width = x * tileW;
        this.h = this.canvasclicked.height = y * tileH;
    }

    // getOffset(){
    //     var x = parseInt(this.canvas.style.left.replace("px", ""));
    //     var y = parseInt(this.canvas.style.top.replace("px", ""));
    //     return [x, y];
    // }
    hideCanvas(){
        document.getElementById(this.canvas.id).style.display="none";
    }
    showCanvas(layer){
        this.canvas.style.display="block";
        this.canvasHover.style.display="block";
        this.canvasclicked.style.display="block";
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
    zoomInEvent(){
        this.canvas.addEventListener("click", zoomEvent);
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
function zoomEvent(){
    var current = editor.currentMap;
    var topLayerIndex = current.LayerList.size-1;
    var zoomFeature = editor.zoomFeature;
    var mousePos = getMousePos(current.LayerList.get(topLayerIndex).canvasLayer.canvas, event);
    row = Math.floor(mousePos.x/(current.tileWidth*zoomFeature.ratioY));
    col = Math.floor(mousePos.y/(current.tileHeight*zoomFeature.ratioX));
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

function hoverEvent(){
    var current = editor.currentMap;
    var topLayerIndex = current.LayerList.size-1;
    var zoomFeature = editor.zoomFeature;
    var mousePos = getMousePos(current.LayerList.get(topLayerIndex).canvasLayer.canvasHover, event);
    row = Math.floor(mousePos.x/(current.tileWidth*zoomFeature.ratioY));
    col = Math.floor(mousePos.y/(current.tileHeight*zoomFeature.ratioX));
     current.LayerList.get(topLayerIndex).hoverTile(row, col, current.LayerList.get(topLayerIndex).canvasLayer.canvasHover, current.tileHeight, current.tileWidth);
}

function tileSelectEvent(){
    var current = editor.currentMap;
    var topLayerIndex = current.LayerList.size-1;
    var zoomFeature = editor.zoomFeature;
    var mousePos = getMousePos(current.LayerList.get(topLayerIndex).canvasLayer.canvasHover, event);
    row = Math.floor(mousePos.x/(current.tileWidth*zoomFeature.ratioY));
    col = Math.floor(mousePos.y/(current.tileHeight*zoomFeature.ratioX));
   var message = 'Mouse position: ' + row  + ',' + col;
   console.log(message);
     current.LayerList.get(topLayerIndex).selectTile(row, col, current.LayerList.get(topLayerIndex).canvasLayer.canvasHover, current.tileHeight, current.tileWidth);
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

