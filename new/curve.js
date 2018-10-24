class Curve{
    constructor(){
        this.type = 'curve';
        this.context = context;
        this.twistPx;
        this.twistPy;
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
        this.dot = [];
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.context.moveTo(this.centerX, this.centerY);
    }
    commit(){
        dragging = false;
        this.dot.push([
            [this.centerX, this.centerY],
            [this.twistPx, this.twistPy],
            [this.endX, this.endY]
        ])
        history.push([this.type, this.dot])
        this.dot =[];
    }
    drag(mouseX, mouseY){
        if (dragging) {
            this.twistPx = this.endX = mouseX;
            this.twistPy = this.endY = mouseY;
            clean();
            this.draft();
            history.map(data => render(data))
            this.display();
        }
    }
    display(){
        this.context.beginPath();
        this.context.moveTo(this.centerX, this.centerY)
        this.context.quadraticCurveTo(this.twistPx, this.twistPy, this.endX, this.endY)
        this.context.stroke();
        this.context.fill();
    }
    keyPress(){
        clean()
        history.map(data => render(data))
        this.draft();
        this.display();
    }
    keyRelease(){
        this.dot.push([
            [this.centerX, this.centerY],
            [this.twistPx, this.twistPy],
            [this.endX, this.endY]
        ])
        this.centerX = this.endX;
        this.centerY = this.endY;
        this.context.moveTo(this.centerX, this.centerY);
        dragging = true;
    }
    forge(mouseX, mouseY){
        this.twistPx = mouseX;
        this.twistPy = mouseY;
    }
    draft(){
        for(let i = 0 ; i < this.dot.length; i++){
            context.beginPath();        
            context.moveTo(this.dot[i][0][0], this.dot[i][0][1])        
            context.quadraticCurveTo(this.dot[i][1][0], this.dot[i][1][1], this.dot[i][2][0], this.dot[i][2][1])
            context.stroke();
            context.fill();
        }
    }
}