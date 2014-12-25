$(function() {

	var SampleView = Backbone.View.extend({
		tagName : 'a',
		className : 'class_a',
		id : 'id_a',
		attributes : {
			href : 'javascript:void(0)'
		},
		events : {
			'click' : 'onClick'
		},
		render : function() {
			this.$el.html('これは、リンクです');
			return this;
		},
		onClick : function(event) {
			console.log('onClick');
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.render().el);
});
