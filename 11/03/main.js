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
		model : UserModel,
		sortAttribute : '',
		sortDirection : 1,
		initialize : function() {
			var that = this;
			this.sortComparators = {
				'name' : that.comparatorString,
				'age' : that.comparatorInteger,
				'gender' : that.comparatorString,
				'blood' : that.comparatorString,
				'mailAddress' : that.comparatorString
			}
		},
		sortToggle : function(attribute) {
			if (this.sortAttribute == attribute) {
				this.sortDirection *= -1;
			} else {
				this.sortDirection = 1;
			}
			this.sortAttribute = attribute;
			this.comparator = this.sortComparators[attribute];
			this.sort();
		},
		comparatorString : function(a, b) {
			var a = a.get(this.sortAttribute), b = b.get(this.sortAttribute);
			if (a == b) {
				return 0;
			}
			if (this.sortDirection == 1) {
				return b < a ? 1 : -1;
			} else {
				return a < b ? 1 : -1;
			}
		},
		comparatorInteger : function(model) {
			return model.get(this.sortAttribute) * this.sortDirection;
		}
	});

	var UserTableView = Backbone.View.extend({
		name : 'UserTableView',
		events : {
			'click .cls_header' : 'onClickHeader'
		},
		initialize : function(args) {
			this.collection = args.collection;
			this.listenTo(this.collection, 'add', this.onAdd);
			this.listenTo(this.collection, 'sort', this.onSort);
			this.compiledTemplate = _.template($('#template-user-table').text());
			this.currentHeader = null;
		},
		render : function() {
			var tempData = {
				'header' : {
					'name' : '名前',
					'age' : '年齢',
					'gender' : '性別',
					'blood' : '血液型',
					'mailAddress' : 'メールアドレス'
				}
			};
			this.$el.append(this.compiledTemplate(tempData));
			return this;
		},
		renderItem : function() {
			this.$el.find('#id_tbody').html('');
			_.each(this.collection.models, function(model) {
				this.$el.find('#id_tbody').append((new UserTableItemView({
					'model' : model
				})).render().el);
			}, this);
		},
		renderClearSortIcon : function() {
			_.each([ 'cls_sort_up', 'cls_sort_down' ], function(sortClass) {
				this.$el.find("a[name='" + this.collection.sortAttribute + "'] span").removeClass(sortClass);
			}, this);
		},
		renderSortIcon : function() {
			var sortClass = null;
			if (this.collection.sortDirection == 1) {
				sortClass = 'cls_sort_up';
			} else {
				sortClass = 'cls_sort_down';
			}
			this.$el.find("a[name='" + this.collection.sortAttribute + "'] span").addClass(sortClass);
		},
		onAdd : function() {
			console.log(this.name + '#onAdd');
			this.renderItem();
		},
		onSort : function() {
			console.log(this.name + '#onSort');
			this.renderItem();
			this.renderSortIcon();
		},
		onClickHeader : function(event) {
			console.log(this.name + '#onClickHeader');
			this.renderClearSortIcon();
			this.collection.sortToggle(event.target.name);
		}
	});

	var UserTableItemView = Backbone.View.extend({
		name : 'UserTableItemView',
		tagName : 'tr',
		initialize : function(args) {
			this.model = args.model;
			this.compiledTemplate = _.template($('#template-user-table-item').text());
		},
		render : function() {
			var templateData = {
				'data' : this.model.toJSON()
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
