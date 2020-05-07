class Tileset{
   constructor(id, name, mapWidth, mapHeight, tileWidth, tileHeight){
	   this.id = id;
	   this.name = name;
       this.mapWidth = mapWidth;
       this.mapHeight = mapHeight;
       this.tileWidth = tileWidth;
	   this.tileHeight = tileHeight;
   }
}

class Tile{
	constructor(source, tileWidth, tileHeight){
		this.source = source;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
	}
}

class CollectionTileset extends Tileset{
	construtor(name, tileWidth, tileHeight){
		super(id, name, mapWidth, mapHeight, tileWidth, tileHeight);
		this.name = name;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.columns =0;
		this.tileList= new Array(tile);
	}

	updateTileSize(Theight, Twidth){
		var maxWidth = this.tileWidth;   
		var maxHeight = this.tileHeight;  
		 
		if(Twidth > maxWidth || Theight > maxHeight){
		   if(Twidth > maxWidth){
			  maxWidth = Twidth;
		   }
		   if(Theight > maxHeight){
			  maxHeight = Theight;
		   }
		}
			this.tileWidth = maxWidth;
			this.tileHeight = maxHeight;
			console.log("update "+ this.tileHeight + this.tileWidth);
	}

	addCollectionTile(src, imgW, imgH){
		var tile;
		tile = new Tile(src, imgW, imgH);
		this.tileList.push(tile);
	}

	removeCollectionTile(){
		// this.tileList.push(newLayer);
	}
}

function createCollectionTileSet(){
  var collectionName = document.getElementById("TilesetName").value;
  //var newLayer = new TiledLayer(0, "Layer1", mapWidth, mapHeight, mapName, tileWidth, tileHeight);
  closeWindow(createTileSetWindow);
}

class SingleImageTileset extends Tileset{
	construtor(image, margin, spacing, columns){
		super(id, name, mapWidth, mapHeight, tileWidth, tileHeight);
	    this.image = image;
		this.margin = margin;
		this.spacing = spacing;
		this.columns = columns;
		this.tiles = createSingleTiles(image, tileWidth, tileHeight, margin, spacing);
	}
}


// function createSingleTiles(image, tileWidth, tileHeight, margin, spacing){
// 	var i;
// 	var tile;
// 	var xPos =0;
// 	var yPos =0;
// 	var tiles =[];
// 	var col = Math.floor(loadImg.width / (tileWidth+spacing));
// 	var row = Math.floor(loadImg.height / (tileHeight+spacing));
// 	console.log("colrow "+ col + row);
	
// 	for(i = 0;i < col * row ;i++){
//         tile = {};
//         tile.tw = tileWidth;
//         tile.th = tileHeight;
//         tiles.push(tile);
//         xPos += tileWidth+spacing;
//         if(xPos >= loadImg.width){
//             xPos = 0;
//             yPos += tileHeight+spacing;
//         }
//     }

// 	return tiles;
// 	}

	// function showTileset(){
	 
	// }


	//   document.getElementById("myUL").addEventListener("click", function(e) {
	// 	if (e.target && e.target.matches("li.layerlist")) {
	// 	  e.target.className = "foo"; // new class name here
	// 	  //alert("clicked " + e.target.innerText);
	// 	  selectedLayerName = e.target.innerText;
	// 	  console.log("clicked  "+e.target.innerText);
	// 	}
	//   });