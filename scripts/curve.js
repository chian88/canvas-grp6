class Curve extends PaintFunction {
    constructor(){
        super();
        this.type = 'curve';
        this.context = context2;
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
    
        // new
        this.dot.push([[this.centerX, this.centerY]])  
        if (this.dot[this.dot.length-2] != undefined){
            if (this.dot[this.dot.length-2].length === 1) {
                console.log('new point added');
                this.dot[this.dot.length-2].push([this.twistPx, this.twistPy],[this.endX, this.endY])
            }
        }  
    }
    
    commit(){
        dragging = false;
        this.dot.pop();
        let cloneStyle = Object.assign({},this.style);
        history.push({type: this.type, dot : this.dot, style : cloneStyle})
        this.dot =[];
        redoList = [];
    }
    drag(mouseX, mouseY){
        if (dragging) {
            this.twistPx = this.endX = mouseX;
            this.twistPy = this.endY = mouseY;
            clean();
            this.draft();
            this.display();
        }
    }
    display(){
        this.context.beginPath();
        this.context.moveTo(this.centerX, this.centerY)
        this.context.quadraticCurveTo(this.twistPx, this.twistPy, this.endX, this.endY)
        this.context.moveTo(this.endX, this.endY);
        this.context.stroke();
        this.context.fill();
    }
    forge(mouseX, mouseY){
        //new
        if(this.dot.length > 2){
            this.dot[this.dot.length-2][1][0] = mouseX
            this.dot[this.dot.length-2][1][1] = mouseY
        }
    }
    draft(){
        for(let i = 0 ; i < this.dot.length; i++){
            if (this.dot[i].length > 1) {
                this.context.beginPath();        
                this.context.moveTo(this.dot[i][0][0], this.dot[i][0][1])
                this.context.quadraticCurveTo(this.dot[i][1][0], this.dot[i][1][1], this.dot[i][2][0], this.dot[i][2][1])
                this.context.stroke();
                this.context.fill();
            }
        }
    }
}