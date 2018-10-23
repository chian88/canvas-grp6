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
		var color = extractColorFromEvent($event);

		$("#canvas").css("background-color", color);

	});

	//color panel

	$('.stroke >> div').on('click',function(){
		let cls = $(this).attr('class').split(' ')[1];
		currentFunction.strokeColor(cls);
		console.log(cls)
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




	function extractColorFromEvent($event) {
		return $event.attr('style').split(":")[1].trim().replace(";", '');
	}
})