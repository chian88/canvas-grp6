let canvas = document.getElementById('canvasReal');
let context = canvas.getContext('2d');
let canDraft = document.getElementById('canvasDraft');
let context2 = canDraft.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
let history = [];
function clean() {
    context2.clearRect(0,0,cw,ch);
}
function cleanReal(){
    context.clearRect(0,0,cw,ch);
}
function render(data){
    if(data.length === 0){
        cleanReal();
        clean();
    }
    else if(data.type == 'rect'){
        context.beginPath();
        context.rect(data.center.x, data.center.y, data.end.x - data.center.x, data.end.y - data.center.y)
        context.stroke();
        context.fill();
    }else if(data.type == 'ellipse'){
        context.beginPath();
        context.ellipse(data.center.x, data.center.y, Math.abs(data.end.x - data.center.x) , Math.abs(data.end.y - data.center.y), 0 , 0 , 2*Math.PI)
        context.stroke();
        context.fill();
    }else if(data.type == 'text'){
        context.fillText(data.text ,data.center.x ,data.center.y);
        // context.font(`${data[4]}px Arial`)
    }else if(data.type == 'curve'){
        for(let i = 0 ; i < data.dot.length; i++){
            context.beginPath();        
            context.moveTo(data.dot[i][0][0], data.dot[i][0][1])
            context.quadraticCurveTo(data.dot[i][1][0], data.dot[i][1][1], data.dot[i][2][0], data.dot[i][2][1])
            context.stroke();
            context.fill();

        }
    }else if(data.type == 'polygon'){
        context.beginPath();        
        context.moveTo(data.dot[0][0], data.dot[0][1])        
        if (data.dot.length > 1) {
            for(let i = 1 ; i < data.dot.length; i++){
                context.lineTo(data.dot[i][0], data.dot[i][1])
            }
        }
        context.closePath();
        context.stroke();
        context.fill();
    }else if(data.type == 'brush'){
        for(let i = 0 ; i < data.dot.length; i++){
            context.beginPath();  
            context.arc(data.dot[i][0], data.dot[i][1], data.width, 0, 2*Math.PI);
            context.stroke();
            context.fill();
        }
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4aa9fea2da7d444a7cc7d4c1e36234687d6ca835
}
let dragging;
let forging;
$('#canvasDraft').mousedown(e =>{
    if(e.button == 0){
        console.log('type is : '+current.type);
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        dragging = true;
        current.press(mouseX, mouseY, e)
    }
    else if (e.button == 2) {
        console.log('finish');
        current.commit()
        history.map(data => render(data))
    }else{
        dragging = false;
    }
})
$('#canvasDraft').mousemove(e =>{
    if (current.type != 'text') {
<<<<<<< HEAD
=======

>>>>>>> 4aa9fea2da7d444a7cc7d4c1e36234687d6ca835
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        if (dragging) {
            current.drag(mouseX, mouseY);
        }
        if(forging){
            current.forge(mouseX, mouseY);
<<<<<<< HEAD
=======

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
>>>>>>> 6ae46bad8d405c560b0c15a09efe893bf28caf8f
=======
>>>>>>> 4aa9fea2da7d444a7cc7d4c1e36234687d6ca835
        }
    }
})
$('#canvasDraft').mouseleave(() =>{
    dragging = false;
})
$('#canvasDraft').mouseup(() =>{
    
})
$('body').keydown(e =>{
    if(e.which == 17 || e.keycode ==17 || e.which == 13 || e.keycoe ==13){
        forging = true;
        if (current.type == 'rect' || current.type == 'ellipse') {
            dragging = true;
        }else{
            dragging = false;
        }
        current.keyPress();
    }
})
$("body").keyup(e =>{
    if(e.which == 17 || e.keycode ==17 || e.which == 13 || e.keycoe ==13){
        forging = false;
        dragging = true;
        current.keyRelease();
    }
})