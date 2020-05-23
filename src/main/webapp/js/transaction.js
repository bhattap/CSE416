class Transaction{
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
      }

    undo() {
        if (this.undoStack.length > 0) {
          const action = this.undoStack.pop();
          action.undo();
          this.redoStack.push(action);
          this.updateButtonState();
        }
    }
    
    redo() {
        if (this.redoStack.length > 0) {
            const action = this.redoStack.pop();
            action.redo();
            this.undoStack.push(action);
            this.updateButtonState();
        }
    }

    doAction(newAction){
        document.getElementById("undoButton").disabled = false;
        document.getElementById("redoButton").disabled = true;
        this.redoStack = [];
        this.undoStack.push(newAction);
    }

    updateButtonState(){
        if(this.redoStack.length == 0){
            document.getElementById("redoButton").disabled = true;
        } else{
            document.getElementById("redoButton").disabled = false;
        }
        if(this.undoStack.length == 0){
            document.getElementById("undoButton").disabled = true;
        } else{
            document.getElementById("undoButton").disabled = false;
        }
        
    }
}

class PaintAction {
    constructor (layer, x, y, csvGid) {
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.csvGid = csvGid;
    }
    undo() {
        var mapH = editor.currentMap.tileHeight;
        var mapW = editor.currentMap.tileWidth;
        this.layer.eraseTile(this.x, this.y, this.layer.canvasLayer.canvas, mapH, mapW, true);
    }
    redo() {
        this.layer.fillTiles(this.x, this.y, this.layer.canvasLayer.canvas, true, this.csvGid);
    }
}

class EraseAction {
    constructor (layer, x, y, csvGid) {
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.csvGid = csvGid;
    }
    undo(){
        this.layer.fillTiles(this.x, this.y, this.layer.canvasLayer.canvas, true, this.csvGid);
    }
    redo(){
        var mapH = editor.currentMap.tileHeight;
        var mapW = editor.currentMap.tileWidth;
        this.layer.eraseTile(this.x, this.y, this.layer.canvasLayer.canvas, mapH, mapW, true);
    }
}

class ResizeAction {
    constructor (x, y, oldX, oldY, csvs) {
        this.x = x;
        this.y = y;
        this.oldX =  oldX;
        this.oldY =  oldY;
        this.newCSV = csvs['newCSVs'];
        this.oldCSV = csvs['oldCSVs'];
    }
    undo() {
        setCSVForAllLayers(this.oldCSV);
        resizeMap_Helper(this.oldX, this.oldY, true);
    }
    redo() {
        setCSVForAllLayers(this.newCSV);
        resizeMap_Helper(this.x, this.y, true);
    }
}

function setCSVForAllLayers(csv){
    var layers = editor.currentMap.LayerList;
    for (let [layerId, layer] of layers) {
        layer.csv = csv[layerId];
    }
}