class Text extends PaintFunction {
    constructor(fontSize){
        super();
        this.type = 'text';
        this.size = fontSize;
        this.text;
        this.context = context2;
        this.centerX;
        this.centerY;
        this.fontSize();
    }
    press(mouseX, mouseY, e){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.context.moveTo(this.centerX, this.centerY);
        $('input').remove();
        $('body').append(`<input type='text' name='txt'></input>`)
        // fontsize Y position
        $('input[name="txt"]').css({'position':'absolute', 'top':`${e.clientY - this.size}px`, 'left':`${e.clientX}px`})
    } 
    keyPress(){
        this.text = $('input[name="txt"]')[0].value
        $('input').remove();
        this.display();
        history.push({type:this.type, text: this.text, center:{x:this.centerX, y:this.centerY}, size:this.size})
        // history.push([this.type, this.text, this.centerX, this.centerY, this.size])
    }
    keyRelease(){
       
    }
    display(){
        this.context.beginPath();
        this.context.fillText(this.text ,this.centerX ,this.centerY);
        this.context.stroke();
        this.context.fill();
    }
    fontSize(){
        // let size = window.getComputedStyle(canvas, null).getPropertyValue('font-size');
        this.context.font = `${this.size}px Arial`
    }
}