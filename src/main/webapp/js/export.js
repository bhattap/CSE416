let exportasMapWindow = document.querySelector("#exportas_map");
let exportasTilesetWindow = document.querySelector("#exportas_tileset");
function openExportAsMap() {  
    showWindow(exportasMapWindow);
}
    
function cancelExportAsMap() {  
    closeWindow(exportasMapWindow);
}
    
function openExportAsTileset() {  
    showWindow(exportasTilesetWindow);
}
    
function cancelExportAsTileset() {  
    closeWindow(exportasTilesetWindow);
}
    
function exportMap(filename = editor.currentMap.id){
    var map = editor.currentMap;
    if(map){
        var xmlFile = MapXML(map);
        // open document chooser
        createMapXMLFile(xmlFile, filename);
    } else{
        alert("There is no map to export");
    }
}

function exportTileset(filename){
    var targetTileset;
    var tilesetList = editor.loadedTilesetList;
    tilesetList.forEach(function(tileset){
        if(tileset.name == filename){
            targetTileset = tileset;
        }
    });

    if(targetTileset){
        var xmlFile = SingleTilesetXML(targetTileset);
        // open document chooser
        createSingleTilesetXML(xmlFile, filename);
    } else{
        alert("There is no tileset named" + filename);
    }
}

function exportAsMap(){
    var fileName = document.getElementById("exportAsName_map").value;
    if("" == fileName){
        alert("Invalid input. Please enter a name for this map.");
        return;
    }
    exportMap(fileName);
}

function exportAsTileset(){
    var fileName = document.getElementById("exportAsName_tileset").value;
    if("" == fileName){
        alert("Invalid input. Please enter a name for this tileset.");
        return;
    }
    exportTileset(fileName);
}

function createMapXMLFile(xmlFile, name) {
    var xml = new XMLSerializer().serializeToString(xmlFile);
    var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
    saveAs(blob, name+".tmx");
}

function MapXML(map)
  {
      var layers = map.LayerList;
      var doc = document.implementation.createDocument(null, null);
      var mapElem = doc.createElement("map");
      mapElem.setAttribute("version", "1.2");
      mapElem.setAttribute("tiledversion", "1.3.2");
      mapElem.setAttribute("orientation", "orthogonal");
      mapElem.setAttribute("renderoreder", "right-down");
      mapElem.setAttribute("compressionlevel", "-1");
      mapElem.setAttribute("width", map.mapWidth);
      mapElem.setAttribute("height", map.mapHeight);
      mapElem.setAttribute("tilewidth", map.tileWidth);
      mapElem.setAttribute("tileheight", map.tileHeight);
      mapElem.setAttribute("infinite", "0");
      mapElem.setAttribute("nextlayerid", layers.length);
      mapElem.setAttribute("nextobjectid", "1");  

      layers.forEach(function(layer){
        if(layer.type == "TiledLayer"){
            var layerElem = doc.createElement("layer");
            layerElem.setAttribute("id", layer.id);
            layerElem.setAttribute("name", layer.name);
            layerElem.setAttribute("width", layer.width);
            layerElem.setAttribute("height", layer.height);
            var dataElem = doc.createElement("data");
            dataElem.setAttribute("encoding", "csv");
            var csvArr = layer.csv;
            var csv = csvArr.join(",");
            var node = doc.createTextNode(csv);
            dataElem.appendChild(node);
            layerElem.appendChild(dataElem);
        }
        else{//"ObjectLayer"
            var layerElem = doc.createElement("objectgroup");
            layerElem.setAttribute("id", layer.id);
            layerElem.setAttribute("name", layer.name);
        }
        mapElem.appendChild(layerElem);
     });
      doc.appendChild(mapElem);
      return doc;
  }


function createSingleTilesetXML(xmlFile, name) {
    var xml = new XMLSerializer().serializeToString(xmlFile);
    var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
    saveAs(blob, name+".tsx");
}

function SingleTilesetXML(tileset)
{
    var doc = document.implementation.createDocument(null, null);
    var tilesetElem = doc.createElement("tileset");
    tilesetElem.setAttribute("version", "1.2");
    tilesetElem.setAttribute("tiledversion", "1.3.2");
    tilesetElem.setAttribute("name", tileset.name);
    tilesetElem.setAttribute("tilewidth", tileset.tileWidth);
    tilesetElem.setAttribute("tilehegiht", tileset.tileHeight);
    tilesetElem.setAttribute("spacing", tileset.spacing);
    tilesetElem.setAttribute("margin", 1);
    tilesetElem.setAttribute("tilecount", tileset.tilecount);
    tilesetElem.setAttribute("columns", tileset.columns); 
    var imageElem = doc.createElement("image");
    imageElem.setAttribute("source", tileset.src);
    // function for getting imagewidth, imageHeight from the source
    imageElem.setAttribute("width", tileset.imgWidth);
    imageElem.setAttribute("height", tileset.imgHeight);

    tilesetElem.appendChild(imageElem);
    doc.appendChild(tilesetElem);
    return doc;
}

function screenshot_map(){
    var canvas = document.createElement("canvas");
    canvas.width = editor.
    canvas.height = 
}


