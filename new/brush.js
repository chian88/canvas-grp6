// let canvas = document.getElementById('c');
// let context = canvas.getContext('2d');
// let cw = canvas.width;
// let ch = canvas.height;

// function clean() {
//     context.clearRect(0,0,cw,ch);
// }
// let history = [];
// class mouseAction{
//     constructor(){
//         this.dragging = false;
//         this.context = context;
//         this.centerX;
//         this.centerY;
//         this.press();
//         this.drag();
//         this.outside();
//     }
//     press(){
//         $('#c').mousedown(e =>{
//             this.centerX = e.offsetX;
//             this.centerY = e.offsetY;
//             this.context.moveTo(this.centerX, this.centerY);
//             if (e.button == 2) {
//                 this.dragging = false;
//                 this.render()
//                 history.push(this)
//             }else{
//                 this.dragging = true;
//             }
//         })
//     }
//     drag(){
//         $('#c').mousemove(e =>{
//             if (this.dragging) {
//                 this.centerX = e.offsetX;
//                 this.centerY = e.offsetY;
//                 this.dot.push([this.centerX, this.centerY])
//                 this.context.beginPath();
//                 this.draw()
//                 this.context.stroke();
//                 this.context.fill();
//             }
//         })
        
//     }
//     outside(){
//         $('#c').mouseleave(e=>{
//             this.dragging = false;
//             // let mouseX = e.offsetX;
//             // let mouseY = e.offsetY;
//         })
//     }
// }

class Brush extends mouseAction{
    constructor(){
        super();
        this.type = 'brush'
        this.dot = [];
        this.width = 5;
    }
    draw(){
        this.context.arc(this.centerX,this.centerY,this.width,0,2*Math.PI);
    }
    render(){
        this.context.beginPath();        
        this.context.moveTo(this.dot[0][0], this.dot[0][1])        
        if (this.dot.length > 1) {
            for(let i = 1 ; i < this.dot.length; i++){
                this.context.arc(this.dot[i][0],this.dot[i][1],this.width,0,2*Math.PI);
            }
        }
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }
}