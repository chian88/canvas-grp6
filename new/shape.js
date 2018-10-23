class Rectangle extends mouseAction{
    constructor(){
        super();
        this.keypressing();
        this.type = "rect";
        this.ouput = [];
    }
    draw(){
        this.context.rect(this.centerX, this.centerY, this.endX - this.centerX, this.endY - this.centerY)
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                // this.dragging = false;
                this.forge()
                clean()
                this.display();
            }
        })
        $('body').keyup(e=>{
            if (e.which ==17 || e.keycode == 17) {
                this.forging = false;
                this.dragging = true;
            }
        })
    }
    forge(){
        if (this.forging) {
            this.lengthX = this.centerX - this.endX;
            this.lengthY = this.centerY - this.endY;
            if(Math.abs(this.lengthX) < Math.abs(this.lengthY)){
                if(this.lengthY > 0 ){
                    this.endY = this.centerY - Math.abs(this.lengthX)
                }else{
                    this.endY = this.centerY + Math.abs(this.lengthX)
                }
            }else{
                if(this.lengthX > 0 ){
                    this.endX = this.centerX - Math.abs(this.lengthY)
                }else{
                    this.endX = this.centerX + Math.abs(this.lengthY)
                }
            }
        }
    }
}

class Ellipse extends mouseAction{
    constructor(){
        super();
        this.keypressing();
        this.type = 'ellipse';
        this.output = [];
    }
    draw(){
        this.context.ellipse(this.centerX, this.centerY, Math.abs(this.endX - this.centerX) , Math.abs(this.endY - this.centerY), 0 , 0 , 2*Math.PI)
    }
    keypressing(){
        $('body').keydown(e=>{
            if(e.which == 17 || e.keycode ==17){
                this.forging = true;
                // this.dragging = false;
                this.forge()
                clean()
                this.display();
            }
        })
        $('body').keyup(e=>{
            if (e.which ==17 || e.keycode == 17) {
                this.forging = false;
                this.dragging = true;
            }
        })
    }
    forge(){
        if (this.forging) {
            this.lengthX = this.centerX - this.endX;
            this.lengthY = this.centerY - this.endY;
            if(this.lengthX > this.lengthY ){
                this.endY = this.centerY + Math.abs(this.lengthX);
            }else{
                this.endX = this.centerX + Math.abs(this.lengthY);
            }
        }
    }
}
