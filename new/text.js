class Text extends mouseAction{
    constructor(){
        super();
        this.type = 'text';
        this.text;
        this.fontSize();
    }
    draw(){
        this.context.fillText(this.text ,this.centerX ,this.centerY);
    }
    press(){
        $('#canvasField').mousedown(e =>{
            this.centerX = e.offsetX;
            this.centerY = e.offsetY;
            this.context.moveTo(this.centerX,this.centerY);
            $('input').remove();
            $('body').append(`<input type='text' name='txt'></input>`)
            // fontsize Y position
            $('input[name="txt"]').css({'position':'absolute', 'top':`${e.clientY - 16}px`, 'left':`${e.clientX}px`})
            $('input[name="txt"]').keyup(e=>{
                // console.log(typeof e.currentTarget.value);
                this.text = e.currentTarget.value
                if (e.which == 13 || e.keycode == 13) {
                    $('input').remove();
                    this.draw();
                    history.push(this)
                }
            })
        })
    }
    fontSize(){
        let size = window.getComputedStyle(canvas, null).getPropertyValue('font-size');
        console.log(size);
        
        this.context.font = `${size} Arial`
    }
}