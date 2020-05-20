var idL=0;
var dup=2;
var selectedLayerName;
class TiledMap{
    constructor(id, mapWidth, mapHeight, tileWidth, tileHeight){
        this.id = id;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.LayerList = new Map();
        this.nextgid = 1;
        this.selectedTilesetList = new Map(); // key : tileset name / value : firstGid
        this.csvGid = new Map(); // key: globalID / value: firstGid
    }
    updateNextGid(selectedName, size){
        if(this.selectedTilesetList.size ==0){
            this.selectedTilesetList.set(selectedName,this.nextgid); 
            this.nextgid = this.nextgid + size;
        }  
        else{
            if(!(this.selectedTilesetList.has(selectedName))){
                this.selectedTilesetList.set(selectedName,this.nextgid); 
                this.nextgid = this.nextgid + size;
            }
        }
    }
    updateCSVGid(csvValue, gidValue){
        if(this.csvGid.size ==0){
            this.csvGid.set(csvValue, gidValue); 
        }  
        else{
            if(!(this.csvGid.has(csvValue))){
                this.csvGid.set(csvValue, gidValue); 
            }
        }
    }

    addLayer(layerType, name){
        var newLayer;
        var id = idL + 1;
        console.log("idL "+ idL + "id: " +id);
        if (layerType === "tileLayer"){ 
          newLayer = new TiledLayer(id, name, this.mapWidth, this.mapHeight, this.id, this.tileWidth, this.tileHeight);
          newLayer.order = editor.currentMap.LayerList.size;
         
        } else {
          newLayer = new ObjectLayer(id, name, this.mapWidth, this.mapHeight);
        }
        // newLayer.canvas.style.zIndex = 0;
        this.LayerList.set(this.LayerList.size, newLayer);
        idL = idL + 1;
    }

    removeLayer(targetId){
        var layer = this.LayerList.get(targetId);
        layer.canvasLayer.hideCanvas();
         
        //  var layerList = this.LayerList;
        for(var i=0; i<this.LayerList.size; i++){
            var check = this.LayerList.get(i).order;
            if(check>layer.order){
               this.LayerList.get(i).order -= 1;
               var temp = this.LayerList.get(i);
                // this.LayerList.set(i, this.LayerList.get(i-1));
                this.LayerList.set(i-1, temp);
            }
        }
        this.LayerList.delete(this.LayerList.size-1);      
    }

    duplicateLayers(targetId){
        let targetLayer = this.LayerList.get(targetId);
        let newName = targetLayer.name + "(" + dup + ")";
        let index = this.LayerList.size;
        var newLayer = Object.assign({}, targetLayer, {name: newName, id : index, order: index});
        // var newLayer = new TiledLayer(index, newName, this.mapWidth, this.mapHeight, this.id, this.tileWidth, this.tileHeight);
        this.LayerList.set(index, newLayer);
        dup += 1;
    }

    updateOrder(targetId, layers, move){
        layers.get(targetId).order  = targetId+move;
        layers.get(targetId+move).order  = targetId;
            
        // update LayerList order
        var temp = layers.get(targetId);
        layers.set(targetId, layers.get(targetId+move));
        layers.set(targetId+move, temp);
        
        editor.selectedLayerId = targetId +move;
        // showList(layers);
    }
    
    lowerLayer(targetId, layers){
        if(targetId > 0){
            this.updateOrder(targetId, layers, -1);
        }else {
            alert("Cannot lower layer");
        }
    }

    upperLayer(targetId, layers){
        if(targetId < layers.size-1){
           this.updateOrder(targetId, layers, 1);
        }else {
            alert("Cannot upper layer");
        }
    }
}

function createNewLayer(layerType, name) {
   var currentMap = editor.currentMap;
   currentMap.addLayer(layerType, name);
    var layers = currentMap.LayerList;
    showList(layers);
}

function removeLayer(){
    var targetId = editor.selectedLayerId;
    if(targetId != null){
        editor.currentMap.removeLayer(targetId);
        showList(editor.currentMap.LayerList);
    } else {
        alert("There is no layer to remove");
    }
}

document.getElementById("myUL").addEventListener("click", function(e) {
    if (e.target && e.target.matches("li.layerlist")) {
      editor.selectedLayerId = parseInt(e.target.id);
      selectedLayerName = e.target.innerText;
    }
  });

function showList(Llist){ // Llist == layer lists in current Map
    var list1 = document.getElementById("myUL");
    while (list1.hasChildNodes()) {
        list1.removeChild(list1.firstChild);
    }
    var topLayerIndex = Llist.size-1;
    for(var i=topLayerIndex; i>-1; i--){
        var layer = Llist.get(i);
        var li = document.createElement("li");
        li.id = layer.order;
        var inputValue = layer.name;
        var layername = document.createTextNode(inputValue);
        li.appendChild(layername);
        var visibleButton = createVisibleButton(layer);
        var lockButton = createLockButton(layer);
        li.appendChild(visibleButton);
        li.appendChild(lockButton);
        li.className = "layerlist";
        document.getElementById("myUL").appendChild(li);

        // reorder the real canvas layer 
        layer.canvasLayer.canvas.style.zIndex = li.id;
    }
    var topCanvasStyle = Llist.get(topLayerIndex).canvasLayer.canvas.style;
    var x = parseInt(topCanvasStyle.left.replace("px", ""));
    var y = parseInt(topCanvasStyle.top.replace("px", ""));
    editor.grid.showGrid(x, y);
}

function createVisibleButton(layer){
    var visibleButton = document.createElement('i');
    var result = "fa-eye";
    var toggleValue = "fa-eye-slash";
    // if (!layer.layerProp.isVisible()){
    //     [result, toggleValue] = [toggleValue, result];
    // }
    visibleButton.className = "fa " + result;
    visibleButton.id = layer.order;
    visibleButton.addEventListener("click", function(e){
        e.target.classList.toggle(toggleValue);
        layer.layerProp.changeVisible(layer);
    });
    return visibleButton;
}

function createLockButton(layer){
    var lockButton = document.createElement('i');
    var toggleValue = "fa-lock-open";
    lockButton.className = "fa fa-lock fa-lock-open";
    lockButton.id = layer.order;
    lockButton.addEventListener("click", function(e){
        e.target.classList.toggle(toggleValue);
        layer.layerProp.changetoLock(layer);
    });
    return lockButton;
}

function duplicateLayer(){
    var targetId = editor.selectedLayerId;
    if(targetId != null){
        editor.currentMap.duplicateLayers(targetId);
        showList(editor.currentMap.LayerList);
    } else {
        alert("There is no layer to duplicate");
    }

}

function moveLayerDown(){
    var selectedLayerId = editor.selectedLayerId;
    var layers = editor.currentMap.LayerList;
    editor.currentMap.lowerLayer(selectedLayerId, layers);
    showList(layers);
}

function moveLayerUp(){
    var selectedLayerId = editor.selectedLayerId;
    var layers = editor.currentMap.LayerList;
    editor.currentMap.upperLayer(selectedLayerId, layers);
    showList(layers);
}

class Layer{
    constructor(id, name, width, height, mapName){ 
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.order = id; // order should be changed
        this.mapName = mapName;
        this.layerProp = new LayerProperties(id);
        this.tilesets = new Array();
    }

   // clone(){

    //}
}

class TiledLayer extends Layer{
    constructor(id, name, width, height, mapName, tileW, tileH, offsetX=0, offsetY=0){
        super(id, name, width, height, mapName);
        this.tileW = tileW;
        this.tileH = tileH;
        this.csv = Array.from(Array((width)), () => Array((height)).fill(0));
        this.type = "TiledLayer";
        this.canvasLayer = new TiledCanvas(width, height, tileW, tileH, this, offsetX, offsetY);
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    fillTiles(x, y, canvas){
        tileList = editor.currentTileset.tileList;
        var imgg = new Image();
        imgg.src = editor.currentTileset.image.src;
        this.canvasLayer.canvas.getContext("2d").clearRect(0,0, editor.currentMap.mapWidth*editor.currentMap.tileWidth, editor.currentMap.mapHeight*editor.currentMap.tileWidth);
        // this.canvasLayer.canvas.getContext("2d").clearRect(x*editor.currentMap.tileWidth, y*editor.currentMap.tileHeight, editor.currentMap.tileWidth, editor.currentMap.tileHeight);
        // this.canvasLayer.canvas.getContext("2d").drawImage(imgg,tileList[index].startX, tileList[index].startY,tileList[index].tileWidth, tileList[index].tileHeight, this.tileW*x, this.tileH*y, tileList[index].tileWidth, tileList[index].tileHeight );
        editor.currentMap.updateNextGid(editor.currentTileset.name, editor.currentTileset.tilecount);
        var ggid = Number(editor.currentMap.selectedTilesetList.get(editor.currentTileset.name));
        this.csv[y][x] = index + ggid;
        editor.currentMap.updateCSVGid(index + ggid, ggid);
        this.paintTiles()
    }

    eraseTile(x, y, canvas,th, tw){
        var mapH = editor.currentMap.tileHeight;
        var mapW = editor.currentMap.tileWidth;
        this.canvasLayer.canvas.getContext("2d").clearRect(x*mapW, y*mapH, tw+1, th+1);
        this.csv[y][x] = 0;
        this.paintTiles()
    }

    paintTiles(){
        var loadmapW = this.width;
        var loadmapH = this.height;
        var can = this.canvasLayer.canvas;
        var ctx = can.getContext("2d");
        var TS;
        for(var i=0; i<loadmapW; i++){
            for(var j=0; j<loadmapH; j++){
                if(this.csv[i][j] !=0){
                    var firstgid = editor.currentMap.csvGid.get(this.csv[i][j]);
                    var Tsname = getKey(firstgid);
                    TS = getTilesetwithName(Tsname);
                    var localID = this.csv[i][j] - firstgid;
                    var loadedImg = new Image();
                    console.log(TS);
                    loadedImg.src = TS.image.src;
                    ctx.drawImage(loadedImg, TS.tileList[localID].startX, TS.tileList[localID].startY, TS.tileWidth, TS.tileHeight,j*this.tileW, i*this.tileH, TS.tileWidth, TS.tileHeight);
                }
            }
        }
    }
}
 
function getKey(val){
    var map = editor.currentMap.selectedTilesetList;
    var b;
    map.forEach(function(value, key) {
        if(value == val){
            b =key
        }
      })
      return b;
}

function updateGidAfterLoad(){
    for(var i=0; i<editor.loadedTilesetList.length; i++){
        editor.currentMap.nextgid = editor.currentMap.nextgid + editor.loadedTilesetList[i].tilecount;
    }
}

class ObjectLayer extends Layer{
    constructor(id, name, width, height, mapName){
        super(id, name, width, height, mapName);
        this.objects = new Array(); // insert the MapObject later
        this.type = "ObjectLayer";
        this.canvasW = document.getElementsByClassName("editor-container")[0].clientWidth;
        this.canvasH = document.getElementsByClassName("editor-container")[0].clientHeight;
        this.canvasLayer = new ObjectCanvas(this.canvasW, this.canvasH, this);
    }
    fillObject(x, y){
        // this.canvasLayer.canvas.getContext("2d").fillStyle = "#FF9896";
        // this.canvasLayer.canvas.getContext("2d").fillRect(this.tileW*x, this.tileH*y, this.tileW, this.tileH);
        // var img = document.getElementById(currentTileID);
        var img = new Image(64, 64);
        img.src = 'gemRedStroked.png';
        this.canvasLayer.canvas.getContext("2d").drawImage(img, x, y);
    }
}

class MapObject{
    constructor(id, xcoordinate, ycoordinate, height, width, image, properties){
        this.id = id;
        this.xcoordinate = xcoordinate;
        this.ycoordinate = ycoordinate;
        this.visibility = true;
        this.height = height;
        this.width = width;
        this.image = image;
        this.properties = properties;
    }
}

class LayerProperties{
    constructor(){
        this.id = 0;
        this.visible = 1;
        this.locked = 0; // 0: locked false(unlocked) / 1 : locked true(locked)
        this.opacity = 1;
        this.verticalOffset = 0;
        this.horizontalOffset = 0;
    }

    changeVisible(layer){
        if(this.visible == 1){
            this.visible = 0;
            layer.canvasLayer.hideCanvas();
        } else{
            this.visible = 1;
            layer.canvasLayer.showCanvas(layer);
        } 
    }
  
    changetoLock(layer){
        console.log("before " + this.locked);
        if(this.locked == 1){ 
            this.locked = 0;
            layer.canvasLayer.addEventAgain(layer);
        } else{
            this.locked = 1;
            layer.canvasLayer.removeEvent();
        } 
        console.log("after " +this.locked);
    }
}
