let canvas = document.getElementById('canvasReal');
let context = canvas.getContext('2d');
let canDraft = document.getElementById('canvasDraft');
let context2 = canDraft.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
let history = [];
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