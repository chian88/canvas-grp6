class Polygon extends PaintFunction {
    constructor(){
        super();
        this.type = 'polygon';
        this.dot = [];
        this.dragging = false;
        this.context = context2;
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.dot.push([this.centerX, this.centerY])
        this.context.moveTo(this.centerX, this.centerY);
    }
    commit(){
        dragging = false;
        this.dot.push([this.endX, this.endY])
        let cloneStyle = Object.assign({},this.style);
        history.push({type:this.type, dot:this.dot, style : cloneStyle})
        this.dot = [];
        redoList = [];
    }

    drag(mouseX, mouseY){
        if (dragging) {
            this.endX = mouseX;
            this.endY = mouseY;
            clean();
            // history.map(data => render(data))
            this.draft()
            this.display();
        }
    }
    display(){
        this.context.beginPath();
        this.context.moveTo(this.centerX, this.centerY)
        this.context.lineTo(this.endX, this.endY);
        this.context.moveTo(this.endX, this.endY);
        this.context.stroke();
        this.context.fill();
    }
    draft(){
        this.context.beginPath();        
        this.context.moveTo(this.dot[0][0], this.dot[0][1])        
        if (this.dot.length > 1) {
            for(let i = 1 ; i < this.dot.length; i++){
                this.context.lineTo(this.dot[i][0], this.dot[i][1])
            }
        }
        this.context.stroke();
        this.context.fill();
    }
}