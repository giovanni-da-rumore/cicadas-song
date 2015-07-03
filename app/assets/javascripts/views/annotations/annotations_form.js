Cicadas.Views.AnnotationForm = Backbone.CompositeView.extend({

	events: {
		"click .annotation-submit": "submitHandler",
		"keyup .annotation-textarea": "adjustTextArea",
		"click .form-formatting": "showFormatting",

	},

	template: JST["annotations/form"],

	formatting: JST["formatting/show"],

	initialize: function (options) {
		this.range = options.range;
		this.text = options.text;
		this.formatShown = false;
		this.parentView = options.view;
	},

	render: function () {
		this.topPadding = $(window).scrollTop() - 200;
		if (this.topPadding < 200) {
			this.topPadding = 0
		}
		if (this.topPadding > $('a.active').position().top) {
			this.topPadding = $('a.active').position().top;
		}
		// in case want to make smoother comparison later, or for "start annotation thing
		// that genius does"
		// this.topPadding = $('a.active').position().top - 120;
		this.$el.html(this.template({annotation: this.model, topPadding: this.topPadding}));
		this.$el.find(".annotation-textarea").trigger('keyup');
		return this;
	},




	submitNew: function (event) {
		event.preventDefault();
		var attrs = this.$el.find('.annotation-form').serializeJSON();
		attrs.annotation.start_index = this.range.start;
		attrs.annotation.end_index = this.range.end;
		attrs.annotation.text_id = this.text.get('id');

		var riuscire = function () {
			this.text.annotations().add(this.model);

      var content = Cicadas.TextParser.spaceParse(this.model.escape('content'));
			var view = new Cicadas.Views.AnnotationShow({model: this.model});
      this.$el.html(view.render().$el);
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


	submitEdit: function (event) {
		event.preventDefault();
		var attrs = this.$el.find('.annotation-form').serializeJSON();
		this.model.save(attrs, {
			success: function () {
				this.text.annotations().add(this.model, {merge: true});
			}.bind(this)
		})
	},

	submitHandler: function (event) {
		event.preventDefault();
		if (this.model.get('id')) {
			this.submitEdit(event)
		} else {
			this.submitNew(event);
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

	adjustTextArea: function (event) {
		event.preventDefault();
		Cicadas.TextParser.adjustTextAreaLarge(event);
	},


	showFormatting: function (event) {
    event.preventDefault();
		if (this.formatShown === false) {
    	this.$el.find(".annotation-form").append(this.formatting());
			this.formatShown = true;

		} else {
      this.$el.find('.formatting-container').remove();
      this.formatShown = false;
    }

  },



});
