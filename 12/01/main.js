$(function() {

	var UserModel = Backbone.Model.extend({
		defaults : {
			'name' : ''
		},
		validate : function(attribuite) {
			if (_.isEmpty(attribuite.name)) {
				return "名前が入力されていません";
			}
		}
	});

	var UserCollection = Backbone.Collection.extend({
		model : UserModel,
		removeSelectedModel : function() {
			this.remove(this.selectedModel);
		},
		selectedModel : null
	});

	var UserTableView = Backbone.View.extend({
		name : 'UserTableView',
		events : {
			'click #id_button_delete' : 'onClickDeleteButton'
		},
		initialize : function(args) {
			this.collection = args.collection;
			this.listenTo(this.collection, 'add', this.onAdd);
			this.listenTo(this.collection, 'remove', this.onRemove);
			this.compiledTemplate = _.template($('#template-user-table').text());
		},
		render : function() {
			var tempData = {
				'header' : {
					'name' : '名前'
				},
				'label' : {
					'deleteButton' : '削除'
				}
			};
			this.$el.append(this.compiledTemplate(tempData));
			return this;
		},
		renderItem : function() {
			this.$el.find('#id_tbody').html('');
			_.each(this.collection.models, function(model) {
				this.$el.find('#id_tbody').append((new UserTableItemView({
					'model' : model,
					'collection' : this.collection
				})).render().el);
			}, this);
		},
		onAdd : function() {
			console.log(this.name + '#onAdd');
			this.renderItem();
		},
		onRemove : function() {
			console.log(this.name + '#onRemove');
			this.renderItem();
		},
		onClickDeleteButton : function(event) {
			console.log(this.name + '#onClickDeleteButton');
			this.collection.removeSelectedModel();
		}
	});

	var UserTableItemView = Backbone.View.extend({
		name : 'UserTableItemView',
		tagName : 'tr',
		events : {
			'click .cls_radio_button' : 'onClickRadioButton'
		},
		initialize : function(args) {
			this.model = args.model;
			this.collection = args.collection;
			this.compiledTemplate = _.template($('#template-user-table-item').text());
		},
		render : function() {
			var templateData = {
				'data' : this.model.toJSON()
			};
			this.$el.append(this.compiledTemplate(templateData));
			return this;
		},
		onClickRadioButton : function(event) {
			console.log(this.name + '#onClickRadioButton:' + event.target.checked);
			this.collection.selectedModel = this.model;
		}
	});

	var UserRegisterView = Backbone.View.extend({
		name : 'UserRegisterView',
		events : {
			'click #id_button_regist' : 'onClickRegistButton'
		},
		initialize : function(args) {
			this.collection = args.collection;
			this.listenTo(this.collection, 'invalid', this.onInvalid);
			this.compiledTemplate = _.template($('#template-user-register').text());
		},
		render : function() {
			var templateData = {
				'label' : {
					'name' : '名前 : ',
					'registButton' : '登録'
				}
			};
			this.$el.append(this.compiledTemplate(templateData))
			return this;
		},
		onClickRegistButton : function() {
			console.log(this.name + '#onClickRegistButton');
			this.collection.add({
				'name' : this.$el.find('#id_input_name').val()
			}, {
				validate : true
			});
		},
		onInvalid : function(collection, message) {
			console.log(this.name + '#onInvalid');
			alert(message);
		}
	});

	var BaseView = Backbone.View.extend({
		name : 'BaseView',
		initialize : function() {
			this.collection = new UserCollection();
			this.userTableView = new UserTableView({
				'collection' : this.collection
			});
			this.userRegisterView = new UserRegisterView({
				'collection' : this.collection
			});
		},
		render : function() {
			this.$el.append(this.userRegisterView.render().el).append(this.userTableView.render().el);
			return this;
		}
	});

	var baseView = new BaseView();
	$('body').append(baseView.render().el);
});
