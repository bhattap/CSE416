var idL=0;
class Map{
    constructor(id, mapWidth, mapHeight, tileWidth, tileHeight, layer){
        this.id = id;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.LayerList = new Array(layer);
    }

    addLayer(layerType, name){
        var newLayer;
        //var id = this.LayerList.length;
        
        var id = idL + 1;
        console.log("idL "+ idL + "id: " +id);
        if (layerType === "tile-layer"){ 
          newLayer = new TiledLayer(id, name, this.mapWidth, this.mapHeight, this.tileWidth, this.tileHeight);
        } else {
          newLayer = new ObjectLayer(id, name, this.mapWidth, this.mapHeight);
        }
        this.LayerList.push(newLayer);
        idL = idL + 1;
    }

    removeLayer(Lname){
        console.log("removeL"+Lname);
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList[i].name === Lname){
                this.LayerList.splice(i,1);
            }
        }
    }

    duplicateLayers(Lname){
        var index;
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList[i].name === Lname){
                index = i;
                console.log("print index "+ index);
            }
        }
        var nameL = this.LayerList[index].name + " 2";
        var Lid = this.LayerList[index].id + 20;
        var newLayer = new TiledLayer(Lid, nameL, this.mapWidth, this.mapHeight, this.mapName, this.tileWidth, this.tileHeight);
        this.LayerList.splice(index+1, 0, newLayer);
    }

    findLocation(Lname){
        var find;
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList[i].name === Lname){
                console.log("f"+i);
                find = i;
                return find;
            }
        }
    }
    
    lowerLayer(Lname){
        var selected;
        var selectedBelow;
        var index = this.findLocation(Lname);
        console.log("index clicked "+index);
        selected = this.LayerList[index];
        selectedBelow = this.LayerList[index+1];
        this.LayerList.splice(index+1,1);
        this.LayerList.splice(index,1);
        this.LayerList.splice(index, 0, selectedBelow);
        this.LayerList.splice(index+1, 0, selected);
    }

    upperLayer(Lname){
        var selected;
        var selectedAbove;
        for( var i = 0; i<this.LayerList.length; i++){
            if ( this.LayerList[i].name === Lname){
                //console.log("select index "+ i);
                selected = this.LayerList[i];
                selectedAbove = this.LayerList[i-1];
                this.LayerList.splice(i,1);
                this.LayerList.splice(i-1,1); 
                this.LayerList.splice(i-1, 0, selected);
                this.LayerList.splice(i, 0, selectedAbove);
               
            }
        }
    }

    //createGroup(){
    //
    //}
}
var selectedLayerId;
var selectedLayerName;

function createNewLayer(layerType, name) {
	var currentMap = editor.currentMap;
	currentMap.addLayer(layerType, name);
    var layers = currentMap.LayerList;
    showList(layers);
	//showLayers(layers);
}

function removeLayer(){
    var currentMap = editor.currentMap;
    currentMap.removeLayer(selectedLayerName);
    var layers = currentMap.LayerList;
    for (var i=0; i<layers.length; i++) {
        console.log("r"+ layers[i].name);
    }
    showList(layers);
}

document.getElementById("myUL").addEventListener("click", function(e) {
    if (e.target && e.target.matches("li.layerlist")) {
      e.target.className = "foo"; // new class name here
      //alert("clicked " + e.target.innerText);
      selectedLayerName = e.target.innerText;
      console.log("clicked  "+e.target.innerText);
      console.log(e.target);
    }
  });

function showList(Llist){
      var list1 = document.getElementById("myUL");
        //var list = document.getElementById("myList");
        while (list1.hasChildNodes()) {
          list1.removeChild(list1.firstChild);
        }

    for (i = 0; i < Llist.length; i++) {
        var li = document.createElement("li");
        var inputValue = Llist[i].name;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        li.className = "layerlist";
        document.getElementById("myUL").appendChild(li);
    }

}

function duplicateLayer(){
    var currentMap = editor.currentMap;
    //var idd = currentMap.findLocation(selectedLayerName);
    currentMap.duplicateLayers(selectedLayerName);
    var layers = currentMap.LayerList;
    // for (var i=0; i<layers.length; i++) {
    //     console.log("d"+ layers[i].name);
    // }
    showList(layers);

}

function moveLayerDown(){
    var currentMap = editor.currentMap;
    //var idd = currentMap.findLocation(selectedLayerName);
    currentMap.lowerLayer(selectedLayerName);
    var layers = currentMap.LayerList;
    showList(layers);
}

function moveLayerUp(){
    var currentMap = editor.currentMap;
    //var idd = currentMap.findLocation(selectedLayerName);
    currentMap.upperLayer(selectedLayerName);
    var layers = currentMap.LayerList;
    showList(layers);
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
        this.order = id;
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
        this.csv = Array.from(Array((width)), () => Array((height)));
        this.type = "TiledLayer";
        var lengthOfCSV = this.csv.length;
        for (var i = 0; i < lengthOfCSV; i += 2) {
            for(var j = 0; j < this.csv[0].length; j +=2){
                this.csv[i][j] = 1;
            }
        }
    }
    fillTiles(x, y, canvas){
        var mapGrid = this.csv;
        var tileW = this.tileW;
        var tileH = this.tileH;
        canvas.getContext("2d").fillStyle = "#800000";
        canvas.getContext("2d").fillRect(tileW*x, tileH*y, tileW, tileH);
        console.log("call fillTiles");
        this.csv[x][y] = 1;
    }
    

}

class ObjectLayer extends Layer{
    constructor(id, name, width, height, mapName){
        super(id, name, width, height);
        this.objects = new Array(); // insert the MapObject later
        this.type = "ObjectLayer";
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
}

