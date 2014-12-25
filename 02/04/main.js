$(function() {

	var SampleView = Backbone.View.extend({

		events : {
			'change #language' : 'onChange'
		},
		initialize : function() {
			this.compiledTemplate = _.template($('#template-programing').text());
		},
		render : function() {

			var data = {
				'title' : 'プログラミング言語を選択してください',
				'label' : {
					'option1' : 'JavaScript',
					'option2' : 'Java',
					'option3' : 'C言語',
					'option4' : 'Ruby',
					'option5' : 'Python'
				},
				'value' : {
					'option1' : '1',
					'option2' : '2',
					'option3' : '3',
					'option4' : '4',
					'option5' : '5'
				}
			};
			this.$el.append(this.compiledTemplate(data));
			return this;
		},
		onChange : function(event) {
			console.log('onChange:' + event.target.value);
		}
	});
	
	var sampleView = new SampleView();
	$('body').append(sampleView.render().el);
});
