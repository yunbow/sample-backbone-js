$(function() {

	var UserModel = Backbone.Model.extend({
		defaults : {
			'name' : ''
		},
		isSelected : false,
		validate : function(attribuite) {
			if (_.isEmpty(attribuite.name)) {
				return "名前が入力されていません";
			}
		}
	});

	var UserCollection = Backbone.Collection.extend({
		model : UserModel,
		removeSelectedModel : function() {
			var selectedCollection = this.models.filter(function(model) {
				return model.isSelected;
			});
			this.remove(selectedCollection);
		}
	});

	var UserListView = Backbone.View.extend({
		name : 'UserListView',
		events : {
			'click #id_button_delete' : 'onClickDeleteButton'
		},
		initialize : function(args) {
			this.collection = args.collection;
			this.listenTo(this.collection, 'add', this.onAdd);
			this.listenTo(this.collection, 'remove', this.onRemove);
			this.compiledTemplate = _.template($('#template-user-list').text());
		},
		render : function() {
			var templateData = {
				'label' : {
					'deleteButton' : '削除'
				}
			};
			this.$el.append(this.compiledTemplate(templateData))
			return this;
		},
		renderItem : function() {
			this.$el.find('#id_ul_user_list').html('');
			_.each(this.collection.models, function(model) {
				this.$el.find('#id_ul_user_list').append((new UserListItemView({
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
		onClickDeleteButton : function() {
			console.log(this.name + '#onClickDeleteButton');
			this.collection.removeSelectedModel();
		}
	});

	var UserListItemView = Backbone.View.extend({
		name : 'UserListItemView',
		tagName : 'li',
		events : {
			'click .cls_checkbox' : 'onClickCheckBox'
		},
		initialize : function(args) {
			this.model = args.model;
			this.collection = args.collection;
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
		},
		onClickCheckBox : function(event) {
			console.log(this.name + '#onClickCheckBox');
			this.model.isSelected = event.target.checked;
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
