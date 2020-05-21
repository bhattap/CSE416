class Tileset{
	constructor(name, image, imgWidth, imgHeight, tileWidth, tileHeight){
	   this.name = name;
	   this.src = "src/main/webapp/tileset_src/" + name +".png";
	   this.image = image;
       this.imgWidth = imgWidth;
       this.imgHeight = imgHeight;
       this.tileWidth = tileWidth;
	   this.tileHeight = tileHeight;
   }
   setSrc(filePath){
	this.src = filePath;
   }
}

class Tile{
	constructor(id, startX, startY, tileWidth, tileHeight){
		this.id = id;
		this.startX = startX;
		this.startY = startY;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
	}
}

class SingleImageTileset extends Tileset{
	constructor(name, image, imgWidth, imgHeight, tileWidth, tileHeight, spacing, columns, tilecount){
		super(name, image, imgWidth, imgHeight, tileWidth, tileHeight);
		this.spacing = spacing;
		this.columns = columns;
		this.tilecount = columns*Math.floor(imgHeight / (tileHeight+spacing));
		this.tileList= new Array();
	}

	addTile(id, startX, startY, tw, th){
		var newTile;
		newTile = new Tile(id, startX, startY, tw, th);
		this.tileList.push(newTile);
	}
 }

function createSingleTiles(tileSetName, image, tileWidth, tileHeight, spacing){
  var tile;
  var xPos =0;
  var yPos =0;
  var limit;
  var tileList =[];
  var plus = tileWidth + spacing;
  var plusH = tileHeight +spacing;
  for(var i = 0;i < colT * rowT; i++){
		tile = {};
		tile.xPos = xPos; 
		tile.yPos = yPos;
		tile.tw = tileWidth;
		tile.th = tileHeight;
		editor.currentTileset.addTile(i, tile.xPos, tile.yPos, tile.tw, tile.th);
		tileList.push(tile);
		xPos += plus;
		limit = loadImg.width-tile.tw;

		if(totalWidth !=loadImg.width){
		  if(xPos >= limit){
			xPos = 0;
			yPos += plusH;
		  }
		}
		else{
		  if(xPos >= loadImg.width){
			xPos = 0;
			yPos += plusH;
		  }
		}
  }
;	return tileList;
  }

class CollectionTileset extends Tileset{
	constructor(name, tileWidth, tileHeight){
		super(id, name, mapWidth, mapHeight, tileWidth, tileHeight);
		this.name = name;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.columns = 0;
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
