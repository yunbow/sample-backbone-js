$(function() {

	var SampleView = Backbone.View.extend({

		events : {
			'click #id_button_update' : 'onClickUpdate',
			'click #id_button_delete' : 'onClickDelete',
		},
		render : function() {
			this.$el.append($('<input/>', {
				'id' : 'id_button_update',
				'type' : 'button',
				'value' : '更新'
			})).append($('<input/>', {
				'id' : 'id_button_delete',
				'type' : 'button',
				'value' : '削除'
			}));
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
