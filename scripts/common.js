let canvas = document.getElementById('canvasReal');
let context = canvas.getContext('2d');
let canDraft = document.getElementById('canvasDraft');
let context2 = canDraft.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;

// real canvas
let history = [];

// clean 
function clean() {
    context2.clearRect(0,0,cw,ch);
}
function cleanReal(){
    context.clearRect(0,0,cw,ch);
}

// render on real canvas
function render(data){
    context.beginPath();
    if(data.length === 0){
        cleanReal();
        clean();
    }
    switch (data.type) {
        case 'rect':
            context.rect(data.center.x, data.center.y, data.end.x - data.center.x, data.end.y - data.center.y)
            break;

        case 'ellipse':
            context.ellipse(data.center.x, data.center.y, Math.abs(data.end.x - data.center.x) , Math.abs(data.end.y - data.center.y), 0 , 0 , 2*Math.PI)
            break;
        
        case 'text':
            context.fillStyle = data.style.fill;
            context.strokeStyle = data.style.stroke;
            context.font = `${data.size}px Arial`
            context.fillText(data.text ,data.center.x ,data.center.y);
            break;

        case 'curve':
            for(let i = 0 ; i < data.dot.length; i++){  
                context.moveTo(data.dot[i][0][0], data.dot[i][0][1])
                context.quadraticCurveTo(data.dot[i][1][0], data.dot[i][1][1], data.dot[i][2][0], data.dot[i][2][1])
            }
            break;

        case 'polygon':
            context.moveTo(data.dot[0][0], data.dot[0][1])        
            if (data.dot.length > 1) {
                for(let i = 1 ; i < data.dot.length; i++){
                    context.lineTo(data.dot[i][0], data.dot[i][1])
                }
            }
            context.closePath();
            break;

        case 'brush':
            for(let i = 0 ; i < data.dot.length; i++){
                context.beginPath();
                context.arc(data.dot[i][0], data.dot[i][1], data.width, 0, 2*Math.PI);
                context.fillStyle = data.style.fill;
                // context.strokeStyle = 'transparent';
                context.lineWidth = data.style.width;
                // context.stroke();
                context.fill();
            }
            break;
    }
    context.fillStyle = data.style.fill;
    context.strokeStyle = data.style.stroke;
    context.lineWidth = data.style.width;
    context.stroke();
    context.fill();
}

//modifier selector
function modifier(mX, mY){
    history.map(data =>{
        render(data)
        if (context.isPointInPath(mX, mY)) {
            let a = history.indexOf(data)
            console.log(history[a]);
        }
    })
}


// MouseAction
let dragging;
let forging;
$('#canvasDraft').mousedown(e =>{
    if(e.button == 0){
        console.log('type is : '+current.type);
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        current.press(mouseX, mouseY, e)
        //new
        if (current.type == 'curve') {
            dragging = false;
            forging = true;
        }//
        dragging = true;
    }
    else if (e.button == 2) {
        console.log('finish');
        current.commit();
        history.map(data => render(data))
    }else{
        dragging = false;
    }
})
$('#canvasDraft').mouseup(()=>{
    //new
        if (current.type == 'curve') {
            dragging = true;
            forging = false;
        }//
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
    // modifier(e.offsetX, e.offsetY)
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
    }else if(e.which == 27 || e.keycode == 27){
        clean();
    }
})
$("body").keyup(e =>{
    if(e.which == 17 || e.keycode ==17 || e.which == 13 || e.keycoe ==13){
        forging = false;
        dragging = true;
        current.keyRelease();
        history.map(data => render(data))
    }
})