$(function() {

	var ButtonView = Backbone.View.extend({
		events : {
			'click' : 'onClick'
		},
		onClick : function(event) {
			console.log(event.target.id + '#onClick');
		}
	});

	var buttonView1 = new ButtonView({
		'el' : '#id_button_update'
	});
	var buttonView2 = new ButtonView({
		'el' : '#id_button_delete'
	});
});
