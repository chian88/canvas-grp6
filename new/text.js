let canvas = document.getElementById('c');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
let data = []

function clean() {
    context.clearRect(0,0,cw,ch);
}
class mouseAction{
    constructor(){
        this.context = context;
        this.Ox;
        this.Oy;
        this.press();
        this.fontSize();
    }
    press(){
        $('#c').mousedown(e =>{
            let mouseX = this.Ox = e.offsetX;
            let mouseY = this.Oy = e.offsetY;
            this.context.moveTo(mouseX,mouseY);
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
                    data.push(this)
                }
            })
        })
    }
    fontSize(){
        let size = window.getComputedStyle(canvas, null).getPropertyValue('font-size');
        this.context.font = `${size} Arial`
    }
}

class Text extends mouseAction{
    constructor(){
        super();
        this.type = 'text';
        this.text;
    }
    draw(){
        this.context.fillText(this.text ,this.Ox ,this.Oy);
    }
}