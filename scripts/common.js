let canvas = document.getElementById('canvasReal');
let context = canvas.getContext('2d');
let canDraft = document.getElementById('canvasDraft');
let context2 = canDraft.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
context.lineJoin = context.lineCap = 'round';
context2.lineJoin = context2.lineCap = 'round';


// real canvas
let history = [];
let redoList = [];

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

let dragging;
let forging;
$('#canvasDraft').mousedown(e =>{
    if(e.button == 0){
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
        current.commit();
        history.map(data => render(data))
    }else{
        dragging = false;
    }
})
$('#canvasDraft').mouseup(()=>{
    if (current.type == 'curve') {
        dragging = true;
        forging = false;
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