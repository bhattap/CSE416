function getTilesetwithName(nameT) {
  var list = editor.loadedTilesetList;
  console.log("check ");
  console.log(list);
  var tileset;
  console.log("function callsed "+list.length);
  for(var i=0; i<list.length; i++){
    if(list[i].name == nameT){
      tileset = list[i];
    }
  }return tileset;
}

var active =1;
var tsH;
var tsW;
function EraseTile(x) {
if(active ==1){
  x.className += " active";
  active = 0;
  }else{
    x.className = x.className.replace(" active", "");
    active=1;
  }
}

function getTWTH(){
  var llist = editor.currentMap.LayerList;
  var layer = llist.get(llist.size-1);
  var csvTile = layer.canvasLayer.getCSVvalue();
  console.log("CSV "+ csvTile + "Indx "+editor.currentMap.csvGid.get(csvTile));
  var a = getKey(editor.currentMap.csvGid.get(csvTile));
  var tilesett = getTilesetwithName(a);
  tsH = tilesett.tileHeight;
  tsW = tilesett.tileWidth;
}

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

function selectLoadOption(selectedId){
  (selectedId == "selectLoadMap")? 
    document.getElementById("selectLoadTileset").checked = false 
  : document.getElementById("selectLoadMap").checked = false;
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
  console.log(map);
  if(editor.currentMap){// if currentMap is existed
    console.log("run");
    editor.clearWorkspace();
  }
  editor.grid= new Grid(map.mapWidth, map.mapHeight, map.tileWidth, map.tileHeight);
  editor.grid.showGrid();
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

    //if any errors in inputs, inform user
    if("" == document.getElementById("map-name").value){
        alert("Invalid input. Please enter a name for this map.");
        return;
    }

    var inputWrong = false;
    if(isNaN(document.getElementById("map-width").value) || "" == document.getElementById("map-width").value){
        inputWrong = true;
    } else if(isNaN(document.getElementById("map-height").value) || "" == document.getElementById("map-height").value){
        inputWrong = true;
    } else if(isNaN(document.getElementById("tile-width").value) || "" == document.getElementById("tile-width").value){
        inputWrong = true;
    } else if(isNaN(document.getElementById("tile-height").value) || "" == document.getElementById("tile-height").value){
        inputWrong = true;
    }

    if(inputWrong){
        alert("Invalid input. Please enter integer values for map width/height and tile width/height.");
        return;
    }

  var mapWidth = parseInt(document.getElementById("map-width").value);
  var mapHeight = parseInt(document.getElementById("map-height").value);
  var tileWidth = parseInt(document.getElementById("tile-width").value);
  var tileHeight = parseInt(document.getElementById("tile-height").value);
  var mapName = document.getElementById("map-name").value;

  var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  var newMap = new TiledMap(mapName, mapWidth, mapHeight, tileWidth, tileHeight);
  newMap.LayerList.set(0, newLayer);

  saveAll_Map(newMap, newMap.LayerList, mapName);
  
  // loadDataFromDB(newMap.id);

  loadMap(newMap);
  //remove inputs
  document.getElementById("map-name").value = "";
  document.getElementById("map-width").value = "";
  document.getElementById("map-height").value = "";
  document.getElementById("tile-width").value = "";
  document.getElementById("tile-height").value = "";
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
      //if any errors in inputs, inform user
      if("" == document.getElementById("TilesetName").value){
          alert("Invalid input. Please enter a name for this tileset.");
          return;
      }
      if(document.getElementById("myFile").files[0] == null){
          alert("Please select a file.");
          return;
      }

      var inputWrong = false;
      if(isNaN(document.getElementById("tileSet-height").value) || "" == document.getElementById("tileSet-height").value){
          inputWrong = true;
      } else if(isNaN(document.getElementById("tileSet-width").value) || "" == document.getElementById("tileSet-width").value){
          inputWrong = true;
      } else if(isNaN(document.getElementById("spacing").value) || "" == document.getElementById("spacing").value){
          inputWrong = true;
      }

      if(inputWrong){
          alert("Invalid input. Please enter integer values for tileset width/height and spacing.");
          return;
      }

    for(var i=0; i<editor.loadedTilesetList.length; i++){
      if(editor.loadedTilesetList[i].name == document.getElementById("TilesetName").value){
        alert("Already Exist, please rename the tileset!");
        return;
      }
    }

    var tilesetName = document.getElementById("TilesetName").value;
    tilesetH = Number(document.getElementById("tileSet-height").value);
    tilesetW = Number(document.getElementById("tileSet-width").value);
    spacing = Number(document.getElementById("spacing").value);
    createNewtab(tilesetName, tilesetH, tilesetW, spacing);
    var read = document.getElementById("myFile").files[0];
    readImageFile(read);
    document.getElementById("TilesetName").value = "";
    closeWindow(createTileSetWindow);
    document.getElementById("myFile").value = "";
    document.getElementById("tileSet-height").value = "";
    document.getElementById("tileSet-width").value = "";
    document.getElementById("spacing").value = "";
    }

  function createNewtab(name, tHeight, tWidth, spacing){
      var btn = document.createElement("BUTTON");
    btn.setAttribute('class', 'tab-header2');
    btn.innerHTML = name;
    document.getElementById("newTab").appendChild(btn);
  
    var workspace = document.createElement("div");
    workspace.setAttribute('class', 'tilesetContent');
    workspace.setAttribute('id', name);
    document.getElementById("tilesetWorkspace").appendChild(workspace);
    
    currentTileSetName = name;
    singlecanvas =currentTileSetName +single;

    createTilesetCanvas();
    // var read = document.getElementById("myFile").files[0];
    // readImageFile(read);
    }

  document.getElementById("newTab").addEventListener("click", function(e) {
    currentTileSetName = e.target.innerHTML;
    openTilesetTab(e.target, e.target.innerHTML); 
    editor.currentTileset = getTileset(currentTileSetName);
    getCanvas = document.getElementById(currentTileSetName+"1");
    tilesetH = editor.currentTileset.tileList[0].tileHeight;
    tilesetW = editor.currentTileset.tileList[0].tileWidth;
    spacing = editor.currentTileset.spacing;
    colT = Math.floor(editor.currentTileset.imgWidth/ (tilesetW+spacing));
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
     function createTilesetCanvas(){
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
     }

     function readImageFile(read){
      var oFReader = new FileReader();
      oFReader.readAsDataURL(read);
      // oFReader.readAsDataURL(document.getElementById("myFile").files[0]);
      
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
   var tilecount;

  function loadImage(e){
     colT = Math.floor(loadImg.width / (tilesetW+spacing));
     rowT = Math.floor(loadImg.height / (tilesetH+spacing));
     totalWidth = tilesetW * colT;
     totalHeight = tilesetH * rowT;
     tilecount = colT * rowT; 
     tilesetCanvas = document.getElementById(singlecanvas);
     tilesetCanvas2 = document.getElementById(singlecanvas+"2");
    // imgSource = document.getElementById(singlecanvas).toDataURL();    
    //  imgSource = loadImg.src;
     ctxT = tilesetCanvas.getContext('2d');
     ctxTbase = tilesetCanvas2.getContext('2d');
     tilesetCanvas.width = totalWidth;
     tilesetCanvas.height = totalHeight;
     tilesetCanvas2.width = loadImg.width;
     tilesetCanvas2.height = loadImg.height;
     tilesetCanvas.style.border = "1px solid black";
     createTileSet(currentTileSetName, loadImg, loadImg.width, loadImg.height, tilesetW, tilesetH, spacing, colT, tilecount);
     tileList = createSingleTiles(currentTileSetName, loadImg, tilesetW, tilesetH, spacing);
     ctxTbase.drawImage(loadImg, 0, 0, loadImg.width, loadImg.height, 0, 0, loadImg.width, loadImg.height);
     drawTile();
     openTilesetTab(e.target, currentTileSetName); 
    }

    function loadImageDB(target){
    colT = Math.floor(loadImg.width / (tilesetW+spacing));
     rowT = Math.floor(loadImg.height / (tilesetH+spacing));
     totalWidth = tilesetW * colT;
     totalHeight = tilesetH * rowT;
     tilecount = colT * rowT; 
     tilesetCanvas = document.getElementById(singlecanvas);
     tilesetCanvas2 = document.getElementById(singlecanvas+"2");
     ctxT = tilesetCanvas.getContext('2d');
     ctxTbase = tilesetCanvas2.getContext('2d');
     tilesetCanvas.width = totalWidth;
     tilesetCanvas.height = totalHeight;
     tilesetCanvas2.width = loadImg.width;
     tilesetCanvas2.height = loadImg.height;
     tilesetCanvas.style.border = "1px solid black";
     tileList = createSingleTiles(currentTileSetName, loadImg, tilesetW, tilesetH, spacing);
     ctxTbase.drawImage(loadImg, 0, 0, loadImg.width, loadImg.height, 0, 0, loadImg.width, loadImg.height);
     drawTile();
     openTilesetTab(target, currentTileSetName); 
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

  function openTilesetTab(target, tabName) {
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
    // evt.currentTarget.className += " active";
    target.className += " active";
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

async function saveAll_Tileset(newTileset){
  let jsonTileset = getTilesetJSON(newTileset);
  let jsonImage = await getImageJSON(newTileset);
  console.log(jsonImage);
  saveDataToDB(jsonTileset, "save_tileset");
  saveDataToDB(jsonImage, "save_image");
}

function saveAll_Map(newMap, newLayers, mapName){
  let jsonMap = getMapJSON(newMap, mapName);
  let jsonLayers = getLayerJSON(newLayers);

  let saveMapResult = saveDataToDB(jsonMap, "save_map");
  let saveLayerResult = saveDataToDB(jsonLayers["layers"], "save_layer");
  // let saveLayerPropResult = saveDataToDB(jsonLayers["layerProps"], "save_layerProp");

  if(newMap.csvGid.size != 0){
    let jsonTilsetInMap = getTilesetInMapJSON(newMap);
    console.log(jsonTilsetInMap);
    let saveTilesetInMapResult = saveDataToDB(jsonTilsetInMap, "save_tilesetInMap");
  }
  //$.when(saveMapResult, saveLayerResult, saveLayerPropResult).then(function(){
    // loadDataFromDB(newMap.id)
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
    if("" == saveAsName){
        alert("Invalid input. Please enter a name for this map.");
        return;
    }
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
  var inputName = document.getElementById('loadFileName').value;
  var selectMap = document.getElementById("selectLoadMap").checked;
  var selectTileset = document.getElementById("selectLoadTileset").checked;
  if(!nameValidator(inputName)){
    alert("Invalid input. Please enter a valid name.");
  } else if(selectMap == true){
    loadAll_Map();
  } else if(selectTileset == true){
    (canLoadTileset(inputName)) ? loadAll_Tileset() : alert('This tileset is already loaded!');
  } else{
    alert("Please select the type of file to load!");
  }
  document.getElementById('loadFileName').value ="";
}

function nameValidator(targetName, targetList){
  var invalidInputRex = /^(?=[\S])[^\\ \/ : * ? " < > | ]+$/;
  if(invalidInputRex.test(targetName)){ return true;}
  return false;
}

function canLoadTileset(inputName){
  var canLoad = true;
  var targetList = editor.loadedTilesetList;
  if(targetList){
    targetList.forEach(function(tileset){
      if (tileset.name == inputName) {
        console.log("same! return false");
        canLoad= false;}
    });
  }
  return canLoad;
 }

async function loadAll_Map_Helper(loadMapJSON) {
    loadDataFromDB(loadMapJSON, "load_map")
        .then(jsonData => {
            var loadedMap = parseMapJson(jsonData.map);

            parseLayerJson(jsonData.layers, loadedMap);

            loadMap(loadedMap);
            // parseTilesetInMapJson(jsonData.tilesetsInMap, loadedMap);
            // var tilesetNameIter = loadedMap.selectedTilesetList;
            // var username = editor.userName;
            // let chain = Promise.resolve();
            // for (let [tilesetName, firstgid] of tilesetNameIter) {
            //   console.log(0);
            //   chain = chain.then(()=> loadAll_Tileset_Helper( {"name" : tilesetName, "username" : username}));
            //   console.log(2);
            // }
            parseTilesetInMapJson(jsonData.tilesetsInMap, loadedMap)
            .then(()=> paintAllLayers(loadedMap.LayerList));
            // add and show layer canvases on the map
            // paint all layers on the map
        });
}

function paintAllLayers(loadedLayers){
  console.log(3);
  for (let [layerId, layer] of loadedLayers) {
    // paint a single layer
    layer.paintTiles();
  }
  updateGidAfterLoad();
}

function loadAll_Map(){
    var fileName = document.getElementById('loadFileName').value;
    var loadMapJSON = {"mapName" : fileName};
    loadAll_Map_Helper(loadMapJSON);
    closeWindow(loadWindow);
}

async function loadAll_Tileset_Helper(loadTilesetJSON) {
    var tilesetJson;
    await loadDataFromDB(loadTilesetJSON, "load_tileset")
        .then(jsonData => {
            tilesetJson = jsonData.tileset;
            return parseImageJson(jsonData.image);
        }).then(newImage => {
          var newTileset = parseTilesetJson(tilesetJson, newImage);
          var currentTS = editor.currentTileset;
          createNewtab(currentTS.name, currentTS.tileHeight, currentTS.tileWidth, currentTS.spacing);
          loadImg = new Image();
          loadImg.src = currentTS.image.src;
          tilesetH = currentTS.tileHeight;
          tilesetW = currentTS.tileWidth;
          spacing = currentTS.spacing;
          loadImageDB(loadImg);
    });
    return Promise.resolve('compelet');
}

var loadedImg;
function loadAll_Tileset(){
    var fileName = document.getElementById('loadFileName').value;
    var loadTilesetJSON = {"name" : fileName, "username" : editor.userName};
    loadAll_Tileset_Helper(loadTilesetJSON);
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
  var newLayer;
  if (layer.type === "TiledLayer"){ 
    newLayer = new TiledLayer(layer.id, layer.name, map.mapWidth, map.mapHeight, map.id, map.tileWidth, map.tileHeight);
  } else {
    newLayer = new ObjectLayer(layer.id, layer.name, map.mapWidth, map.mapHeight);
  }
    newLayer.csv = convertCSVToArray(layer.csv, Array(map.mapWidth), map.mapHeight);
    newLayer.order = layer.orderInMap;
    layerList.set(layerList.size, newLayer);
  });
  map.LayerList = layerList;
}

function parseImageJson(imageData, mime = "image/png", imgWidth, imgHeight){
  return new Promise((resolve, reject)=> {
    URL.createObjectURL(new Blob([imageData] , {type:mime}));
    var newImage = new Image(imgWidth, imgHeight);
    newImage.onload = function(){
      resolve(newImage);
    };
    newImage.src = 'data:'+ mime + ';base64,'+ imageData.image;
    // newImage.src = imageData.image;
  });
}

function parseTilesetJson(tileset, newImage){
  var newTileset = new SingleImageTileset(tileset.name, newImage, tileset.imagewidth, tileset.imageheight, 
    tileset.tilewidth, tileset.tileheight, tileset.spacing, tileset.columns, tileset.tilecount);
    editor.loadTileset(newTileset);
    return newTileset;
}

async function loadtilesetPromise(tilesetNameIter) {
  var username = editor.userName;
  // for (let [tilesetName, firstgid] of tilesetNameIter) {
    var tilesetNames = Array.from(tilesetNameIter.keys());
    console.log(0);
    var complete = await Promise.all(tilesetNames.map((tilesetName)=>loadAll_Tileset_Helper( {"name" : tilesetName, "username" : username})));
    console.log(2);
  // }
   return Promise.resolve();
}

async function parseTilesetInMapJson(tilesetsInMap, map){
    var username = editor.userName;
    loadTilesetInMap(tilesetsInMap, map.csvGid, map.selectedTilesetList);
    var tilesetNameIter = map.selectedTilesetList;
    // var username = editor.userName;
    var complete = await loadtilesetPromise(tilesetNameIter);
    return complete;
  // return map.selectedTilesetList;
}

 

function loadTilesetInMap(tilesetsInMap, gidList, tilesetList){
  tilesetsInMap.forEach(function(paintedtile){
    var tilesetName = paintedtile.tilesetName;
    var firstgid = paintedtile.firstgid;
    gidList.set(paintedtile.globalId, firstgid);
    if(!tilesetList.has(tilesetName)){
      tilesetList.set(tilesetName, firstgid);
    }
  });
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
  // let layerProps = [];

  LayerData.forEach(function(layer){
    layers.push({
      "id" : layer.id,
      "name" : layer.name,
      "mapName" : layer.mapName,
      "orderInMap" : layer.order,
      "type" : layer.type,
      "csv" : convertArrayToCSV(layer.csv)
    });
    
    // let layerPropData = layer.layerProp;
    // layerProps.push({
    //   "id" : layerPropData.id,
    //   "layerId" : layer.id,
    //   "visible" : layerPropData.visible,
    //   "locked" : layerPropData.locked,
    //   "opacity" : layerPropData.opacity,
    //   "verticalOffset" : layerPropData.verticalOffset,
    //   "horizontalOffset" : layerPropData.horizontalOffset,
    //   "mapName" : layer.mapName
    // });
  });

  return {"layers" : layers};
  // return {"layers" : layers, "layerProps" : layerProps};
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

function getTilesetInMapJSON(mapData){
  let tilesetsInMap = [];
  let gidList = mapData.csvGid;

  for (var [gid, fristgid] of gidList) {
    tilesetsInMap.push({
      "mapName" : mapData.id,
      "tilesetName" : getKey(fristgid),
      "username": editor.userName,
      "firstgid" : fristgid,
      "globalId" : gid
    });
  }
  console.log(tilesetsInMap);
  return tilesetsInMap;
}

function convertImageToBase64(image, mime){
  return new Promise ((resolve) => {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    resolve(canvas.toDataURL());
    // canvas.toBlob(function(blob){
    //   blobImage = blob;
    //   console.log(blob);
    // }, mime);
    // var dataURL = canvas.toDataURL(mime);
  });
}

function getImageJSON(tileset, mime = "image/png"){
  var imageJson = {
    // "id" : 0,
    "tilesetName" : tileset.name,
    "tilesetOwnedBy" : editor.userName
  };

  convertImageToBase64(tileset.image, mime).then(function(result){
    imageJson["image"] = result;
  }, function(error){
    alert("fail to encoding image data");
  });
  return imageJson;
}


function saveDataToDB(savingData, save_endpoint){
  console.log(JSON.stringify(savingData));
  console.log(savingData);
    return $.ajax({
      type : "POST",
      contentType: "application/json",
      url : "/fileController/" + save_endpoint,
      data : JSON.stringify(savingData),
      dataType : 'json',
      async: false,
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


function loadDataFromDB(requestJSON, load_endpoint){
  return new Promise((resolve, reject) => {
    $.ajax({
        type : "POST",
        url : "/fileController/" + load_endpoint,
      data : JSON.stringify(requestJSON),
      contentType: "application/json",
      dataType : 'json',
      processData: false, 
      
      error : function(error){
        alert("load error occurred");
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