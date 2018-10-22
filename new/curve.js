let canvas = document.getElementById('c');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
let result = [];
function clean() {
    context.clearRect(0,0,cw,ch);
}
class mouseAction{
    constructor(){
        this.dragging = false;
        this.context = context;
        this.centerX;
        this.centerY;
        this.distX;
        this.distY;
        this.forging = false;
        this.press();
        this.drag();
        this.outside();
        this.release();
        this.keypressing();
    }
    press(){
        $('#c').mousedown(e =>{
            this.centerX = e.offsetX;
            this.centerY = e.offsetY;
            this.context.moveTo(this.centerX, this.mouseY);
            if (e.button == 2) {
                this.dragging = false;
                // this.display();
                result.push(this);
                result[0].display();
                // push object to result
            }else{
                this.dragging = true;
            }
        })
    }
    drag(){
        $('#c').mousemove(e =>{
            if (this.dragging) {
                this.twistPx = this.distX = e.offsetX;
                this.twistPy = this.distY = e.offsetY;
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
    release(){
        $('#c').mouseup(()=>{
            // this.render();
        })
    }
    display(){
        this.context.beginPath();
        this.context.moveTo(this.centerX, this.centerY)
        this.draw()
        this.context.stroke();
        this.context.fill();
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                this.dragging = false;
                this.forge();
                clean()
                this.display();
            }
        })
        $('body').keyup(e=>{
            if (e.which ==17 || e.keycode == 17) {
                this.forging = false;
                this.dragging = true;
            }
        })
    }
}

// class Line extends mouseAction{
//     constructor(){
//         super();
//         this.type = 'line';
//         this.dot = [];
//     }
//     draw(){
//         this.context.lineTo(this.distX, this.distY);
//         this.context.moveTo(this.distX, this.distY);
//     }
//     render(){
//         this.context.beginPath();        
//         this.context.moveTo(this.dot[0][0], this.dot[0][1])        
//         if (this.dot.length > 1) {
//             for(let i = 1 ; i < this.dot.length; i++){
//                 this.context.lineTo(this.dot[i][0], this.dot[i][1])
//             }
//         }
//         this.context.stroke();
//         this.context.fill();
//     }
// }
class Curve extends mouseAction{
    constructor(){
        super();
        this.type = 'cruve';
        this.twistPx;
        this.twistPy;
    }
    draw(){
        this.context.quadraticCurveTo(this.twistPx, this.twistPy, this.distX, this.distY)
    }
    forge(){
        if (this.forging) {
            $('#c').mousemove(e=>{
                this.twistPx = e.offsetX;
                this.twistPy = e.offsetY;
            })
        }
    }
}