Cicadas.Views.AnnotationForm = Backbone.CompositeView.extend({

	events: {
		"click button": "submitNew",

	},

	template: JST["annotations/form"],

	initialize: function (options) {
		this.listenTo(this.model, 'sync', this.render);
		this.range = options.range;
		this.textId = options.textId;
	},

	render: function () {
		console.log(this.range);
		this.$el.html(this.template({annotation: this.model}));
		return this;
	},

	submitNew: function (event){
		event.preventDefault();
		var attrs = this.$el.find('.annotation-form').serializeJSON();
		debugger;
		attrs.annotation.start_index = this.range.start;
		attrs.annotation.end_index = this.range.end;


	}



});
