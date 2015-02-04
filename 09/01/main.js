$(function() {

	var UserModel = Backbone.Model.extend({
		defaults : {
			'name' : '',
			'age' : '0',
			'gender' : '',
			'blood' : '',
			'mailAddress' : ''
		},
		validate : function(attribuite) {
			if (_.isEmpty(attribuite.name)) {
				return "名前が入力されていません";
			}
			if (_.isEmpty(attribuite.age)) {
				return "年齢が入力されていません";
			}
			if (_.isEmpty(attribuite.mailAddress)) {
				return "メールアドレスが入力されていません";
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
			this.listenTo(this.collection, 'remove', this.onRemove);
		},
		render : function() {
			this.$el.html('');
			_.each(this.collection.models, function(model) {
				this.$el.append((new UserListItemView({
					'model' : model,
					'collection' : this.collection
				})).render().el);
			}, this);
			return this;
		},
		onAdd : function() {
			console.log(this.name + '#onAdd');
			this.render();
		},
		onRemove : function() {
			console.log(this.name + '#onRemove');
			this.render();
		}
	});

	var UserListItemView = Backbone.View.extend({
		name : 'UserListItemView',
		tagName : 'li',
		events : {
			'click .cls_button_detail' : 'onClickDetailButton',
			'click .cls_button_delete' : 'onClickDeleteButton'
		},
		initialize : function(args) {
			this.model = args.model;
			this.collection = args.collection
			this.compiledTemplate = _.template($('#template-user-list-item').text());
		},
		render : function() {
			var templateData = {
				'label' : {
					'name' : this.model.get('name'),
					'detailButton' : '詳細',
					'deleteButton' : '削除'
				}
			};
			this.$el.append(this.compiledTemplate(templateData));
			return this;
		},
		onClickDetailButton : function() {
			console.log(this.name + '#onClickDetailButton');
			var message = '';
			message += '\n名前 : ' + this.model.get('name');
			message += '\n年齢 : ' + this.model.get('age');
			message += '\n性別 : ' + this.model.get('gender');
			message += '\n血液型 : ' + this.model.get('blood');
			message += '\nメールアドレス : ' + this.model.get('mailAddress');
			alert(message);
		},
		onClickDeleteButton : function() {
			console.log(this.name + '#onClickDeleteButton');
			this.collection.remove(this.model);
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
					'age' : '年齢 : ',
					'gender' : '性別 : ',
					'male' : '男性',
					'female' : '女性',
					'blood' : '血液型 : ',
					'mail' : 'メールアドレス : ',
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
				'age' : this.$el.find('#id_input_age').val(),
				'gender' : this.$el.find('#id_select_gender').val(),
				'blood' : this.$el.find('#id_select_blood').val(),
				'mailAddress' : this.$el.find('#id_input_mail').val()
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
