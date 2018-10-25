$(function() {

	$("#circle").on("click", function(e) {
		$("#topbar").children().hide();
		$("#topbar #thickness").show();
		
	}); 

	$("#font").on("click", function(e) {
		$("#topbar").children().hide();
		$("#topbar #font-option").show();
	})

	$(".sidebar").on("click", "div[id]", function(e) {
		// debugger;
		$div = $(e.currentTarget);
		$sidebar = $div.closest(".sidebar");
		$sidebar.find("div[id]").removeClass("active");
		$div.toggleClass("active");
	});

	$("div#background").on("click", function(e) {
		var $event = $(e.target);
		var bgcolor = extractColorFromEvent($event);

		$("#canvasReal").css("background-color", bgcolor);

	});

	// color panel
	$('.stroke >> div').on('click',function(e){
		// let cls = $(this).attr('class').split(' ')[1];
		let cls = extractColorFromEvent($(e.target))
		// debugger;
		current.strokeColor(cls);
	})

	$('.fill >> div').on('click',function(e){
		// let cls = $(this).attr('class').split(' ')[1];
		let cls = extractColorFromEvent($(e.target))
		current.fillColor(cls);
	})  


	// effects js

	$(".effects").on("change", function(e) {
		$(this).next().toggle();
	});

	//color panel

	$('.stroke >> div').on('click',function(){
		let cls = $(this).attr('class').split(' ')[1];
		currentFunction.strokeColor(cls);
	})

	$('.fill >> div').on('click',function(){
		let cls = $(this).attr('class').split(' ')[1];
		currentFunction.fillColor(cls);
	})

	//undo redo

	$('#undo').on('click',function(){
		undo();
	})

	$('#redo').on('click',function(){
		redo();
	})

	$('#clear').on('click',function(){
		clear();
	})

	//filter control
		
	$(".keep-open").on("click", function(e) {
		e.stopPropagation();
	});

	$("#mother-slider").on("click", ".effect_container", function(e) {
		let input = $(e.currentTarget).find("input");
		if (input.prop("checked")) {
			let value;
			input.siblings("div").show();
			switch(input.attr('id')){
				case 'grayscale':
					value = input.siblings("div").slider('value')/100;
					filter.grayscale(value);
					break;
				case 'invert':
					value = input.siblings("div").slider('value')/100;
					filter.invert(value);
					break;
				case 'brightness':
					value = input.siblings("div").slider('value')/100;
					filter.brightness(value);
					break;
				case 'saturate':
					value = input.siblings("div").slider('value')/100;
					filter.saturate(value);
					break;
				case 'contrast':
					value = input.siblings("div").slider('value')/100;
					filter.contrast(value);
					break;
				case 'hueRotate':
					value = input.siblings("div").slider('value')+'deg';
					filter.hueRotate(value);
					break;
				case 'blur':
					value = input.siblings("div").slider('value')+'px'
					filter.blur(value);
					break;
				case 'sepia':
					value = input.siblings("div").slider('value')/100;
					filter.sepia(value);
					break;
			}
		}else {
			input.siblings("div").hide();
			filter.removeFilter(input.attr('id'))
		}
	})

	$("#mother-slider .100-percent").slider({
		min: 0,
		max: 100,
		value: 100,
		slide: function(event, ui) {
			let percent = ui.value/100;
			switch($(event.target).prop('id')){
				case 'grayscale-slider':
					filter.grayscale(percent);
					break;
				case 'sepia-slider':
					filter.sepia(percent);
					break;
			}
		}		
	})

	$("#mother-slider #invert-slider").slider({
		min: 50,
		max: 100,
		value: 100,
		slide: function(event, ui) {
			let percent = ui.value/100;
			filter.invert(percent);
			}
	})

	$("#mother-slider #brightness-slider").slider({
		min: 0,
		max: 300,
		value: 120,
		slide: function(event, ui) {
			let percent = ui.value/100;
			filter.brightness(percent);
			}
	})

	$("#mother-slider .500-percent").slider({
		min: 0,
		max: 500,
		value: 200,
		slide: function(event, ui) {
			let percent = ui.value/100;
			switch($(event.target).prop('id')){
				case 'saturate-slider':
					filter.saturate(percent);
					break;
				case 'contrast-slider':
					filter.contrast(percent);
					break;

			}
		}
	})

	$("#mother-slider #hueRotate-slider").slider({
		min: 0,
		max: 360,
		value: 90,
		slide: function(event, ui) {
			let percent = ui.value + 'deg';
			filter.hueRotate(percent);
			}
	})

	$("#mother-slider #blur-slider").slider({
		min: 0,
		max: 25,
		value: 5,
		slide: function(event, ui) {
			let pixel = ui.value + 'px';
			filter.blur(pixel);
			}
	})
	
	function extractColorFromEvent($event) {
		return $event.attr('style').split(":")[1].trim().replace(";", '');
	}
	
	
	$('#clear').on('click', ()=>{
		history.push([]);
		history.map(data =>{render(data)})
	})
	$('#line').on('click', ()=>{
		console.log('line');
		current = new Curve();
	})
	$('#circle').on('click', ()=>{
		console.log('circle');
		current = new Ellipse();
	})
	$('#polygon').on('click', ()=>{
		console.log('polygon');
		current = new Polygon();
	})
	$('#font').on('click', ()=>{
		console.log('text');
		current = new Text(16);
	})
	$('#rectangle').on('click', ()=>{
		console.log('rectangle');
		current = new Rectangle()
	})
	$('#pen').on('click', ()=>{
		console.log('brush');
		current = new Brush();
	})
	$('#eraser').on('click', ()=>{
		console.log('eraser');
		current = new Brush();
<<<<<<< HEAD
	});
});
=======
	})
})
>>>>>>> 863baf52e9fa43cad27c2c83d9c2d9f7946fea2f
