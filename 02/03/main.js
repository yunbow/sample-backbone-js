$(function() {

	var SampleView = Backbone.View.extend({

		events : {
			'click #id_button_update' : 'onClickUpdate',
			'click #id_button_delete' : 'onClickDelete',
		},
		initialize : function() {
			this.compiledTemplate = _.template($('#template-buttons').text());
		},
		render : function() {
			this.$el.append(this.compiledTemplate());
			return this;
		},
		onClickUpdate : function(event) {
			console.log('onClickUpdate');
		},
		onClickDelete : function(event) {
			console.log('onClickDelete');
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.render().el);
});
