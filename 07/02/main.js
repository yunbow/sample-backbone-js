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
		model : UserModel
	});

	var UserListView = Backbone.View.extend({
		name : 'UserListView',
		tagName : 'ul',
		initialize : function(args) {
			this.collection = args.collection;
			this.listenTo(this.collection, 'add', this.onAdd);
		},
		render : function() {
			this.$el.html('');
			_.each(this.collection.models, function(model) {
				this.$el.append((new UserListItemView({
					'model' : model
				})).render().el);
			}, this);
			return this;
		},
		onAdd : function() {
			console.log(this.name + '#onAdd');
			this.render();
		}
	});

	var UserListItemView = Backbone.View.extend({
		name : 'UserListItemView',
		tagName : 'li',
		initialize : function(args) {
			this.model = args.model;
			this.compiledTemplate = _.template($('#template-user-list-item').text());
		},
		render : function() {
			var templateData = {
				'label' : {
					'name' : this.model.get('name')
				}
			};
			this.$el.append(this.compiledTemplate(templateData));
			return this;
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
				'name' : this.$el.find('#id_input_name').val(),
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
			this.userListView = new UserListView({
				'collection' : this.collection
			});
			this.userRegisterView = new UserRegisterView({
				'collection' : this.collection
			});
		},
		render : function() {
			this.$el.append(this.userRegisterView.render().el).append(this.userListView.render().el);
			return this;
		}
	});

	var baseView = new BaseView();
	$('body').append(baseView.render().el);
});
