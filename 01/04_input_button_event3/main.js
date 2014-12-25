$(function() {

	var SampleView = Backbone.View.extend({
		tagName : 'input',
		className : 'class_input',
		id : 'id_input',
		attributes : {
			type : 'button',
			value : '更新する'
		},
		events : {
			'click' : 'onClick',
			'mouseover' : 'onMouseover',
			'mouseleave' : 'onMouseleave'
		},
		onClick : function(event) {
			console.log('onClick');
		},
		onMouseover : function(event) {
			console.log('onMouseover');
		},
		onMouseleave : function(event) {
			console.log('onMouseleave');
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.el);
});
