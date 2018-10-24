class Brush{
    constructor(){
        this.context = context;
        this.type = 'brush'
        this.centerX;
        this.centerY;
        this.dot = [];
        this.width = 5;
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.dot.push([this.centerX, this.centerY])
        this.draft();
    }
    drag(mouseX, mouseY){
        if(dragging){
            history.map(data=>render(data))
            this.centerX = mouseX;
            this.centerY = mouseY;
            this.dot.push([this.centerX, this.centerY])
            this.context.moveTo(this.centerX, this.mouseY);
            this.draft();
        }
    }
    commit(){
        dragging = false;
        history.push([this.type, this.dot, this.width])
    }
    draft(){
        this.context.beginPath();
        this.context.arc(this.centerX,this.centerY,this.width,0,2*Math.PI);
        this.context.stroke();
        this.context.fill();
    }
}