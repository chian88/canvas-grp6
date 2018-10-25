class PaintFunction {
     // simply provide a basic structure to the programmers as reference only 
     constructor(){
         this.context = context2;
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
        this.context.lineWidth = this.style.width = width; 
        if (this.type == 'brush') {
            this.width = width;
        }
    }

    fillColor(color = 'red'){
        this.context.fillStyle =  this.style.fill = color;
    }

    strokeColor(color = 'black'){
        this.context.strokeStyle = this.style.stroke = color;
    }

    transparency(value = 1){ //change strokeStyle and fillStyle from 0.0 (fully transparent) to 1.0 (fully opaque) 
        this.context.globalAlpha = this.alpha = value;
    }
    fontSize(bold, italic, size){
        this.size = size;
        this.style.bold = this.bold= bold;
        this.style.italic =this.italic = italic;
        this.context.font = `${bold} ${italic} ${size}px Arial`
    }
}

function clean() {
    context2.clearRect(0,0,cw,ch);
}
function cleanReal(){
    context.clearRect(0,0,cw,ch);
}

function undo(){
    clean();
    cleanReal();
    if(history.length>0){
        redoList.push(history.pop());
        if(history.length>0){
            history.forEach(data => render(data));
        }
    }
}

function redo(){
    if(redoList.length >0){
        clean();
        cleanReal();
        history.push(redoList.pop());
        history.forEach(data => render(data));
    } 
}

function render(data){
    context.beginPath();
    if(data.length === 0){
        cleanReal();
        clean();
    }
    switch(data.type){
        case 'rect':
            context.rect(data.center.x, data.center.y, data.end.x - data.center.x, data.end.y - data.center.y)
            break;

        case 'ellipse':
            context.ellipse(data.center.x, data.center.y, Math.abs(data.end.x - data.center.x) , Math.abs(data.end.y - data.center.y), 0 , 0 , 2*Math.PI)
            break;

        case 'text':
            context.fillStyle = data.style.fill;
            context.strokeStyle = data.style.stroke;
            context.font = `${data.style.bold} ${data.style.italic} ${data.size}px Arial`
            context.fillText(data.text ,data.center.x ,data.center.y);
            break;

        case 'curve':
            for(let i = 0 ; i < data.dot.length; i++){ 
                context.moveTo(data.dot[i][0][0], data.dot[i][0][1])
                context.quadraticCurveTo(data.dot[i][1][0], data.dot[i][1][1], data.dot[i][2][0], data.dot[i][2][1])
            }
            break;

        case 'polygon':       
            context.moveTo(data.dot[0][0], data.dot[0][1])        
            if (data.dot.length > 1) {
                for(let i = 1 ; i < data.dot.length; i++){
                    context.lineTo(data.dot[i][0], data.dot[i][1])
                }
            }
            context.closePath();
            break;

        case 'brush':
            for(let i = 0 ; i < data.dot.length; i++){
                context.beginPath();  
                context.arc(data.dot[i][0], data.dot[i][1], data.width, 0, 2*Math.PI);
                context.fillStyle = data.style.fill;
                context.fill();
            }
            break; 

        case 'clear':
            break;
        }
        context.fillStyle = data.style.fill;
        context.strokeStyle = data.style.stroke;
        context.lineWidth = data.style.width;
        // context.fillStyle = data.fill;
        // context.strokeStyle = data.stroke;
        // context.lineWidth = data.width;
        context.stroke();
        context.fill();
    }

