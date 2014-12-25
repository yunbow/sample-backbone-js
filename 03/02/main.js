$(function() {

	var SampleView = Backbone.View.extend({

		events : {
			'change #language' : 'onChange'
		},
		initialize : function() {
			this.compiledTemplate = _.template($('#template-programing-subview').text());
			this.optionList = [ 
			    new OptionView({'label' : 'JavaScript','attributes' : {'value' : '1'}}),
			    new OptionView({'label' : 'Java','attributes' : {'value' : '2'}}),
			    new OptionView({'label' : 'C言語','attributes' : {'value' : '3'}}),
			    new OptionView({'label' : 'Ruby','attributes' : {'value' : '4'}}),
			    new OptionView({'label' : 'Python','attributes' : {'value' : '5'}})
			    ];
		},
		render : function() {
			var data = {
				'title' : 'プログラミング言語を選択してください'
			};
			this.$el.append(this.compiledTemplate(data));
			_.each(this.optionList, function(option) {
				this.$el.find('#language').append(option.render().el);
			}, this);
			return this;
		},
		onChange : function(event) {
			console.log('onChange:' + event.target.value);
		}
	});

	var OptionView = Backbone.View.extend({
		tagName : 'option',
		initialize : function(args) {
			this.label = args.label;
		},
		render : function(){
			this.$el.html(this.label);
			return this;
		}
	});

	var sampleView = new SampleView();
	$('body').append(sampleView.render().el);
});
