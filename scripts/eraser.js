class Eraser extends PaintFunction {
    constructor(){
        super();
        this.context = context2;
        this.type = 'eraser'
        this.centerX;
        this.centerY;
        this.thick;
        this.dot = [];
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.dot.push([this.centerX, this.centerY])
        let bg = $('#canvasReal').css("background-color");
        this.context.fillStyle = this.style.fill = bg;
        this.draft();
    }
    drag(mouseX, mouseY){
        if(dragging){
            this.centerX = mouseX;
            this.centerY = mouseY;
            this.dot.push([this.centerX, this.centerY])
            this.context.moveTo(this.centerX, this.mouseY);
            this.draft();
        }
    }
    commit(){
        dragging = false;
        this.style.stroke = this.style.fill
        history.push({
            type: this.type,
            dot : this.dot,
            width : this.thick,
            style : this.style
        })
    }
    draft(){
        this.context.beginPath();
        this.context.arc(this.centerX,this.centerY,this.thick,0,2*Math.PI);
        // this.context.strokeStyle = 'transparent'
        // this.context.stroke();
        this.context.fill();
    }
}