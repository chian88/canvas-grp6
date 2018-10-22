let canvas = document.getElementById('c');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
context.fillStyle = 'transparent'
// ground function 
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
        this.keypressing();
    }
    press(){
        $('#c').mousedown(e =>{
            this.centerX = e.offsetX;
            this.centerY = e.offsetY;
            this.context.moveTo(this.centerX, this.centerY);
            if (e.button == 2) {
                this.dragging = false;
                // push object to result
            }else{
                this.dragging = true;
            }
        })
    }
    drag(){
        $('#c').mousemove(e =>{
            this.distX = e.offsetX;
            this.distY = e.offsetY;
            if (this.dragging) {
                clean()
                this.display();
            }
        })
    }
    outside(){
        $('#c').mouseleave(()=>{
            this.dragging = false;
        })
    }
    display(){
        this.context.beginPath();
        this.draw()
        this.context.stroke();
        this.context.fill();
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                this.dragging = false;
                this.forge()
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

// shape class
class Rectangle extends mouseAction{
    constructor(){
        super();
        this.type = "rect";
    }
    draw(){
        this.context.rect(this.centerX, this.centerY, this.distX - this.centerX, this.distY - this.centerY)
    }
    forge(){
        if (this.forging) {
            this.lengthX = this.centerX - this.distX;
            this.lengthY = this.centerY - this.distY;
            if(Math.abs(this.lengthX) < Math.abs(this.lengthY)){
                if(this.lengthY > 0 ){
                    this.distY = this.centerY - Math.abs(this.lengthX)
                }else{
                    this.distY = this.centerY + Math.abs(this.lengthX)
                }
            }else{
                if(this.lengthX > 0 ){
                    this.distX = this.centerX - Math.abs(this.lengthY)
                }else{
                    this.distX = this.centerX + Math.abs(this.lengthY)
                }
            }
        }
    }
}

// class Circle extends mouseAction{
//     constructor(){
//         super();
//         this.type = 'circle';
//         this.radius;
//     }
//     draw(){  
//         let xDiff = this.distX - this.centerX;
//         let yDiff = this.distY - this.centerY;
//         this.radius = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))
//         this.context.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
//     }
// }

class Ellipse extends mouseAction{
    constructor(){
        super();
        this.type = 'ellipse'
    }
    draw(){
        this.context.ellipse(this.centerX, this.centerY, Math.abs(this.distX - this.centerX) , Math.abs(this.distY - this.centerY), 0 , 0 , 2*Math.PI)
    }
    forge(){
        if (this.forging) {
            this.lengthX = this.centerX - this.distX;
            this.lengthY = this.centerY - this.distY;
            if(this.lengthX > this.lengthY ){
                this.distY = this.centerY + Math.abs(this.lengthX);
            }else{
                this.distX = this.centerX + Math.abs(this.lengthY);
            }
        }
    }
}
