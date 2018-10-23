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
//                 this.context.moveTo(this.centerX, this.mouseY);
//             }
//             if (e.button == 2) {
//                 this.dragging = false;
//                 // clean();
//                 this.render();
//                 history.push(this);
//                 // push object to result
//             }else{
//                 this.dragging = true;
//             }
//         })
//     }
//     drag(){
//         $('#c').mousemove(e =>{
//             if (this.dragging) {
//                 this.twistPx = this.endX = e.offsetX;
//                 this.twistPy = this.endY = e.offsetY;
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

class Curve extends mouseAction{
    constructor(){
        super();
        this.type = 'curve';
        this.twistPx;
        this.twistPy;
        this.dot = [];
        this.keypressing();
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
                this.dot.push([
                    [this.centerX, this.centerY],
                    [this.twistPx, this.twistPy],
                    [this.endX, this.endY]
                ])
                this.centerX = this.endX;
                this.centerY = this.endY;
                this.context.moveTo(this.centerX, this.centerY);
                this.dragging = true;
            }
        })
    }
    forge(){
        $('#canvasField').mousemove(e=>{
            if (this.forging) {
                this.twistPx = e.offsetX;
                this.twistPy = e.offsetY;
            }
        })
    }
    draw(){
        this.context.moveTo(this.centerX, this.centerY)
        this.context.quadraticCurveTo(this.twistPx, this.twistPy, this.endX, this.endY)
    }
    // render(){
    //     if (this.output[1] > 0) {
    //         console.log(this.output);
            
    //         for(let i = 0 ; i < this.output[1]; i++){
    //             this.context.beginPath();        
    //             this.context.moveTo(this.output[1][i][0][0], this.output[1][i][0][1])        
    //             this.context.quadraticCurveTo(this.output[1][i][1][0], this.output[1][i][1][1], this.output[1][i][2][0], this.output[1][i][2][1])
    //             this.context.stroke();
    //             this.context.fill();
    //         }
    //     }
    // }
}