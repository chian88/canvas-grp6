// let canvas = document.getElementById('c');
// let context = canvas.getContext('2d');
// let cw = canvas.width;
// let ch = canvas.height;
// let history = [];
// context.fillStyle = 'transparent'
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
//         this.press();
//         this.drag();
//         this.outside();
//     }
//     press(){
//         $('#c').mousedown(e =>{
//             if(e.button == 0){
//                 this.centerX = e.offsetX;
//                 this.centerY = e.offsetY;
//                 this.dot.push([this.centerX, this.centerY])
//                 this.context.moveTo(this.centerX, this.mouseY);
//             }
//             if (e.button == 2) {
//                 this.dragging = false;
//                 this.dot.push([this.endX,this.endY])
//                 this.render();
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
//                 clean();
//                 this.display();
//             }
//         })
//     }
//     outside(){
//         $('#c').mouseleave(() =>{
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

class Polygon extends mouseAction{
    constructor(){
        super();
        this.type = 'polygon';
        this.dot = [];
    }
    draw(){
        this.context.moveTo(this.centerX, this.centerY)
        this.context.lineTo(this.endX, this.endY);
        this.context.moveTo(this.endX, this.endY);
    }
    // render(){
    //     this.context.beginPath();        
    //     this.context.moveTo(this.dot[0][0], this.dot[0][1])        
    //     if (this.dot.length > 1) {
    //         for(let i = 1 ; i < this.dot.length; i++){
    //             this.context.lineTo(this.dot[i][0], this.dot[i][1])
    //         }
    //     }
    //     this.context.closePath();
    //     this.context.stroke();
    //     this.context.fill();
    // }
}