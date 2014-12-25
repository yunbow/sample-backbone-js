$(function() {

	var SampleView = Backbone.View.extend({
		tagName : 'input',
		className : 'class_input',
		id : 'id_input',
		attributes : {
			type : 'text'
		},
		events : {
			'change' : 'onChange'
		},
		onChange : function(event) {
			console.log('onChange');
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.el);
});
