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
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        if (dragging) {
            current.drag(mouseX, mouseY);
        }
        if(forging){
            current.forge(mouseX, mouseY);
        }
    }
})
$('#canvasDraft').mouseleave(() =>{
    dragging = false;
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