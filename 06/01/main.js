$(function() {

	var ProgramingLanguageModel = Backbone.Model.extend({
		defaults : {
			'name' : '',
			'value' : 0
		}
	});

	var ProgramingLanguageCollection = Backbone.Collection.extend({
		model : ProgramingLanguageModel
	});

	var SampleView = Backbone.View.extend({

		events : {
			'change #language' : 'onChange'
		},
		initialize : function() {
			this.compiledTemplate = _.template($('#template-programing-subview').text());
			this.collection = new ProgramingLanguageCollection([ {
				'name' : 'JavaScript',
				'value' : 1
			}, {
				'name' : 'Java',
				'value' : 2
			}, {
				'name' : 'C言語',
				'value' : 3
			}, {
				'name' : 'Ruby',
				'value' : 4
			}, {
				'name' : 'Python',
				'value' : 5
			} ]);
		},
		render : function() {
			var data = {
				'title' : 'プログラミング言語を選択してください'
			};
			this.$el.append(this.compiledTemplate(data));
			_.each(this.collection.models, function(model) {
				this.$el.find('#language').append((new OptionView(model)).render().el);
			}, this);
			return this;
		},
		onChange : function(event) {
			console.log('onChange:' + event.target.value);
		}
	});

	var OptionView = Backbone.View.extend({
		tagName : 'option',
		initialize : function(model) {
			this.label = model.get('name');
			this.attributes = {
				'value' : model.get('value')
			};
		},
		render : function() {
			this.$el.html(this.label);
			return this;
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.render().el);
});
