class Brush extends PaintFunction {
    constructor(color){
        super();
        this.bg = color;
        this.context = context2;
        this.type = 'brush'
        this.centerX;
        this.centerY;
        this.dot = [];
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.dot.push([this.centerX, this.centerY])
        this.context.fillStyle = this.bg;
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
        let cloneStyle = Object.assign({},this.style);
        history.push({
            type: this.type,
            dot : this.dot,
            width : this.width,
            style : cloneStyle
        })
    }
    draft(){
        this.context.beginPath();
        this.context.arc(this.centerX,this.centerY,this.width,0,2*Math.PI);
        // this.context.strokeStyle = 'transparent'
        // this.context.stroke();
        this.context.fill();
    }
}