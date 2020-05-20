function editFunction(element, service){
    switch(service) {
        case 'move':
            moveGrid(element);
            break;
        case 'erase':
            EraseTile(element);
            break;
        case 'zoom':
            zoomInOut();
        default:
      }
}
function zoomInOut(){
    var girdNode = document.getElementsByClassName('Grid')[0];
    var zoomon = editor.zoomFeature.zoomEventOn;
    if(zoomon){
        console.log("zoom off");
        editor.zoomFeature.zoomEventOn = false;
        editor.grid.offScrollEvent();
        changeCursor(girdNode);
    } else{console.log("zoom on");
        editor.zoomFeature.zoomEventOn = true;
        editor.grid.onScrollEvent();
        changeCursor(girdNode, "n-resize");
    }
}


function moveGrid(element){
    var currentState = element.getAttribute('value');
    var layerList = editor.currentMap.LayerList;
    var topLayerIndex = layerList.size-1;
    var targetLayer = layerList.get(topLayerIndex);
    if(targetLayer.layerProp.locked == 0){
        var girdNode = document.getElementsByClassName('Grid')[0];
        if(currentState == 'doNotMove'){
            element.className += " active";
            element.setAttribute('value','move');
            editor.grid.onDragEvent();
            girdNode.style.zIndex = 999;
            changeCursor(girdNode, "move");
        }
        else if(currentState == 'move'){
            element.className = element.className.replace(" active", "");
            element.setAttribute("value","doNotMove");
            editor.grid.offDragEvent();
            girdNode.style.zIndex = "";
            changeCursor(girdNode);
        }
    }
}


var active = 1;
function EraseTile(x) {
  var layerList = editor.currentMap.LayerList;
  var topLayerIndex = layerList.size-1;
  var targetLayer = layerList.get(topLayerIndex);
  if(active == 1){
    changeCursor(targetLayer.canvasLayer.canvas, "url('img/eraser_cursor.png'), auto");
    x.className += " active";
    active = 0;
  } else{
    changeCursor(targetLayer.canvasLayer.canvas);
    x.className = x.className.replace(" active", "");
    active = 1;
  }
}

function changeCursor(targetNode, cursorStyle = ""){
    targetNode.style.cursor = cursorStyle;
}

editor.currentMap.LayerList.get(0).canvasLayer.canvas;
// editor.currentMap.LayerList.get(editor.selectedLayerId).canvasLayer.canvas;

function zoomIn(){
    var zoomFeature = editor.zoomFeature;
    if (zoomFeature.zoomcount < 3){
        zoomFeature.zoomcount += 1;
        zoomFeature.scaleX = zoomFeature.scaleY = 2;
        zoomFeature.ratioX = Math.pow(zoomFeature.canScaleX, zoomFeature.zoomcount);
        zoomFeature.ratioY = Math.pow(zoomFeature.canScaleY, zoomFeature.zoomcount);
        zoomRedraw(editor.currentMap.LayerList, zoomFeature.ratioX, zoomFeature.ratioY);
    }else{
        alert("Cannot zoom in anymore!");
    }
}

function zoomOut(){
    var zoomFeature = editor.zoomFeature;
    if (zoomFeature.zoomcount > -3){
        zoomFeature.zoomcount -= 1;
        zoomFeature.scaleX = zoomFeature.scaleY = 0.5;
        zoomFeature.ratioX = Math.pow(zoomFeature.canScaleX, zoomFeature.zoomcount);
        zoomFeature.ratioY = Math.pow(zoomFeature.canScaleY, zoomFeature.zoomcount);
        zoomRedraw(editor.currentMap.LayerList, zoomFeature.ratioX, zoomFeature.ratioY);
    }else{
        alert("Cannot zoom out anymore!");
    }
}

function zoomRedraw(layers, x, y){
    var zoomFeature = editor.zoomFeature;
    var resetGridRatioX = resetGridRatioY = 1;
    if(zoomFeature.zoomcount > 0){
        resetGridRatioX = zoomFeature.ratioX;
        resetGridRatioY = zoomFeature.ratioY;
    };
    var gridCanvas = editor.grid.grid;
    var canvasOffsetX = zoomFeature.centerX;
    var canvasOffsetY = zoomFeature.centerY;

    gridCanvas.width
        = document.getElementsByClassName("surface tab")[0].offsetWidth*resetGridRatioX;
    gridCanvas.height
        = document.getElementsByClassName("surface tab")[0].offsetHeight*resetGridRatioY;
    document.getElementsByClassName("editor-container")[0].style.width
        = resetGridRatioX*100 +"%";
    document.getElementsByClassName("editor-container")[0].style.height
        = resetGridRatioY*100 +"%";


    for (let [layerId, layer] of layers) {
        layer.canvasLayer.removeEvent();
        var can = layer.canvasLayer.canvas;
        var ctx = can.getContext("2d");
        var currentX = parseInt((can.style.left).replace("px", ""));
        var currentY = parseInt((can.style.top).replace("px", ""));
        ctx.clearRect(0,0,can.width, can.height);
        can.height = can.height * zoomFeature.scaleY;
        can.width = can.width * zoomFeature.scaleX;
        
        var layerOffsetX = canvasOffsetX*zoomFeature.scaleX -(canvasOffsetX -currentX)*zoomFeature.scaleX ;
        var layerOffsetY = canvasOffsetY*zoomFeature.scaleY -(canvasOffsetY -currentY)*zoomFeature.scaleY;
        ctx.scale(x,y);
        can.style.left = layerOffsetX + "px";
        can.style.top = layerOffsetX + "px";
        editor.grid.showGrid(layerOffsetX, layerOffsetY);
        layer.paintTiles();
        layer.canvasLayer.zoomInEvent(layer);
    }
    // setTimeout(function(){
    //     document.getElementsByClassName("surface tab")[0].scrollLeft 
    //     = canvasOffsetX*zoomFeature.scaleX;
    //     console.log(canvasOffsetX*zoomFeature.scaleX);
    //     document.getElementsByClassName("surface tab")[0].scrollTop
    //     = canvasOffsetY*zoomFeature.scaleY;
    //     console.log(canvasOffsetY*zoomFeature.scaleY);
    //   }, 100);
  }