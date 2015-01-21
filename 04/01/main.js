$(function() {

	var BaseView = Backbone.View.extend({
		initialize : function() {
			this.updateButtonView = new UpdateButtonView({
				'parent' : this
			});
			this.deleteButtonView = new DeleteButtonView({
				'parent' : this
			});
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
		initialize : function(args) {
			this.parent = args.parent;
		},
		onClick : function(event) {
			console.log('UpdateButtonView#onClick');
			this.parent.renderLabel('UpdateButtonView');
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
		initialize : function(args) {
			this.parent = args.parent;
		},
		onClick : function(event) {
			console.log('DeleteButtonView#onClick');
			this.parent.renderLabel('DeleteButtonView');
		}
	});

	var baseView = new BaseView();
	$('body').append(baseView.render().el);
});
