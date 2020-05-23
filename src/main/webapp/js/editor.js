class ZoomFeature{
    constructor(){
      this.zoomEventOn = false;
      this.canScaleX = 2;
      this.canScaleY = 2;
      this.zoomcount =0;
      this.ratioX = 1;
      this.ratioY = 1;
      this.scaleX = 1;
      this.scaleY = 1;
      this.centerX = window.innerWidth/2;
      this.centerY = window.innerHeight/2;
    }
  }

class Editor{
    constructor(){
     this.currentMap;
     this.currentTileset;
     this.currentLayer;
     this.loadedMapList = new Array();
     this.loadedTilesetList = new Array();
     this.userName;
     this.grid;
     this.selectedLayerId;
     this.zoomFeature = new ZoomFeature();
     this.tileIndex = 0;
     this.selectedTileGID =0;
     this.selectedCol = 0;
     this.selectedRow = 0;
     this.cutcopyTileGID = 0;
    }
    
    loadTileset(tileset){
       this.loadedTilesetList.push(tileset);
       this.currentTileset = tileset;
    }
    resetTilesetList(){
        this.loadedTilesetList = new Array();
        var tilesetBtnNode = document.getElementById("newTab");
        while (tilesetBtnNode.firstChild) {
           tilesetBtnNode.removeChild(tilesetBtnNode.lastChild);
        }
        var tilesetNode = document.getElementById("tilesetWorkspace");
        while (tilesetNode.firstChild) {
           tilesetNode.removeChild(tilesetNode.lastChild);
        }
    }
 
    clearWorkspace(){
     this.resetTilesetList();
     var mapNode = document.getElementsByClassName("Map")[0];
     mapNode.innerText ="";
     var gridNode = document.createElement("div");
     gridNode.className = "Grid";
     mapNode.appendChild(gridNode);
     if(this.currentMap){
       this.currentMap = null;
       this.currentLayer = null;
       this.selectedLayerId = null;
       this.grid = null;
     }
   }
 }
 
 function handleLoadMapRequest(mapName){
     var loadMapJSON = {"mapName" : mapName};
     loadAll_Map_Helper(loadMapJSON);
 
 }
 
 function handleLoadTilesetRequest(tileSetName, username){
     var loadTilesetJSON = {"name" : tileSetName, "username" : username};
     loadAll_Tileset_Helper(loadTilesetJSON);
 }
 
 function handleExportMapRequest(mapName){
     var loadMapJSON = {"mapName": mapName};
     loadAll_Map_Helper(loadMapJSON);
     setTimeout(exportMap, 2000); //wait until map has loaded to start exporting
 }
 
 function handleExportTilesetRequest(tileSetName, username){
     var loadTilesetJSON = {"name" : tileSetName, "username" : username};
     loadAll_Tileset_Helper(loadTilesetJSON);
     setTimeout(exportTileset, 2000, tileSetName); //wait until tileset has loaded to start exporting
 }
 

function editFunction(element, service){
    switch(service) {
        case 'move':
            moveGrid(element);
            break;
        case 'erase':
            EraseTile(element);
            break;
        // case 'zoomout':
        //     zoomOut();
        // case 'zoomin':
        //     zoomIn();
        default:
      }
}
// function zoomInOut(option){
//     var girdNode = document.getElementsByClassName('Grid')[0];
//     // var zoomon = editor.zoomFeature.zoomEventOn;
//     if(option == 'zoomout'){
//         console.log("zoom off");
//         editor.zoomFeature.zoomEventOn = false;
//         editor.grid.offScrollEvent();
//         changeCursor(girdNode);
//     } else{
//         console.log("zoom on");
//         editor.zoomFeature.zoomEventOn = true;
//         editor.grid.onScrollEvent();
//         changeCursor(girdNode, "n-resize");
//     }
// }


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

var selectVal=1;
function Select(x){
    var layerList = editor.currentMap.LayerList;
  var topLayerIndex = layerList.size-1;
  var targetLayer = layerList.get(topLayerIndex);
    if(selectVal == 1){
        changeCursor(targetLayer.canvasLayer.canvasHover, "url('img/mouse_hand.png'), auto");
        x.className += " active";
        selectVal = 0;
        EditIcons();
        targetLayer.canvasLayer.canvasHover.style.zIndex = 2;
        targetLayer.canvasLayer.canvasclicked.style.zIndex = 1;
        targetLayer.canvasLayer.canvasHover.addEventListener("click", tileSelectEvent);
        targetLayer.canvasLayer.canvasHover.addEventListener("mousemove", hoverEvent);
      } else{
        changeCursor(targetLayer.canvasLayer.canvasHover);
        x.className = x.className.replace(" active", "");
        selectVal = 1;
        EditIcons();
        targetLayer.canvasLayer.canvasHover.removeEventListener('click', tileSelectEvent);
        targetLayer.canvasLayer.canvasHover.removeEventListener('mousemove', hoverEvent);
        targetLayer.canvasLayer.canvasHover.style.zIndex = -1;
        targetLayer.canvasLayer.canvasclicked.style.zIndex = -1;
        targetLayer.paintTiles();
      }
}

function EditIcons(selectVal){
    var editIcon = document.getElementById("EditIcons");
    var Icon = document.getElementById("Icons");
    if (editIcon.style.display === "none") {
        editIcon.style.display = "block";
        Icon.style.display = "none";
      } else {
        editIcon.style.display = "none";
        Icon.style.display = "block";
      }
}

function cut(){
    if(editor.selectedTileGID == 0){
        alert("No tile to Cut!");
        return;
    }else{
    editor.cutcopyTileGID = editor.selectedTileGID;
    var current = editor.currentMap;
    var topLayerIndex = current.LayerList.size-1;
    var a = getKey(editor.currentMap.csvGid.get(editor.selectedTileGID));
    var tilesett = getTilesetwithName(a);
    tsH = tilesett.tileHeight;
    tsW = tilesett.tileWidth;
    current.LayerList.get(topLayerIndex).eraseTile(editor.selectedRow, editor.selectedCol, current.LayerList.get(topLayerIndex).canvasLayer.canvas, tsH, tsW);
    }
}

function copy(){
    if(editor.selectedTileGID == 0){
        alert("No tile to Copy!");
        return;
    }else{
        editor.cutcopyTileGID = editor.selectedTileGID;
    }
}

function paste(){
    var current = editor.currentMap;
    var topLayerIndex = current.LayerList.size-1;
    var currentLayer = current.LayerList.get(topLayerIndex);
    var row = editor.selectedRow;
    var col = editor.selectedCol;
    currentLayer.csv[col][row] = editor.cutcopyTileGID;
    
    // var llist = editor.currentMap.LayerList;
    // var layer = llist.get(llist.size-1);
    // var csvTile = layer.canvasLayer.getCSVvalue();
    // var a = getKey(editor.currentMap.csvGid.get(editor.cutcopyTileGID));
    // var tilesett = getTilesetwithName(a);
    // tsH = tilesett.tileHeight;
    // tsW = tilesett.tileWidth;

    // transactionManager.doAction(new PaintAction(currentLayer, row, col, editor.cutcopyTileGID, tsH, tsW));
    current.LayerList.get(topLayerIndex).canvasLayer.canvasHover.getContext("2d").clearRect(0,0,current.mapWidth*current.tileWidth, current.mapHeight*current.tileHeight);
    current.LayerList.get(topLayerIndex).paintTiles();
}

function Delete(){
    if(editor.selectedTileGID == 0){
        alert("No tile to Delete!");
        return;
    }else{
    var csvTile = editor.currentMap.LayerList.get(editor.currentMap.LayerList.size-1).csv[editor.selectedCol][editor.selectedRow]
    var a = getKey(editor.currentMap.csvGid.get(csvTile));
    var tilesett = getTilesetwithName(a);
    tsH = tilesett.tileHeight;
    tsW = tilesett.tileWidth;
    var topLayerIndex = editor.currentMap.LayerList.size-1;
    editor.currentMap.LayerList.get(topLayerIndex).eraseTile(editor.selectedRow, editor.selectedCol, editor.currentMap.LayerList.get(topLayerIndex).canvasLayer.canvas, tsH, tsW);
    current.LayerList.get(topLayerIndex).canvasLayer.canvasHover.getContext("2d").clearRect(0,0,current.mapWidth*current.tileWidth, current.mapHeight*current.tileHeight);    
    }
}

function changeCursor(targetNode, cursorStyle = ""){
    targetNode.style.cursor = cursorStyle;
}

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
    editor.grid.updateZoom(resetGridRatioX, resetGridRatioY);
    var canvasOffsetX = document.getElementsByClassName("surface tab")[0].offsetWidth/2;
    // var canvasOffsetX = zoomFeature.centerX;
    var canvasOffsetY = document.getElementsByClassName("surface tab")[0].offsetHeight/2;
    // var canvasOffsetY = zoomFeature.centerY;
    var topLayerIndex = layers.size-1;

    for (let [layerId, layer] of layers) {
        layer.canvasLayer.removeEvent();
        var can = layer.canvasLayer.canvas;
        var ctx = can.getContext("2d");
        var currentX = parseInt((can.style.left).replace("px", ""));
        var currentY = parseInt((can.style.top).replace("px", ""));
        ctx.clearRect(0,0,can.width, can.height);
        can.height = can.height * zoomFeature.scaleY;
        can.width = can.width * zoomFeature.scaleX;
        
        var layerOffsetX = currentX*zoomFeature.scaleX;
        var layerOffsetY = currentY*zoomFeature.scaleY;
        ctx.scale(x,y);
        can.style.left = layerOffsetX + "px";
        can.style.top = layerOffsetX + "px";
        layer.paintTiles();
        layer.canvasLayer.zoomInEvent(layer);
        if(layerId == topLayerIndex){
            editor.grid.showGrid(layerOffsetX, layerOffsetY);
        }
    }
    console.log("before " + document.getElementsByClassName("surface tab")[0].scrollLeft);
    console.log("before " + canvasOffsetX);
    console.log("before " + canvasOffsetY);

    setTimeout(function(){
    document.getElementsByClassName("surface tab")[0].scrollLeft
    = canvasOffsetX;
    // = (canvasOffsetX - 1)*zoomFeature.scaleX;
    document.getElementsByClassName("surface tab")[0].scrollTop
    = canvasOffsetY;
    // = (canvasOffsetY - 1)*zoomFeature.scaleY;
    console.log("after " + document.getElementsByClassName("surface tab")[0].scrollLeft);
  }, 200);
    // setTimeout(function(){
    //     document.getElementsByClassName("surface tab")[0].scrollLeft 
    //     = canvasOffsetX*zoomFeature.scaleX;
    //     console.log(canvasOffsetX*zoomFeature.scaleX);
    //     document.getElementsByClassName("surface tab")[0].scrollTop
    //     = canvasOffsetY*zoomFeature.scaleY;
    //     console.log(canvasOffsetY*zoomFeature.scaleY);
    //   }, 100);
  }