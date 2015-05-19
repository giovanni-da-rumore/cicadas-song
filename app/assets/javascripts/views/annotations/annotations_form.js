Cicadas.Views.AnnotationForm = Backbone.CompositeView.extend({

	events: {
		"click .annotation-submit": "submitNew",
		"click .annotation-cancel": "cancel",
	},

	template: JST["annotations/form"],

	initialize: function (options) {
		//this.listenTo(this.model, 'sync', this.render);
		this.range = options.range;
		this.text = options.text
	},

	render: function () {
		console.log(this.range);
		this.$el.html(this.template({annotation: this.model}));
		return this;
	},

	submitNew: function (event){
		event.preventDefault();
		var attrs = this.$el.find('.annotation-form').serializeJSON();
		attrs.annotation.start_index = this.range.start;
		attrs.annotation.end_index = this.range.end;
		attrs.annotation.text_id = this.text.get('id');

		var riuscire = function () {
      var content = Cicadas.TextParser.spaceParse(this.model.escape('content'));
      this.$el.html(JST['annotations/show']({annotation: this.model, content: content}));
			// debugger;
    };

    this.model.save(attrs, {
      success: riuscire.bind(this),
    });
  },


	cancel: function (event) {
		event.preventDefault();
		var descriptionView = new Cicadas.Views.DescriptionShow({
			model: this.text.textDescription()});
		debugger;

		this.$el.html(descriptionView.render().$el);
	},



});
