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
}