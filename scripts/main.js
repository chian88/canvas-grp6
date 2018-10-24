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
		debugger;
		var $event = $(e.target);
		var bgcolor = extractColorFromEvent($event);

		$("#canvasField").css("background-color", bgcolor);

	});

	
	
	function extractColorFromEvent($event) {
		return $event.attr('style').split(":")[1].trim().replace(";", '');
	}
	
	
	$('#clear').on('click', ()=>{
		history.push([]);
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
	})
})