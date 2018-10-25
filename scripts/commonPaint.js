class PaintFunction {
     // simply provide a basic structure to the programmers as reference only 
     constructor(){
         this.context = context2;
         this.width;
         this.fillColor;
         this.strokeColor;
         this.alpha;
         this.size;
         this.style = {};
         this.fillColor();
         this.lineWeight();
         this.strokeColor();
         this.transparency();
         this.fontSize();
     }  

    lineWeight(width = 5){
        this.context.lineWidth = this.style.width = this.width = width;
    }

    fillColor(color = 'red'){
        this.context.fillStyle =  this.style.fill = this.fillColor = color;
    }

    strokeColor(color = 'black'){
        this.context.strokeStyle = this.style.stroke = this.strokeColor = color;
    }

    transparency(value = 1){ //change strokeStyle and fillStyle from 0.0 (fully transparent) to 1.0 (fully opaque) 
        this.context.globalAlpha = this.alpha = value;
    }
    fontSize(size = 16){
        this.size = size;
        this.context.font = `${size}px Arial`
    }
}