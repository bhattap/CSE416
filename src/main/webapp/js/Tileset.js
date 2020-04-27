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
	updateTileSize(image){
		//this.tileWidth = largest;
		//this.tileHeight = largest;
	// update tileWidth, tileHeight
	}
	addSingleTile(src, imgW, imgH){
		var tile;
		tile = new Tile(src, imgW, imgH);
		this.tileList.push(tile);
	}
	removeSingleTile(){
		// this.tileList.push(newLayer);
	}
}

class SingleImageTileset extends Tileset{
	construtor(image, margin, spacing, columns){
		super(id, name, mapWidth, mapHeight, tileWidth, tileHeight);
	    this.image = image;
		this.margin = margin;
		this.spacing = spacing;
		this.columns = columns;
		this.tiles = createSingleTiles(image, tileWidth, tileHeight);
	}
}

function createSingleTiles(image, tileWidth, tileHeight){
	// image size
	//
	return new Array();
	}
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