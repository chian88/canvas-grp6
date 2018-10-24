class Filter{
    constructor(contextReal, contextDraft){
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.style = {}
    }

  
   grayscale(value){
       this.style['grayscale'] = value;
       this.output();
   }

   invert(value){
       this.style['invert'] = value;
       this.output();
   }

   brightness(value=1.2){
       this.style['brightness'] = value;
       this.output();
   }

   saturate(value){
       this.style['saturate'] = value;
       this.output();
   }

   contrast(value){
       this.style['contrast'] = value;
       this.output();
   }

   hueRotate(value){
       this.style['hue-rotate'] = value;
       this.output();
   }

   blur(value=5+'px'){
        this.style['blur'] = value;
        this.output();
   }

   sepia(value){
       this.style['sepia'] = value;
       this.output();
   }

   removeFilter(name){
       if(name == 'hueRotate'){
           name = 'hue-rotate';
       }
       delete this.style[name] ;
       this.output();
   }
   

   output(){
       let names = Object.getOwnPropertyNames(this.style);
       let values = Object.values(this.style);
       let styleArray = [];
       for(let i=0; i<names.length; i++){ // convert js object to array
           if(values[i] || values[i] == 0){
            let str = `${names[i]}(${values[i]})`;
            styleArray.push(str)
           }
        }
        this.contextReal.canvas.style.filter = this.contextDraft.canvas.style.filter = styleArray.join(' ');
    }
}

