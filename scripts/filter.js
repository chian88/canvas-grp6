class Filter{
    constructor(contextReal, contextDraft){
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.style = {}
    }

  
   grayscale(value=1){
       this.style['grayscale'] = value;
       this.output();
   }

   invert(value=1){
       this.style['invert'] = value;
       this.output();
   }

   brightness(value=1.2){
       this.style['brightness'] = value;
       this.output();
   }

   saturate(value=3){
       this.style['saturate'] = value;
       this.output();
   }

   contrast(value=2){
       this.style['contrast'] = value;
       this.output();
   }

   hueRotate(value=90+'deg'){
       this.style['hue-rotate'] = value;
       this.output();
   }

   blur(value=5+'px'){
        this.style['blur'] = value;
        this.output();
   }

   origin(){
       this.style = {};
       this.output();
   }
   

   output(){
       let names = Object.getOwnPropertyNames(this.style);
       let values = Object.values(this.style);
       let styleArray = [];
       for(let i=0; i<names.length; i++){ // convert js object to array
           if(values[i]){
            let str = `${names[i]}(${values[i]})`;
            styleArray.push(str)
           }
        }
        this.contextReal.canvas.style.filter = this.contextDraft.canvas.style.filter = styleArray.join(' ');
    }
}
