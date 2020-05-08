var idL=0;
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
        this.selectedTilesetList = new Array();
    }

    addLayer(layerType, name){
        var newLayer;
        var id = idL + 1;
        console.log("idL "+ idL + "id: " +id);
        if (layerType === "tileLayer"){ 
          newLayer = new TiledLayer(id, name, this.mapWidth, this.mapHeight, this.id, this.tileWidth, this.tileHeight);
         
        } else {
          newLayer = new ObjectLayer(id, name, this.mapWidth, this.mapHeight);
        }
        // newLayer.canvas.style.zIndex = 0;
        this.LayerList.set(this.LayerList.size, newLayer);
        idL = idL + 1;
    }

    removeLayer(targetId){
        this.LayerList.delete(targetId);
    }

    duplicateLayers(targetId){
        let targetLayer = this.LayerList.get(targetId);
        let index = this.LayerList.size;
        var newLayer = Object.assign({}, targetLayer, {id : index});
        this.LayerList.set(index, newLayer);
    }

    updateOrder(targetId, layers, move){
        layers.get(targetId).order  = targetId-1;
        layers.get(targetId+move).order  = targetId;
            
        // update LayerList order
        var temp = layers.get(targetId);
        layers.set(targetId, layers.get(targetId+move));
        layers.set(targetId+move, temp);
        
        editor.selectedLayerId = targetId +move;
        showList(layers);
    }
    
    lowerLayer(targetId, layers){
        if(targetId < layers.size-1){
            this.updateOrder(targetId, layers, 1);
        }
    }

    upperLayer(targetId, layers){
        if(targetId> 0){
           this.updateOrder(targetId, layers, -1);
        }
    }
}

function createNewLayer(layerType, name) {
	var currentMap = editor.currentMap;
	currentMap.addLayer(layerType, name);
    var layers = currentMap.LayerList;
    showList(layers);
	//showLayers(layers);
}

function removeLayer(){
    var targetId = editor.selectedLayerId;
    if(targetId != null){
        editor.currentMap.removeLayer(editor.selectedLayerId);
        showList(editor.currentMap.LayerList);
    } else {
        alert("There is no layer to remove");
    }
}

document.getElementById("myUL").addEventListener("click", function(e) {
    if (e.target && e.target.matches("li.layerlist")) {
    //   e.target.className = "foo"; // new class name here
    //   alert("clicked " + e.target.innerText);
      editor.selectedLayerId = parseInt(e.target.id);
      selectedLayerName = e.target.innerText;
    }
  });

function showList(Llist){ // Llist == layer lists in current Map
    var list1 = document.getElementById("myUL");
    while (list1.hasChildNodes()) {
        list1.removeChild(list1.firstChild);
    }
    
    Llist.forEach(function(layer){ // listing by order
        // reorder the layer list
        var li = document.createElement("li");
        li.id = layer.order;
        var inputValue = layer.name;
        var layername = document.createTextNode(inputValue);
        li.appendChild(layername);
        var visibleButton = createVisibleButton(layer);
        li.appendChild(visibleButton);
        li.className = "layerlist";
        document.getElementById("myUL").appendChild(li);

        // reorder the real canvas layer 
        layer.canvasLayer.canvas.style.zIndex = layer.order;
    });
}

function createVisibleButton(layer){
    var visibleButton = document.createElement('i');
    var result = "fa-eye";
    var toggleValue = "fa-eye-slash";
    if (!layer.layerProp.isVisible()){
        [result, toggleValue] = [toggleValue, result];
    }
    visibleButton.className = "fa "+result;
    visibleButton.id = layer.order;
    visibleButton.addEventListener("click", function(e){
        e.target.classList.toggle(toggleValue);
        layer.layerProp.changeVisible(layer);
    });
    return visibleButton;
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
}

function moveLayerUp(){
    var selectedLayerId = editor.selectedLayerId;
    var layers = editor.currentMap.LayerList;
    editor.currentMap.upperLayer(selectedLayerId, layers);
}

function showLayers(layers){
    // show the layers (UI)
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
    constructor(id, name, width, height, mapName, tileW, tileH){
        super(id, name, width, height, mapName);
        this.tileW = tileW;
        this.tileH = tileH;
        this.csv = Array.from(Array((width)), () => Array((height)).fill(0));
        this.type = "TiledLayer";
        this.canvasLayer = new TiledCanvas(width, height, tileW, tileH, this);
    }

    fillTiles(x, y, canvas){
        // this.canvasLayer.canvas.getContext("2d").fillStyle = "#FF9896";
        // this.canvasLayer.canvas.getContext("2d").fillRect(this.tileW*x, this.tileH*y, this.tileW, this.tileH);
        // After clicking collection of Images ->
        // var img = document.getElementById(currentTileID);
        // this.canvasLayer.canvas.getContext("2d").drawImage(img, this.tileW*x, this.tileH*y);
        // var imgTo = ctxT.getImageData(tileList[index].xPos, tileList[index].yPos, tileList[index].tw, tileList[index].th)
        //this.canvasLayer.canvas.getContext("2d").putImageData(imgToDraw, this.tileW*x, this.tileH*y);
        tileList = editor.currentTileset.tileList;
        var imgg = new Image();
        // console.log("fill "+editor.currentTileset.tileList[index].src );
        imgg.src = editor.currentTileset.tileList[index].src;
        this.canvasLayer.canvas.getContext("2d").drawImage(imgg,tileList[index].startX, tileList[index].startY,tileList[index].tileWidth, tileList[index].tileHeight, this.tileW*x, this.tileH*y, tileList[index].tileWidth, tileList[index].tileHeight );
        this.csv[x][y] = 1;
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
        this.locked = 0;
        this.opacity = 1;
        this.verticalOffset = 0;
        this.horizontalOffset = 0;
    }

    isVisible(){
        if(this.visible == 1){
            return "fa fa-eye";
        }
        return "fa fa-eye-slash";
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
}

