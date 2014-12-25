$(function() {

	var SampleView = Backbone.View.extend({
		tagName : 'input',
		className : 'class_input',
		id : 'id_input',
		attributes : {
			type : 'button',
			value : '更新する'
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.el);

});
