Cicadas.Views.AnnotationForm = Backbone.CompositeView.extend({

	events: {
		"click button": "submit",

	},

	template: JST["annotations/form"],

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function () {
		this.$el.html(this.template({annotation: this.model}));
		return this;
	},

	submit: function (event){
		event.preventDefault();
	}



});
