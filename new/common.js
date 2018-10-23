let canvas = document.getElementById('canvasField');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;

function clean() {
    context.clearRect(0,0,cw,ch);
}
function render(input){
        let data = input[0]
        console.log(data);
        
        if(data[0] == 'rect'){
            context.rect(data[1], data[2], data[3] - data[1], data[4] - data[2])
        }else if(data[0] == 'ellipse'){
            context.ellipse(data[1], data[2], Math.abs(data[3] - data[1]) , Math.abs(data[4] - data[2]), 0 , 0 , 2*Math.PI)
        }else if(data[0] == 'text'){
            context.fillText(data[1] ,data[2] ,data[3]);
        }else if(data[0] == 'curve'){ 
            for(let i = 0 ; i < output; i++){
                context.beginPath();        
                context.moveTo(data[i][0][0], data[i][0][1])        
                context.quadraticCurveTo(data[i][1][0], data[i][1][1], data[i][2][0], data[i][2][1])
                context.stroke();
                context.fill();
            }
        }else if(data[0] == 'polygon'){
            context.beginPath();        
            context.moveTo(data[1][0][0], data[1][0][1])        
            if (data[1].length > 1) {
                for(let i = 1 ; i < data[1]; i++){
                    this.context.lineTo(data[1][i][0], data[1][i][1])
                }
            }
            this.context.closePath();
            this.context.stroke();
            this.context.fill();
        }
    }
class mouseAction{
    constructor(){
        this.dragging = false;
        this.context = context;
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
        this.forging = false;
        this.output = [];
        this.press();
        this.drag();
        this.outside();
    }
    press(){
        
        $('#canvasField').mousedown(e =>{
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
                if(this.type == 'polygon'){
                    this.dot.push([this.endX, this.endY])
                }
                // clean();
                console.log('finish');
                
                if(this.type == 'rect' || this.type == 'ellipse'){
                    this.output.push(this.type, this.centerX, this.centerY, this.endX, this.endY)
                }else if(this.type == 'text'){
                    this.output.push(this.type, this.text, this.centerX, this.centerY)
                }else if(this.type == 'curve' || this.type == 'polygon'){ 
                    this.output.push(this.type, this.dot)
                }
                history.push(this.output);
                history.map(data => render(data))
                // console.log(history);
                
                // push object to result
            }else{
                this.dragging = true;
            }
        })
    }
    drag(){
        $('#canvasField').mousemove(e =>{
            if (this.dragging) {
                this.twistPx = this.endX = e.offsetX;
                this.twistPy = this.endY = e.offsetY;
                clean();
                this.display();
            }
        })
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
