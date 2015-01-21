$(function() {

	var BaseView = Backbone.View.extend({
		initialize : function() {
			this.updateButtonView = new UpdateButtonView();
			this.deleteButtonView = new DeleteButtonView();
			this.listenTo(this.updateButtonView, 'update', this.onUpdate);
			this.listenTo(this.deleteButtonView, 'delete', this.onDelete);
		},
		render : function() {
			this.$el.append($('<div>', {
				'id' : 'id_label'
			}));
			this.$el.append(this.updateButtonView.el).append(this.deleteButtonView.el);
			return this;
		},
		renderLabel : function(message) {
			this.$el.find('#id_label').html(message);
		},
		onUpdate : function(message) {
			console.log('BaseView#onUpdate');
			this.renderLabel(message);
		},
		onDelete : function(message) {
			console.log('BaseView#onDelete');
			this.renderLabel(message);
		}
	});

	var UpdateButtonView = Backbone.View.extend({
		tagName : 'input',
		id : 'id_button_update',
		attributes : {
			type : 'button',
			value : '更新'
		},
		events : {
			'click' : 'onClick',
		},
		onClick : function(event) {
			console.log('UpdateButtonView#onClick');
			this.trigger('update', 'UpdateButtonView');
		}
	});

	var DeleteButtonView = Backbone.View.extend({
		tagName : 'input',
		id : 'id_button_delete',
		attributes : {
			type : 'button',
			value : '削除'
		},
		events : {
			'click' : 'onClick',
		},
		onClick : function(event) {
			console.log('DeleteButtonView#onClick');
			this.trigger('delete', 'DeleteButtonView');
		}
	});

	var baseView = new BaseView();
	$('body').append(baseView.render().el);
});
