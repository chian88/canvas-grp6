$(function() {
	$("#circle").on("click", function() {
		$("#topbar").children().hide();
		$("#topbar").append($("#thickness").html());
	}); 

	$("#font").on("click", function() {
		$("#topbar").children().hide();
		$("#topbar").append($("#font-option").html());
	})
})