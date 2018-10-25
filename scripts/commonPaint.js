class PaintFunction {
     // simply provide a basic structure to the programmers as reference only 
     constructor(){}  

    lineWeight(width){
        this.context.lineWidth = width;
        // this.contextDraft.lineWidth = width;
    }

    fillColor(color){        
        this.context.fillStyle = color;
        // this.contextDraft.fillStyle = color;
    }

    strokeColor(color){        
        this.context.strokeStyle = color;
        // this.contextDraft.strokeStyle = color;
    }

}

function clean() {
    context2.clearRect(0,0,cw,ch);
}
function cleanReal(){
    context.clearRect(0,0,cw,ch);
}
function render(data){
    if(data.length === 0){
        cleanReal();
        clean();
    }
    switch(data.type){
        case 'rect':
            context.beginPath();
            context.rect(data.center.x, data.center.y, data.end.x - data.center.x, data.end.y - data.center.y)
            context.stroke();
            context.fill();
            break;

        case 'ellipse':
            context.beginPath();
            context.ellipse(data.center.x, data.center.y, Math.abs(data.end.x - data.center.x) , Math.abs(data.end.y - data.center.y), 0 , 0 , 2*Math.PI)
            context.stroke();
            context.fill();
            break;

        case 'text':
            context.fillText(data.text ,data.center.x ,data.center.y);
            // context.font(`${data[4]}px Arial`)
            break;

        case 'curve':
            for(let i = 0 ; i < data.dot.length; i++){
                context.beginPath();        
                context.moveTo(data.dot[i][0][0], data.dot[i][0][1])
                context.quadraticCurveTo(data.dot[i][1][0], data.dot[i][1][1], data.dot[i][2][0], data.dot[i][2][1])
                context.stroke();
                context.fill();
            }
            break;

        case 'polygon':
            context.beginPath();        
            context.moveTo(data.dot[0][0], data.dot[0][1])        
            if (data.dot.length > 1) {
                for(let i = 1 ; i < data.dot.length; i++){
                    context.lineTo(data.dot[i][0], data.dot[i][1])
                }
            }
            context.closePath();
            context.stroke();
            context.fill();
            break;

        case 'brush':
            for(let i = 0 ; i < data.dot.length; i++){
                context.beginPath();  
                context.arc(data.dot[i][0], data.dot[i][1], data.width, 0, 2*Math.PI);
                context.stroke();
                context.fill();
            }
            break; 
        }
    }