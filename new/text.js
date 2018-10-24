class Text{
    constructor(fontSize){
        this.type = 'text';
        this.size = fontSize;
        this.text;
        this.context = context;
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
        $('input[name="txt"]').keyup(e=>{
            if (e.which == 13 || e.keycode == 13) {
                this.text = e.currentTarget.value
                $('input').remove();
                this.display();
                history.push([this.type, this.text, this.centerX, this.centerY, this.size])
            }
        })
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