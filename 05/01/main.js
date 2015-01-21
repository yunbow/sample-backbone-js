$(function() {

	var BaseView = Backbone.View.extend({
		el : '#id_buttons',
		events : {
			'click #id_button_update' : 'onClickUpdateButton',
			'click #id_button_delete' : 'onClickDeleteeButton'
		},
		onClickUpdateButton : function(event) {
			console.log('onClickUpdateButton');
		},
		onClickDeleteeButton : function(event) {
			console.log('onClickDeleteeButton');
		}
	});

	var baseView = new BaseView();
});
