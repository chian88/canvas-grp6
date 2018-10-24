class Polygon extends mouseAction{
    constructor(){
        super();
        this.type = 'polygon';
        this.dot = [];
    }
    draw(){
        this.context.moveTo(this.centerX, this.centerY)
        this.context.lineTo(this.endX, this.endY);
        this.context.moveTo(this.endX, this.endY);
    }
}