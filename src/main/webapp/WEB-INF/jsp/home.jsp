<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>spring
<!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->
<link href="css/workSpace.css" rel="stylesheet">
<link href="css/canvas.css" rel="stylesheet">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="js/bootstrap.min.js" rel="text/javascript">
<!-- <link href="js/Map.js" rel="text/javascript"> -->

<script src="https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<!------ Include the above in your HEAD tag ---------->

<html lang='en' class=''>

<head>
<meta charset="EUC-KR">
<title>LevelBuilder map editor</title>
</head>

<body>
  <script src="https://kit.fontawesome.com/48f90dece2.js" crossorigin="anonymous"></script>
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" /> -->
  <div class="whole_workspace">
    <section id="side-bar">
      <a href="/my-profile" id="toggle-home">
        <button id="homeButton"><i class="fa fa-home" tooltip = "toggle-home" flow = "right"></i></button>
      </a>
      <div class ="vertical-align">
        <ul id="tool-menu">
          <li data ="view" id="tool-view">
            <button id="gridVisability"><i class="fa fa-eye" aria-hidden="true"></i></button>
            <!-- <span class="tooltiptext">Control view</span> -->
          </li>
          <!-- <li data ="history" id="tool-history">
            <img src="img/tool/history.png">
          </li> -->
        </ul>
      </div>
    </section>
    <section class="side-helper">

    </section>
    <section class="app">
      <div class="menu" style="z-index : 1000;">
          <div class="dropdown">
              <button class="dropbtn">File</button>
              <div class="dropdown-content">
                <a href="#" onclick="newMap()">New Map</a>
                <a href="#" onclick="newTileSet()">New TileSet</a>
                <a href="#">Share Map</a>
                <a href="#" onclick="createload()">Load</a>
                <a href="#" onclick="save()">Save</a>
                <a href="#" onclick="openSaveAs()">Save As </a>
                <a href="#" onclick ="exportMap()">Export Map</a>
                <a href="#" onclick ="openExportAsMap()">Export As Map</a>
                <a href="#" onclick ="openExportAsTileset()">Export As Tileset</a>
                <a href="#">Export As Image</a>
                <a href="#">Delete</a>
                <a href="#">Recent Files</a>
                <a href="#">Close All</a>
              </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn">Edit</button>
                <div class="dropdown-content">
                  <a href="#">Undo</a>
                  <a href="#">Redo</a>
                  <a href="#">Cut</a>
                  <a href="#">Copy</a>
                  <a href="#">Paste</a>
                  <a href="#">Select All</a>
                  <a href="#">Delete</a>
                </div>
              </div>
              <div class="dropdown">
                  <button class="dropbtn">Layers</button>
                  <div class="dropdown-content">
                    <a href="#" onclick="newLayer()">New</a>
                    <!-- <a href="#" onclick="newLayerGroup()">Group</a> -->
                    <!-- <a href="#">Duplicate Layers</a> -->
                    <a href="#">Remove Layers</a>
                    <a href="#"onclick="moveLayerUp()">Raise Layers</a>
                    <a href="#"onclick="moveLayerDown()">Lower Layers</a>
                    <!-- <a href="#">Show/Hide Layers</a> -->
                    <!-- <a href="#">Lock/Unlock Layers</a> -->
                    <!-- <a href="#"onclick="showHideGird()">Show/Hide Grid</a> -->
                  </div>
                </div>
                <!-- <div class="dropdown">
                    <button class="dropbtn">TileSet</button>
                    <div class="dropdown-content">
                      <a href="#" id="fileSelect">Add Tile</a>
                      <input type="file" id="fileElem" multiple accept="image/*" style="display:none"onchange="loadTile()">
                      <a href="#" id="fileRemove" onclick="removeFile()">Remove Tile </a>
                    </div>
                  </div> -->
                  <div class="dropdown">
                      <button class="dropbtn">About</button>
                      <div class="dropdown-content">
                        <!-- <a href="#">User Manual</a> -->
                        <a href="#" onclick="aboutLB()">About Level Builder</a>
                      </div>
                  </div>
      </div>
      <div class="workspace">
        <div class="scene">
          <div class="tab-header">Map editor</div>
          <div class="surface tab">
            <div class="editor-container">
              <div class="editor-tools">
                <div class="surface btn" id="btn-editor-cursor"
                  title="Selector tool - select objects to edit their properties" onclick="selectEditorTool('cursor')">
                  <i class="fa fa-mouse-pointer"></i></div>
                <div class="surface btn" id="btn-editor-brush" title="Brush tool - paint tiles"
                  onclick="selectEditorTool('brush')"><i class="fa fa-paint-brush"></i></div>
                <div class="surface btn" id="eraser" title="Eraser tool - erase tile data"
                  onclick="EraseTile(this)"><i class="fa fa-eraser"></i></div>
                <div class="surface btn" id="btn-editor-move" value = "doNotMove"
                  title="Drag tool - pan around the map editor, you can also hold down (alt)"
                  onclick="moveGrid(this)"><i class="fa fa-arrows"></i></div>
                <div class="surface btn" id="btn-editor-zout" title="(-) Zoom out" onclick="zoomOut()"><i
                    class="fa fa-search-minus"></i></div>
                <div class="surface btn" id="btn-editor-zin" title="(+) Zoom in" onclick="zoomIn()"><i
                    class="fa fa-search-plus"></i></div>
              </div>
              <div class="surface editor-border" style =" overflow: scroll;">
                <div class = "Map">
                  <div class = "Grid"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="project">
          <!-- <div class="tab-header"> -->
                <button class="tab-header1" onclick="openTab(event, 'MapLayers')" id="defaultOpen">Map Layers</button>
                <button class="tab-header1" onclick="openTab(event, 'TileSets')">Tile Sets</button>

          <div id="MapLayers" class="tabcontent">
              <div class="project-tools">
                <!-- <div class="surface btn" id="btn-layer-group" title="Create a new group" onclick="createLayerGroup()" disabled="disabled"><i
                    class="fa fa-folder"></i></div> -->
                <div class="surface btn" id="btn-layer-add" title="Create a layer" onclick="newLayer()"><i
                    class="fa fa-file-o"> </i></div>
                <!-- <div class="surface btn req-layer" id="btn-layer-duplicate" title="Duplicate layer"
                  onclick="duplicateLayer()"><i class="fa fa-files-o"></i></div> -->
                <div class="surface btn req-layer" id="btn-layer-up" title="Move group or layer upwards"
                  onclick="moveLayerUp()"><i class="fa fa-arrow-up"></i></div>
                <div class="surface btn req-layer" id="btn-layer-down" title="Move group or layer downwards"
                  onclick="moveLayerDown()"><i class="fa fa-arrow-down"> </i></div>
                <div class="surface btn req-layer" id="btn-layer-remove" title="Remove group or layer"
                  onclick="removeLayer()"><i class="fa fa-trash-o"> </i></div>
              </div>
              <div class="project-item-list" id="style-4">
                <!-- <ul class="project-item-tree" id="myUL"> -->
                <ul id="myUL"></ul>
              </div>
          </div>

            <div id="TileSets" class="tileSetcontent">
              <!-- <div class="project-tools"> -->
                <div id="newTab"> </div>
              <!-- </div> -->
              <div class="project-item-list" id="tilesetWorkspace"> 
              </div>
                    
              </div>
          </div>
        </div>

    </section>
  </div>

  <div class="window-tint">       </div>
  <div class="window surface" id="create-map-window" style="z-index : 1000;">
      <div class="window-title-bar">
        <h4>New map</h4>
        <div class="surface btn" onclick="cancelCreateMap()"><i class="fa fa-close"></i></div>
      </div>
      <div class="window-body">
         <p>Oriententaion: orthogonal</p>
         <p>Tile layer format: CSV</p>
         <p>Tile render order: Right Down</p>

              <label for="fname">Name:</label>
              <input type="text" id="map-name" name="fname">
        <div class="newline"></div>
        <div class="input-header">Map size</div>
        <div class="input-row">
          <label for="map-width">Width :</label>
          <label><input type="text" placeholder="eg. 32" id="map-width"/>columns</label>

          <label for="map-height">Height:</label>
          <label><input type="text" placeholder="eg. 32" id="map-height"/>rows</label>
        </div>
        <div class="input-header">Tile size</div>
        <div class="input-row">
          <label for="tile-width">Width :</label>
          <label><input type="text" placeholder="eg. 32" id="tile-width"/> px</label>

          <label for="tile-height">Height:</label>
          <label><input type="text" placeholder="eg. 32" id="tile-height"/>px</label>
        </div>
      </div>
      <div class="window-actions">
        <div class="surface btn" onclick="cancelCreateMap()">Cancel</div>
        <div class="surface btn" onclick="createMap()">OK</div>
      </div>
    </div>

    <div class="window surface" id="create-tileset-window" style="z-index : 1000;">
        <div class="window-title-bar">
          <h4>New TileSet</h4>
          <div class="surface btn" onclick="cancelCreateTileSet()"><i class="fa fa-close"></i></div>
        </div>
        <div class="window-body">
            <div class="input-header">TileSet </div>
            <label for="fname">File name:</label>
            <input type="text" id="TilesetName" name="fname"><br><br> 
          <div class="input-header">Tileset Image</div>
          <!-- based On TileSet Img: <input type="checkbox" id="basedOnTileSetImg"  onclick="myCheck()">
          collection Of Img: <input type="checkbox" id="collectionOfImg"  onclick="myCheck()"> -->
          <!-- <div class="input-row" id="txt" style="display:none"> -->
              <div class="input-row" id="txt">
          <div class="newline"></div>
          <div class="input-header">Image </div> 
          <!-- <label for="fname">Source:</label>
          <input type="text" id="fname" name="fname"> -->
          <input type="file" id="myFile"  multiple accept="image/*"> 
          <div class="newline"></div>
          <div class="input-row">
            <label for="tileSet-width">Width :</label>
            <label><input type="text" placeholder="eg. 32" id="tileSet-width"/> px</label>
            <label for="tileSet-height">Height:</label>
            <label><input type="text" placeholder="eg. 32" id="tileSet-height"/> px</label>
            <label for="spacing">Spacing:</label>
            <label><input type="text" placeholder="eg. 32" id="spacing"/> px</label>
          </div>
          <div class="window-actions">
              <div class="surface btn" onclick="cancelCreateTileSet()">Cancel</div>
              <div class="surface btn" onclick="newTabBtn2()">OK</div>
          </div>
          </div>
        </div>
        <!-- <div class="window-actions" id="text" style="display:none">
          <div class="surface btn" onclick="cancelCreateTileSet()">Cancel</div>
          <div class="surface btn" onclick="newTabBtn()">OK</div>
           <div class="surface btn" onclick="openTileSet(event, 'collections')">OK</div> 
        </div> -->
      </div>

      <div class="window surface" id="saveas" style="z-index : 1000;">
          <div class="window-title-bar">
            <h4>Save As</h4>
            <div class="surface btn" onclick="cancelSaveAs()"><i class="fa fa-close"></i></div>
            <div class="newline"></div>
            <label for="saveAsName">File Name :</label>
              <input type="text" placeholder="name" id="saveAsName"/>
          </div>
          <div class="window-actions">
            <div class="surface btn" onclick="cancelSaveAs()">Cancel</div>
            <div class="surface btn" onclick="saveAsMap()">OK</div> 
          </div>
      </div>

      <div class="window surface" id="exportas_map" style="z-index : 1000;">
        <div class="window-title-bar">
          <h4>Export Map As</h4>
          <div class="surface btn" onclick="cancelExportAsMap()"><i class="fa fa-close"></i></div>
          <div class="newline"></div>
          <label for="exportAsName_map">File Name :</label>
            <input type="text" placeholder="name" id="exportAsName_map"/>
        </div>
        <div class="window-actions">
          <div class="surface btn" onclick="cancelExportAsMap()">Cancel</div>
          <div class="surface btn" onclick="exportAsMap()">OK</div> 
        </div>
    </div>

      <div class="window surface" id="exportas_tileset" style="z-index : 1000;">
        <div class="window-title-bar">
          <h4>Export Tileset As</h4>
          <div class="surface btn" onclick="cancelExportAsTileset()"><i class="fa fa-close"></i></div>
          <div class="newline"></div>
          <label for="exportAsName_tileset">File Name :</label>
            <input type="text" placeholder="name" id="exportAsName_tileset"/>
        </div>
        <div class="window-actions">
          <div class="surface btn" onclick="cancelExportAsTileset()">Cancel</div>
          <div class="surface btn" onclick="exportAsTileset()">OK</div> 
        </div>
    </div>

      <div class="window surface" id="loadFile" style="z-index : 1000;">
          <div class="window-title-bar">
            <h4>Load</h4>
            <div class="surface btn" onclick="cancelload()"><i class="fa fa-close"></i></div>
            <div class="newline"></div> 
            <label for="loadFileName">File Name :</label>
              <input type="text" placeholder="name" id="loadFileName"/>
              Load Map: <input type="checkbox" id="selectLoadMap" onclick = "selectLoadOption(this.id)">
              Load Tileset: <input type="checkbox" id="selectLoadTileset" onclick="selectLoadOption(this.id)">
          </div>
          <div class="window-actions">
            <div class="surface btn" onclick="cancelload()">Cancel</div>
            <div class="surface btn" onclick="loadFile()">OK</div> 
          </div>
      </div>

      <div class="window surface" id="about" style="z-index : 1000;">
          <div class="window-title-bar">
            <h4>About</h4>
            <p>The Level Builder is a tool for making a map. 
              It will provide the user with a set of tools to build graphic representations of maps which can be used in games. 
              There are many functions that enables users to easily create and edit maps. 
              Moreover, by logging in, users can easily handle the maps they made.b</p>
          </div>
          <div class="window-actions">
            <p>2020-04-22</p>
            <p>Puja, Jihye, Ji Won</p>
            <div class="surface btn" onclick="cancelAbout()">OK</div>
          </div>
      </div>

      <div class="window surface" id="create-layer-window" style="z-index : 1000;">
          <div class="window-title-bar">
            <h4>New Layer</h4>
            <div class="surface btn" onclick="cancelCreateLayer()"><i class="fa fa-close"></i></div>
          </div>
          <div class="window-body">
            <!-- <p>Warning: Creating a new layer will discard your current progress!</p> -->
            <div class="input-header">Select</div>
            <div class="input-row">
              <input type="radio" name="layerType" onclick="myFunction(this.value)" value="tileLayer" checked>tile layer<br>
            </div>
            <!-- <div class="input-row">
              <input type="radio" name="layerType" onclick="myFunction(this.value)" value="objectLayer">object layer<br>
            </div> -->
            <div class="input-row">
              <label for="input-layer">Layer Name :</label>
              <input type="text" placeholder="Layer 1" id="input-layer"/>
            </div>
          </div>
          <div class="window-actions">
            <div class="surface btn" onclick="cancelCreateLayer()">Cancel</div>
            <div class="surface btn" onclick="createLayer()">OK</div>
          </div>
        </div>
<script>
let editor;

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

   }
   //$("canvas").detach(); remove all canvas
   
   loadTileset(tileset){
      this.loadedTilesetList.push(tileset);
      this.currentTileset = tileset;
   }

   clearWorkspace(){
    $("canvas").detach();
    if(this.currentMap){
      this.currentMap = null;
      this.currentLayer = null;
      this.selectedLayerId = null;
      this.grid =  null;
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

window.onload = (event) => {
  editor = new Editor();
  editor.userName = '${username}';
  console.log("create editor class");

  //If parameters exist in the URL, handle request
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  if(urlParams.has('load_map')) {
      handleLoadMapRequest(urlParams.get('load_map'));
  } else if(urlParams.has('load_tileset') && urlParams.has('owned_by')) {
      handleLoadTilesetRequest(urlParams.get('load_tileset'), urlParams.get('owned_by'));
  } else if(urlParams.has('export_map')) {
      handleExportMapRequest(urlParams.get('export_map'));
  } else if(urlParams.has('export_tileset') && urlParams.has('owned_by')) {
      handleExportTilesetRequest(urlParams.get('export_tileset'), urlParams.get('owned_by'));
  }
};

</script>
<script type="text/javascript" src="js/Map.js"></script>
<script type="text/javascript" src="js/Tileset.js"></script>
<script type="text/javascript" src="js/tilemap.js"></script>
<script type="text/javascript" src="js/editor.js"></script>
<script type="text/javascript" src="js/export.js"></script>
<!-- <script type="text/javascript" src="js/npm.js"></script> -->
<script type="text/javascript" src="js/FileSaver.js"></script>
<script type="text/javascript" src="js/file.js"></script>

</body>
</html>