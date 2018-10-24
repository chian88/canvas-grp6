class Curve extends mouseAction{
    constructor(){
        super();
        this.type = 'curve';
        this.twistPx;
        this.twistPy;
        this.dot = [];
        this.keypressing();
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                this.dragging = false;
                this.forge();
                clean()
                this.display();
            }
        })
        $('body').keyup(e=>{
            if (e.which ==17 || e.keycode == 17) {
                this.forging = false;
                this.dot.push([
                    [this.centerX, this.centerY],
                    [this.twistPx, this.twistPy],
                    [this.endX, this.endY]
                ])
                this.centerX = this.endX;
                this.centerY = this.endY;
                this.context.moveTo(this.centerX, this.centerY);
                this.dragging = true;
            }
        })
    }
    forge(){
        $('#canvasField').mousemove(e=>{
            if (this.forging) {
                this.twistPx = e.offsetX;
                this.twistPy = e.offsetY;
            }
        })
    }
    draw(){
        this.context.moveTo(this.centerX, this.centerY)
        this.context.quadraticCurveTo(this.twistPx, this.twistPy, this.endX, this.endY)
    }
}