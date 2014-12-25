$(function() {

	var SampleView = Backbone.View.extend({

		events : {
			'click #id_button_update' : 'onClickUpdate',
			'click #id_button_delete' : 'onClickDelete',
		},
		initialize : function() {
			this.updateButtonView = new UpdateButtonView();
			this.deleteButtonView = new DeleteButtonView();
		},
		render : function() {
			this.$el.append(this.updateButtonView.el).append(this.deleteButtonView.el);
			return this;
		},
		onClickUpdate : function(event) {
			console.log('onClickUpdate');
		},
		onClickDelete : function(event) {
			console.log('onClickDelete');
		}
	});

	var UpdateButtonView = Backbone.View.extend({
		tagName : 'input',
		id : 'id_button_update',
		attributes : {
			type : 'button',
			value : '更新'
		}
	});

	var DeleteButtonView = Backbone.View.extend({
		tagName : 'input',
		id : 'id_button_delete',
		attributes : {
			type : 'button',
			value : '削除'
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.render().el);
});
