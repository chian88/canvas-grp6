let canvas = document.getElementById('canvasField');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
let history = [];
// history.map(data => render(data))
function clean() {
    context.clearRect(0,0,cw,ch);
}
function render(data){
        if(data[0] == 'rect'){
            context.beginPath();
            context.rect(data[1], data[2], data[3] - data[1], data[4] - data[2])
            context.stroke();
            context.fill();
        }else if(data[0] == 'ellipse'){
            context.beginPath();
            context.ellipse(data[1], data[2], Math.abs(data[3] - data[1]) , Math.abs(data[4] - data[2]), 0 , 0 , 2*Math.PI)
            context.stroke();
            context.fill();
        }else if(data[0] == 'text'){
            context.fillText(data[1] ,data[2] ,data[3]);
            context.font(`${data[4]}px Arial`)
        }else if(data[0] == 'curve'){
            let dot = data[1]
            for(let i = 0 ; i < dot.length; i++){
                context.beginPath();        
                context.moveTo(dot[i][0][0], dot[i][0][1])
                context.quadraticCurveTo(dot[i][1][0], dot[i][1][1], dot[i][2][0], dot[i][2][1])
                context.stroke();
                context.fill();
            }
        }else if(data[0] == 'polygon'){
            let dot = data[1]
            context.beginPath();        
            context.moveTo(dot[0][0], dot[0][1])        
            if (dot.length > 1) {
                for(let i = 1 ; i < dot.length; i++){
                    context.lineTo(dot[i][0], dot[i][1])
                }
            }
            context.closePath();
            context.stroke();
            context.fill();
        }
    }
    let dragging;
    let forging;
    $('#canvasField').mousedown(e =>{
        if(e.button == 0){
            console.log(current.type);
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            dragging = true;
            current.press(mouseX, mouseY, e)
            
        }
        else if (e.button == 2) {
            current.commit()
            history.map(data => render(data))
        }else{
            dragging = false;
        }
    })
    $('#canvasField').mousemove(e =>{
        if (current.type != 'text') {
            if (dragging) {
                let mouseX = e.offsetX;
                let mouseY = e.offsetY;
                current.drag(mouseX, mouseY);
            }
            if(forging){
                let mouseX = e.offsetX;
                let mouseY = e.offsetY;
                current.forge(mouseX, mouseY);
            }
        }
    })
    $('#canvasField').mouseleave(() =>{
        dragging = false;
    })
    $('body').keydown(e =>{
        if (current.type != 'text') {
            if(e.which == 17 || e.keycode ==17){
                forging = true;
                dragging = false;
                current.keyPress();
            }
        }
    })
    $("body").keyup(e =>{
        if (current.type != 'text') {
            forging = false;
            dragging = true;
            current.keyRelease();
        }
    })