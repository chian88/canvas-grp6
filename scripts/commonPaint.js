class PaintFunction {
     // simply provide a basic structure to the programmers as reference only 
     constructor(){}  

    lineWeight(width){
        this.context.lineWidth = width;
        // this.contextDraft.lineWidth = width;
    }

    fillColor(color){
        console.log('working');
        
        this.context.fillStyle = color;
        // this.contextDraft.fillStyle = color;
    }

    strokeColor(color){
        console.log('working');
        
        this.context.strokeStyle = color;
        // this.contextDraft.strokeStyle = color;
    }

    transparency(value){ //change strokeStyle and fillStyle from 0.0 (fully transparent) to 1.0 (fully opaque) 
        console.log('working');
        
         this.context.globalAlpha = value;
        //  this.contextDraft.globalAlpha = value;
    }
}