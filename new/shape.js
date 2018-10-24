class Rectangle {
    constructor(){
        this.type = "rect";
        this.context = context;
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.context.moveTo(this.centerX, this.centerY);
    }
    commit(){
        dragging = false;
        history.push([this.type, this.centerX, this.centerY, this.endX, this.endY])
    }
    drag(mouseX, mouseY){
        if (dragging) {
            this.endX = mouseX;
            this.endY = mouseY;
            clean();
            history.map(data => render(data))
            this.draft()
            this.display();
        }
    }
    display(){
        this.context.beginPath();
        this.context.rect(this.centerX, this.centerY, this.endX - this.centerX, this.endY - this.centerY)
        this.context.stroke();
        this.context.fill();
    }
    keyPress(){
        this.forge()
        clean()
        history.map(data => render(data))
        this.display();
    }
    keyRelease(){
    }
    forge(){
        if (forging) {
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

class Ellipse{
    constructor(){
        this.type = 'ellipse';
        this.dragging = false;
        this.context = context;
        this.centerX;
        this.centerY;
        this.endX;
        this.endY;
    }
    press(mouseX, mouseY){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.context.moveTo(this.centerX, this.centerY);
    }
    commit(){
        dragging = false;
        history.push([this.type, this.centerX, this.centerY, this.endX, this.endY]);
    }
    drag(mouseX, mouseY){
        if (dragging) {
            this.endX = mouseX;
            this.endY = mouseY;
            clean();
            history.map(data => render(data))
            this.display();
        }
    }
    display(){
        this.context.beginPath();
        this.context.ellipse(this.centerX, this.centerY, Math.abs(this.endX - this.centerX) , Math.abs(this.endY - this.centerY), 0 , 0 , 2*Math.PI)
        this.context.stroke();
        this.context.fill();
    }
    keyPress(){
        this.forge()
        clean()
        history.map(data => render(data))
        this.display();
    }
    keyRelease(){
    } 
    forge(){
        if (forging) {
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
