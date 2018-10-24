let canvas = document.getElementById('canvasField');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
let history = [];
function clean() {
    context.clearRect(0,0,cw,ch);
}
function render(data){
        if(data[0] == 'rect'){
            context.beginPath();
            context.rect(data[1], data[2], data[3] - data[1], data[4] - data[2])
            context.stroke();
            context.fill();
        }else if(data[0] == 'ellipse'){
            context.beginPath();
            context.ellipse(data[1], data[2], Math.abs(data[3] - data[1]) , Math.abs(data[4] - data[2]), 0 , 0 , 2*Math.PI)
            context.stroke();
            context.fill();
        }else if(data[0] == 'text'){
            context.fillText(data[1] ,data[2] ,data[3]);
        }else if(data[0] == 'curve'){
            let dot = data[1]
            for(let i = 0 ; i < dot.length; i++){
                context.beginPath();        
                context.moveTo(dot[i][0][0], dot[i][0][1])        
                context.quadraticCurveTo(dot[i][1][0], dot[i][1][1], dot[i][2][0], dot[i][2][1])
                context.stroke();
                context.fill();
            }
        }else if(data[0] == 'polygon'){
            let dot = data[1]
            context.beginPath();        
            context.moveTo(dot[0][0], dot[0][1])        
            if (dot.length > 1) {
                for(let i = 1 ; i < dot.length; i++){
                    context.lineTo(dot[i][0], dot[i][1])
                }
            }
            context.closePath();
            context.stroke();
            context.fill();
        }
    }

 $('#canvasField').mousedown(e =>{
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    current.onMouseDown([mouseX, mouseY], e);
});

 $('#canvasField').mousemove(e =>{
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    current.onMouseMove([mouseX, mouseY], e)

})


class mouseAction{
    constructor(){
        this.dragging = false;
        this.context = context;
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
        this.forging = false;
        this.outside();
    }
    onMouseDown(coordinate, e){

        if(e.button == 0){
            this.centerX = e.offsetX;
            this.centerY = e.offsetY;
            if (this.type == 'polygon') {
                this.dot.push([this.centerX, this.centerY])
            }
            this.context.moveTo(this.centerX, this.mouseY);
        }
        if (e.button == 2) {
            this.dragging = false;
            if(this.type == 'polygon' || this.type == 'curve'){
                this.dot.push([this.endX, this.endY])
            }
            // clean();
            console.log('finish');
            
            if(this.type == 'rect' || this.type == 'ellipse'){
                debugger;
                history.push([this.type, this.centerX, this.centerY, this.endX, this.endY])
            }else if(this.type == 'text'){
                debugger;
                history.push([this.type, this.text, this.centerX, this.centerY])
            }else if(this.type == 'curve' || this.type == 'polygon'){ 
                debugger;
                history.push([this.type, this.dot])
            }
            history.map(data => render(data))
            // push object to result
            this.dot =[];
        }else{
            this.dragging = true;
        }       
           
    }
    onMouseMove(coordinate, e){
        if (this.dragging) {
            this.twistPx = this.endX = e.offsetX;
            this.twistPy = this.endY = e.offsetY;
            clean();
            this.display();
        }
    }
    outside(){
        $('#canvasField').mouseleave(() =>{
            this.dragging = false;
        })
    }
    display(){
        this.context.beginPath();
        this.draw()
        this.context.stroke();
        this.context.fill();
    }
}
