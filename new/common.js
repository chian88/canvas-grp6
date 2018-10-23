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
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
        this.forging = false;
        this.press();
        this.drag();
        this.outside();
    }
    press(){
        $('#c').mousedown(e =>{
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
                this.render();
                history.push(this);
                // push object to result
            }else{
                this.dragging = true;
            }
        })
    }
    drag(){
        $('#c').mousemove(e =>{
            if (this.dragging) {
                this.twistPx = this.endX = e.offsetX;
                this.twistPy = this.endY = e.offsetY;
                clean();
                this.display();
            }
        })
    }
    outside(){
        $('#c').mouseleave(() =>{
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
