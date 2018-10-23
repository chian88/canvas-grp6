// let canvas = document.getElementById('c');
// let context = canvas.getContext('2d');
// let cw = canvas.width;
// let ch = canvas.height;
// context.fillStyle = 'transparent'
// let history = [];
// // ground function 
// function clean() {
//     context.clearRect(0,0,cw,ch);
// }
// class mouseAction{
//     constructor(){
//         this.dragging = false;
//         this.context = context;
//         this.centerX;
//         this.centerY;
//         this.endX;
//         this.endY;
//         this.forging = false;
//         this.press();
//         this.drag();
//         this.outside();
//     }
//     press(){
//         $('#c').mousedown(e =>{
//             if(e.button == 0){
//                 this.centerX = e.offsetX;
//                 this.centerY = e.offsetY;
//                 this.context.moveTo(this.centerX, this.centerY);
//             }
//             if (e.button == 2) {
//                 this.dragging = false;
//                 this.render()
//                 history.push(this)
//                 // push object to result
//             }else{
//                 this.dragging = true;
//             }
//         })
//     }
//     drag(){
//         $('#c').mousemove(e =>{
//             if (this.dragging) {
//                 this.endX = e.offsetX;
//                 this.endY = e.offsetY;
//                 clean()
//                 this.display();
//             }
//         })
//     }
//     outside(){
//         $('#c').mouseleave(()=>{
//             this.dragging = false;
//         })
//     }
//     display(){
//         this.context.beginPath();
//         this.draw()
//         this.context.stroke();
//         this.context.fill();
//     }
// }

// shape class
class Rectangle extends mouseAction{
    constructor(){
        super();
        this.keypressing();
        this.type = "rect";
    }
    draw(){
        this.context.rect(this.centerX, this.centerY, this.endX - this.centerX, this.endY - this.centerY)
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                // this.dragging = false;
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
    forge(){
        if (this.forging) {
            this.lengthX = this.centerX - this.endX;
            this.lengthY = this.centerY - this.endY;
            if(Math.abs(this.lengthX) < Math.abs(this.lengthY)){
                if(this.lengthY > 0 ){
                    this.endY = this.centerY - Math.abs(this.lengthX)
                }else{
                    this.endY = this.centerY + Math.abs(this.lengthX)
                }
            }else{
                if(this.lengthX > 0 ){
                    this.endX = this.centerX - Math.abs(this.lengthY)
                }else{
                    this.endX = this.centerX + Math.abs(this.lengthY)
                }
            }
        }
    }
    render(){
        this.display();
    }
}

class Ellipse extends mouseAction{
    constructor(){
        super();
        this.keypressing();
        this.type = 'ellipse'
    }
    draw(){
        this.context.ellipse(this.centerX, this.centerY, Math.abs(this.endX - this.centerX) , Math.abs(this.endY - this.centerY), 0 , 0 , 2*Math.PI)
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                // this.dragging = false;
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
    forge(){
        if (this.forging) {
            this.lengthX = this.centerX - this.endX;
            this.lengthY = this.centerY - this.endY;
            if(this.lengthX > this.lengthY ){
                this.endY = this.centerY + Math.abs(this.lengthX);
            }else{
                this.endX = this.centerX + Math.abs(this.lengthY);
            }
        }
    }
    render(){
        this.display();
    }
}
