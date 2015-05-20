Cicadas.Views.AnnotationForm = Backbone.CompositeView.extend({

	events: {
		"click .annotation-submit": "submitNew",
	},

	template: JST["annotations/form"],

	initialize: function (options) {
		this.range = options.range;
		this.text = options.text;
		this.parentView = options.view;
	},

	render: function () {
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
			this.text.annotations().add(this.model);

      var content = Cicadas.TextParser.spaceParse(this.model.escape('content'));
      this.$el.html(JST['annotations/show']({annotation: this.model, content: content}));
    };

		if (this.isNested(this.range.start, this.range.end)) {
			this.nestedFailHandler();
		}
		else {
			this.model.save(attrs, {
      success: riuscire.bind(this),
    	});
		}
  },


	isNested: function (start, end) {
		var nested = false;
		this.text.annotations().each(function (annotation) {
			if ((start >= annotation.get('start_index') && end <= annotation.get('end_index')) ||
			(start <= annotation.get('end_index') && annotation.get('end_index') <= end) ||
			(start <= annotation.get('start_index') && annotation.get('start_index') <= end))
			 {
				nested = true;
				return nested;
			}
		}.bind(this))

		return nested;
	},

	nestedFailHandler: function () {
		alert("annotations cannot cover existing annotations");
		this.parentView.inAnnotation = false;
		var descrView = new Cicadas.Views.DescriptionShow({model: this.text});
		this.$el.html(descrView.render().$el);
	},





});
