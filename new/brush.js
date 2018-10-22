let canvas = document.getElementById('c');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;

function clean() {
    context.clearRect(0,0,cw,ch);
}
class mouseAction{
    constructor(){
        this.dragging = false;
        this.context = context;
        this.Ox;
        this.Oy;
        this.press();
        this.drag();
        this.outside();
        this.release();
    }
    press(){
        $('#c').mousedown(e =>{
            let mouseX = this.Ox = e.offsetX;
            let mouseY = this.Oy = e.offsetY;
            this.context.moveTo(mouseX,mouseY);
            if (e.button == 2) {
                this.dragging = false;
            }else{
                this.dragging = true;
            }
        })
    }
    drag(){
        $('#c').mousemove(e =>{
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            if (this.dragging) {
                this.context.beginPath();
                this.draw(mouseX, mouseY)
                this.context.stroke();
                this.context.fill();
            }
        })
        
    }
    outside(){
        $('#c').mouseleave(e=>{
            this.dragging = false;
            // let mouseX = e.offsetX;
            // let mouseY = e.offsetY;
        })
    }
    release(){
        $('#c').mouseup(e=>{
            // this.dragging = true;
            // let mouseX = e.offsetX;
            // let mouseY = e.offsetY;
            // this.render();
        })
    }
    
}

class Brush extends mouseAction{
    constructor(){
        super();
        this.type = 'brush'
        this.dot = [];
    }
    draw(x,y){
        let w = 5;
        this.context.arc(x,y,w,0,2*Math.PI);
    }
}