
function myCheck() {
  var checkBox = document.getElementById("collectionOfImg");
  var checkBox2 = document.getElementById("basedOnTileSetImg");
  var text = document.getElementById("text");
  var text2 = document.getElementById("txt");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else if (checkBox2.checked == true){
     text2.style.display = "block";
  } else {
     text.style.display = "none";
     text2.style.display = "none";
  }
}

let windowBackgroundTint = document.querySelector(".window-tint");
let createMapWindow = document.querySelector("#create-map-window");
let createTileSetWindow = document.querySelector("#create-tileset-window");
let createLayerWindow = document.querySelector("#create-layer-window");
let aboutWindow = document.querySelector("#about");
let saveasWindow = document.querySelector("#saveas");
let loadWindow = document.querySelector("#loadFile");

function newMap() {  
showWindow(createMapWindow);
}

function newTileSet() {  
showWindow(createTileSetWindow);
}

function newLayer() {  
  showWindow(createLayerWindow);
  }

function cancelCreateMap() {  
  closeWindow(createMapWindow);
}

function cancelCreateTileSet() {  
  closeWindow(createTileSetWindow);
}

function cancelCreateLayer() {  
  closeWindow(createLayerWindow);
}
function openSaveAs() {  
showWindow(saveasWindow);
}

function cancelSaveAs() {  
  closeWindow(saveasWindow);
}

function createload() {  
  showWindow(loadWindow);
}

function cancelload() {  
  closeWindow(loadWindow);
}

function aboutLB() {  
  console.log("about");
  showWindow(aboutWindow);
  }
  
function cancelAbout() {  
  closeWindow(aboutWindow);
}


function loadMap(map){
    editor.grid= new Grid(map.mapWidth, map.mapHeight, map.tileWidth, map.tileHeight);
    editor.grid.showOrHide();
    if(editor.currentMap){// if currentMap is existed
      editor.clearWorkspace();
    }
    editor.currentMap = map;
    editor.loadedMapList.push(map);
    showList(editor.currentMap.LayerList);
}

var gridVisIcon = document.getElementById("gridVisability");
gridVisIcon.addEventListener("click", function(){
  editor.grid.showOrHide();
});


function createMap() {
  let mapType = "top";

  var mapWidth = parseInt(document.getElementById("map-width").value);
  var mapHeight = parseInt(document.getElementById("map-height").value);
  var tileWidth = parseInt(document.getElementById("tile-width").value);
  var tileHeight = parseInt(document.getElementById("tile-height").value);
  var mapName = document.getElementById("map-name").value;

  var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  var newMap = new TiledMap(mapName, mapWidth, mapHeight, tileWidth, tileHeight);
  newMap.LayerList.set(0, newLayer);

  saveAll_Map(newMap, newMap.LayerList, mapName);
  
  // loadAll(newMap.id);

  loadMap(newMap);
  document.getElementById("map-name").value = "";
  // create map object and load
  closeWindow(createMapWindow);
}


function createLayer() {  
    var ele = document.getElementsByName('layerType'); 
    let layerType = "tile-layer";
    var layerName = document.getElementById("input-layer").value;

    for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) {
        layerType = ele[i].value;
      }
    } 
    document.getElementById("input-layer").value = "";
    console.log(layerType);
    console.log(layerName);

  closeWindow(createLayerWindow);
  //showList(layerType, layerName);
  createNewLayer(layerType, layerName);
  
}

function createTileSet(name, image, imgWidth, imgHeight, tileWidth, tileHeight, spacing, columns, tilecount){
  var newTileset = new SingleImageTileset(name, image, imgWidth, imgHeight, tileWidth, tileHeight, spacing, columns, tilecount);
  editor.loadTileset(newTileset);
  saveAll_Tileset(newTileset);
}

var currentTileSetName;
function newTabBtn() {
  var tilesetName = document.getElementById("TilesetName").value;
  var btn = document.createElement("BUTTON");
  btn.setAttribute('class', 'tab-header2');
  btn.innerHTML = tilesetName;
  //document.body.appendChild(btn);
  document.getElementById("newTab").appendChild(btn);

  var workspace = document.createElement("div");
  workspace.setAttribute('class', 'tilesetContent');
  workspace.setAttribute('id', tilesetName);
  workspace.setAttribute('style', 'max-height: 220px; max-width:560px; overflow: scroll;');
  document.getElementById("tilesetWorkspace").appendChild(workspace);

  currentTileSetName = tilesetName;
  document.getElementById("TilesetName").value = "";
  closeWindow(createTileSetWindow);
  }

  var single = 1;
  var singlecanvas;
  var imgSource;
  var tileList;
  var tilesetH;
  var tilesetW;
  var spacing;
  var getCanvas;

  function newTabBtn2() {
    var tilesetName = document.getElementById("TilesetName").value;
    tilesetH = Number(document.getElementById("tileSet-height").value);
    tilesetW = Number(document.getElementById("tileSet-width").value);
    spacing = Number(document.getElementById("spacing").value);
    var btn = document.createElement("BUTTON");
    btn.setAttribute('class', 'tab-header2');
    btn.innerHTML = tilesetName;
    document.getElementById("newTab").appendChild(btn);
  
    var workspace = document.createElement("div");
    workspace.setAttribute('class', 'tilesetContent');
    workspace.setAttribute('id', tilesetName);
    document.getElementById("tilesetWorkspace").appendChild(workspace);
    
  
    currentTileSetName = tilesetName;
    singlecanvas =currentTileSetName +single;
    document.getElementById("TilesetName").value = "";
    closeWindow(createTileSetWindow);
    createSingleTileset();
   document.getElementById("myFile").value = "";
    }

  document.getElementById("newTab").addEventListener("click", function(e) {
    currentTileSetName = e.target.innerHTML;
    openTilesetTab(e, e.target.innerHTML); 
    // singlecanvas = currentTileSetName+"1";
    // imgSource = document.getElementById(singlecanvas).toDataURL(); 
    // loadImg.src = imgSource;
    editor.currentTileset = getTileset(currentTileSetName);
    // canvasT = document.getElementById(currentTileSetName+"1");
    getCanvas = document.getElementById(currentTileSetName+"1");
    tilesetH = editor.currentTileset.tileList[0].tileHeight;
    tilesetW = editor.currentTileset.tileList[0].tileWidth;
  });

  function getTileset(tabName){
    var tileSet;
    var tilesetList = editor.loadedTilesetList;
    for(var i=0; i<tilesetList.length; i++){
      if(tilesetList[i].name == tabName){
        tileSet = tilesetList[i];
      }
    }
    return tileSet;
  }

  var loadImg;
  var canvasT
     function createSingleTileset(){
      canvasT = document.createElement("canvas");
      canvasT.setAttribute('id', singlecanvas); 
      canvasT2 = document.createElement("canvas");
      canvasT2.setAttribute('id', singlecanvas+"2"); 
      document.getElementById(currentTileSetName).appendChild(canvasT);
      document.getElementById(currentTileSetName).appendChild(canvasT2);
      getCanvas = document.getElementById(currentTileSetName+"1");

      getCanvas.addEventListener('click', function(event) {
        var mousePos = getMousePos(getCanvas, event);
        var row = Math.floor(mousePos.x/tilesetW);
        var col = Math.floor(mousePos.y/tilesetH);
        index = getIndex(col, row);
        console.log("index "+index +" img "+currentTileSetName);
    });
      
       var oFReader = new FileReader();
       oFReader.readAsDataURL(document.getElementById("myFile").files[0]);
       
       oFReader.onload = function (oFREvent) {
         loadImg = new Image();
         loadImg.src = oFREvent.target.result;
         
       loadImg.addEventListener('load',loadImage,false);
         };
     }

   var colT;
   var rowT;
   var totalWidth;
   var totalHeight;
   var tilesetCanvas;
   var tilesetCanvas2;
   var ctxT;

   function loadImage(e){
     colT = Math.floor(loadImg.width / (tilesetW+spacing));
     rowT = Math.floor(loadImg.height / (tilesetH+spacing));
     totalWidth = tilesetW * colT;
     totalHeight = tilesetH * rowT;
     var tilecount = colT * rowT; 
    tilesetCanvas = document.getElementById(singlecanvas);
    tilesetCanvas2 = document.getElementById(singlecanvas+"2");
    // imgSource = document.getElementById(singlecanvas).toDataURL();    
     imgSource = loadImg.src;
     ctxT = tilesetCanvas.getContext('2d');
     ctxTbase = tilesetCanvas2.getContext('2d');
     tilesetCanvas.width = totalWidth;
     tilesetCanvas.height = totalHeight;
     tilesetCanvas2.width = loadImg.width;
     tilesetCanvas2.height = loadImg.height;
     tilesetCanvas.style.border = "1px solid black";
     createTileSet(currentTileSetName, imgSource, loadImg.width, loadImg.height, tilesetW, tilesetH, spacing, colT, tilecount);
     ctxTbase.drawImage(loadImg, 0, 0, loadImg.width, loadImg.height, 0, 0, loadImg.width, loadImg.height);
     tileList = createSingleTiles(currentTileSetName, imgSource, tilesetW, tilesetH, spacing);
    //  tileList = editor.currentTileset.createSingleTiles(currentTileSetName, imgSource, tilesetW, tilesetH, spacing);
    drawTile();
    }

var index;
      function drawTile(){
        var tile;
        var startXPos = 0;
        var startYPos = 0;
        var imgGet;
        for(var i = 0;i < tileList.length;i++){
            tile = tileList[i];
            imgGet = ctxTbase.getImageData(tile.xPos, tile.yPos, tile.tw, tile.th);
            ctxT.putImageData(imgGet, startXPos, startYPos);
            // ctxT.drawImage(loadImg, tile.startX, tile.startY, tile.tileWidth, tile.tileHeight, startXPos, startYPos, tile.tileWidth, tile.tileHeight);
            ctxT.strokeRect(startXPos, startYPos, tile.tw, tile.th);
            startXPos += tile.tw;
              if(startXPos >= totalWidth){
                startXPos = 0;
                startYPos += tile.th;
              }
            }
        var list = document.getElementById(currentTileSetName);
        list.removeChild(list.childNodes[1]);
    }

    function getIndex(col, row){
      var i = colT*col +row;
      return i;
    }

  function openTilesetTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tilesetContent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-header2");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-header1");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  document.getElementById("defaultOpen").click();

function saveAll_Tileset(newTileset){
  let jsonTileset = getTilesetJSON(newTileset);
  saveDataToDB(jsonTileset, "save_tileset");
}

function saveAll_Map(newMap, newLayers, mapName){
  let jsonMap = getMapJSON(newMap, mapName);
  let jsonLayers = getLayerJSON(newLayers);
  console.log(jsonMap);

  let saveMapResult = saveDataToDB(jsonMap, "save_map");
  let saveLayerResult = saveDataToDB(jsonLayers["layers"], "save_layer");
  let saveLayerPropResult = saveDataToDB(jsonLayers["layerProps"], "save_layerProp");

  //$.when(saveMapResult, saveLayerResult, saveLayerPropResult).then(function(){
    // loadAll(newMap.id)
    // .then(data => {
    //   console.log("returned data : " + data);
    // });
    // .catch(error => {
    //   console.log(error);
    // })
  //});
}

function saveAsMap(){
  var map = editor.currentMap;
  if (map == null){
    alert("There is no map to save");
  } else{
    var saveAsName = document.getElementById("saveAsName").value;
    saveAll_Map(map, map.LayerList, saveAsName);
  }
  closeWindow(saveasWindow);
}

function save(){
  var map = editor.currentMap;
  if (map == null){
    alert("There is no map to save");
  } else{
    saveAll_Map(map, map.LayerList, map.id);
  }
}

function loadFile(){
  var fileName = document.getElementById('loadFileName').value;
  console.log(fileName);
  // let loadResult = loadAll(fileName);

  loadAll(fileName)
  .then(jsonData => {
    var newMap = parseMapJson(jsonData.map);
    console.log(newMap);
    var layers = parseLayerJson(jsonData.layers, newMap);
    // var layerProps = parseLayerPropJson(jsonData.layerProps, layers);
    newMap.LayerList = layers;
    console.log(newMap);
    loadMap(newMap);
  });

  closeWindow(loadWindow);
}

var currentTileID;

function removeFile() {
  var d = document.getElementById(currentTileSetName);
  var olddiv = document.getElementById(currentTileID);
  d.removeChild(olddiv);
  }

  var count =1;
  var ImgTheight;
  var ImgTwidth;

  function loadTile() {
    var location ="pre" +count;

  var img = document.createElement("img");
  img.setAttribute('id', location);
  // img.setAttribute('style', 'width: 180px; height: 120px;');
  img.setAttribute('onload', 'resize(this)');

 var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("fileElem").files[0]);
  
  oFReader.onload = function (oFREvent) {
    document.getElementById(location).src = oFREvent.target.result;
      var myImg = document.getElementById(location);
      var ImgTheight = myImg.height;
      var ImgTwidth = myImg.width;
      console.log("@print size"+ ImgTwidth + " # "+ImgTheight);
     // updateTileSize(ImgTheight, ImgTwidth);
    };

  document.getElementById(currentTileSetName).appendChild(img);
  document.getElementById(currentTileSetName).addEventListener('click', function (e) {
     console.log("clickedIMG "+ e.target.id);
    // console.log("clicked-src "+ e.target.src);
    currentTileID = e.target.id;
  });

  count = count +1;
  };     

  const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");
  
  fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
  fileElem.click();
  }
  }, false);

  function resize(img){
    var Imgwidth = img.width;
    var Imgheight = img.height;
    var maxWidth = 180;   
    var maxHeight = 120;  
     
    if(Imgwidth > maxWidth || Imgheight > maxHeight){
       if(Imgwidth > Imgheight){
          resizeWidth = maxWidth;
          resizeHeight = Math.round((Imgheight * resizeWidth) / Imgwidth);
       }else{
          resizeHeight = maxHeight;
          resizeWidth = Math.round((Imgwidth * resizeHeight) / Imgheight);
       }
    }else{
        resizeWidth = Imgwidth;
        resizeHeight = Imgheight;
    }
    img.width = resizeWidth;
    img.height = resizeHeight;
    }

function showWindow(hwnd) {
      hwnd.style.display = "block";
      windowBackgroundTint.style.display = "block";
      isWindowOpen = true;
}

function closeWindow(hwnd) {
      hwnd.style.display = "none";
      windowBackgroundTint.style.display = "none";
      isWindowOpen = false;
}

function myFunction() {
  var x = document.getElementById("myFile");
  x.disabled = true;
}

function mySelect() {
  var tileSetType = document.forms[0];
  var txt = "";
  var i;
  for (i = 0; i < tileSetType.length; i++) {
    if (tileSetType[i].checked) {
      txt = txt + tileSetType[i].value + " ";
    }
  }
  document.getElementById("order").value = "You ordered a coffee with: " + txt;
}
    
function parseMapJson(map){
  return new TiledMap(map.name, map.width, map.height, map.tilewidth, map.tileheight);
}
    
function parseLayerJson(layers, map){
  var layerList = new Map();
  layers.forEach(function(layer){
  var layerData = layer;
  var newLayer;
  if (layerData.type === "TiledLayer"){ 
    newLayer = new TiledLayer(layerData.id, layerData.name, map.mapWidth, map.mapHeight, map.id, map.tileWidth, map.tileHeight);
  } else {
    newLayer = new ObjectLayer(layerData.id, layerData.name, map.mapWidth, map.mapHeight);
  }
    newLayer.csv = convertCSVToArray(layer.csv, Array(map.mapWidth), map.mapHeight);
    newLayer.order = layerData.orderInMap;
    layerList.set(layerList.size, newLayer);
  });
  return layerList;
}

function getMapJSON(mapData, mapName){
  console.log(editor.userName);
  return {
          "ownedBy" : editor.userName,
          "name" : mapName,
          "width" : mapData.mapWidth,
          "height" : mapData.mapHeight,
          "tilewidth" : mapData.tileWidth,
          "tileheight" : mapData.tileHeight,
          "tilelayerformat" : "csv",
          "orientation" : "orthogonal",
          "tilerenderorder" : "right-down",
  }
}

function convertArrayToCSV(csvArray, csv = ""){
  csvArray.forEach(function(rowArray) {
    let rowText = rowArray.join(",");
    csv += rowText + "\n";
});
  csv.replace("undefined", "");
  return csv;
}

function convertCSVToArray(csv, csvArray, size){
  let result = new Array();
  csvArray = csv.split("\n", size);
  csvArray.forEach(function(rowText){
    let rowArray = new Array(size);
    // each row in rowArray
    // 1. turns into String (like "0,0,0,0,0,0,0")
    rowArray = rowText.split(',');
    // 2. turns into integers
    rowArray = rowArray.map(num => parseInt(num, 10));
    // 3. push to the return variable
    result.push(rowArray);
  });
  return result;
}

function getLayerJSON(LayerData){
  let layers = [];
  let layerProps = [];

  LayerData.forEach(function(layer){
    console.log(layer);
    layers.push({
      "id" : layer.id,
      "name" : layer.name,
      "mapName" : layer.mapName,
      "orderInMap" : layer.order,
      "type" : layer.type,
      "csv" : convertArrayToCSV(layer.csv)
    });
    
    let layerPropData = layer.layerProp;
    console.log(layerPropData);
    layerProps.push({
      "id" : layerPropData.id,
      "layerId" : layer.id,
      "visible" : layerPropData.visible,
      "locked" : layerPropData.locked,
      "opacity" : layerPropData.opacity,
      "verticalOffset" : layerPropData.verticalOffset,
      "horizontalOffset" : layerPropData.horizontalOffset,
      "mapName" : layer.mapName
    });
  });

  return {"layers" : layers, "layerProps" : layerProps};
}

function getTilesetJSON(tileset){
  return {
    "ownedBy" : editor.userName,
    "name" : tileset.name,
    "spacing" : tileset.spacing,
    "margin" : tileset.margin,
    "imagewidth" : tileset.imgWidth,
    "imageheight" : tileset.imgHeight,
    "columns" : tileset.columns,
    "counts" : tileset.tilecount,
    "tilewidth" : tileset.tileWidth,
    "tileheight" : tileset.tileHeight
  }
}


function saveDataToDB(savingData, save_endpoint){
    return $.ajax({
      type : "POST",
      contentType: "application/json",
      url : "/fileController/" + save_endpoint,
      data : JSON.stringify(savingData),
      dataType : 'json',
      processData: false, 
    
      error : function(error){
        return error;
      },
      success : function(data) {
        console.log(data);
        return data;
      }
});
}

function loadAll(mapName){
  var load_endpoint = "load_map";
  return new Promise((resolve, reject) => {
  // var helper = new XMLSerializer();
    $.ajax({
        type : "POST",
        url : "/fileController/" + load_endpoint,
      data : JSON.stringify({"mapName" : mapName}),
      contentType: "application/json",
      dataType : 'json',
      processData: false, 
      
      error : function(error){
        alert("load error occurred");
        console.log("XML Loading Failed");
        reject(error);
      },

      success : function(data) {
        console.log(data);
        console.log("load success!");
        resolve(data);
      }
    });
});
}
