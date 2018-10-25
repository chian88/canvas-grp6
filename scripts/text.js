class Text extends PaintFunction {
    constructor(){
        super();
        this.type = 'text';
        // this.size = fontSize;
        this.text;
        this.context = context2;
        this.centerX;
        this.centerY;
        // this.fontSize();
    }
    press(mouseX, mouseY, e){
        this.centerX = mouseX;
        this.centerY = mouseY;
        this.context.moveTo(this.centerX, this.centerY);
        $('#newtext').remove();
        $('body').append(`<input type='text' name='txt' id="newtext"></input>`)
        // fontsize Y position
        $('input[name="txt"]').css({'position':'absolute', 'top':`${e.clientY - this.size}px`, 'left':`${e.clientX}px`})
    } 
    keyPress(){
        this.text = $('input[name="txt"]')[0].value
        $('#newtext').remove();
        this.display();
        history.push({type:this.type, text: this.text, center:{x:this.centerX, y:this.centerY}, size:this.size, style: this.style})
    }
    keyRelease(){
       
    }
    display(){
        this.context.beginPath();
        this.context.fillText(this.text ,this.centerX ,this.centerY);
        this.context.stroke();
        this.context.fill();
    }
}