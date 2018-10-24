var current;  /// because need to have a bigger context.

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

	// effects js

	$(".effects").on("change", function(e) {
		$(this).next().toggle();
	});

	$(".keep-open").on("click", function(e) {
		e.stopPropagation();
	});

	$("#mother-slider").on("click", ".effect_container", function(e) {
		$input = $(e.currentTarget).find("input");
		if ($input.prop("checked")) {
			$input.siblings("div").show();
		} else {
			$input.siblings("div").hide();
		}
	})

	$("#mother-slider div[id$=slider]").slider({
		min: 0,
		max: 100,
		change: function(event, ui) {
			console.log($(event.target).prop('id'));
			console.log(ui.value);
		}		
	})



	// effects js - end



	
	
	function extractColorFromEvent($event) {
		return $event.attr('style').split(":")[1].trim().replace(";", '');
	}
	current = new Curve();
	
	
	$('#clear').on('click', ()=>{
		history.push([]);
		history.map(data =>{render(data)})
	})
	$('#line').on('click', ()=>{
		console.log('line');
		debugger;
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
	})
})