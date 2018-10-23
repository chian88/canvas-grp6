let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let filter;
let dragging = false;
let doneList = []
let redoList = []


$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY],e);
})
  

$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

function undo(){
    contextReal.clearRect(0,0,canvasReal.width,canvasReal.height);
    if (doneList.length > 0){
        redoList.push(doneList.pop());
        if(doneList.length > 0){
            contextReal.putImageData(doneList[doneList.length-1],0,0); 
        }
    }
}



function redo(){
    if (redoList.length > 0){
        contextReal.clearRect(0,0,canvasReal.width,canvasReal.height);
        contextReal.putImageData(redoList[redoList.length-1],0,0);
        doneList.push(redoList.pop());
    }  
}

function complete(){
    doneList.push(contextReal.getImageData(0,0,canvasReal.width,canvasReal.height));  // undo code (add in command which complete the drawing)
    redoList = []; //redo code (add in command which complete the drawing);
}

class MoveImage {
    constructor(contextReal,contextDraft){
            this.contextReal = contextReal;
            this.contextDraft = contextDraft;
    } 
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        this.image = this.contextReal.getImageData(0,0,canvasReal.width,canvasReal.height);
    }

    onDragging(coord,event){
        this.contextReal.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.putImageData(this.image,coord[0]-this.origX,coord[1]-this.origY)
    }
    onMouseMove(){}
    onMouseUp(coord,event){
        if(!(coord[0]==this.origX && coord[1] == this.origY)){
            complete();
        }
    }
    onMouseLeave(coord,event){
            complete();
    }
    onMouseEnter(){}
}



class PaintFunction {
     // simply provide a basic structure to the programmers as reference only 
     constructor(){}  

    lineWeight(width){
        this.contextReal.lineWidth = width;
        this.contextDraft.lineWidth = width;
    }

    fillColor(color){
        this.contextReal.fillStyle = color;
        this.contextDraft.fillStyle = color;
    }

    strokeColor(color){
        this.contextReal.strokeStyle = color;
        this.contextDraft.strokeStyle = color;
    }

    transparency(value){ //change strokeStyle and fillStyle from 0.0 (fully transparent) to 1.0 (fully opaque) 
         this.contextReal.globalAlpha = value;
         this.contextDraft.globalAlpha = value;
    }



 
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}  




