Cicadas.Views.DescriptionForm = Backbone.CompositeView.extend({

  template: JST['descriptions/form'],

  formatting: JST['formatting/show'],

  events: {
    "click .description-submit": "submitDescription",
    "click .description-cancel": "cancel",
    "click .formatting": "showFormatting",
    "keyup .description-textarea": "adjustTextArea",
  },

  initialize: function (options) {
    this.textId = options.textId;
    this.parentText = options.parentText;
    this.formatShown = false;
  },

  render: function () {
    this.$el.html(this.template({description: this.model}));
    this.$el.find(".description-textarea").trigger('keyup');
    return this;
  },


  submitDescription: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').serializeJSON();
    attrs["description"]["author_id"] = Cicadas.currentUser.get('id');
    attrs["description"]["text_id"] = this.textId;

    var riuscire = function () {
      this.author = Cicadas.currentUser;
      // markdown
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        breaks: true,
        sanitize: true,
      });
      var content = marked(this.model.get('content'));

      this.$el.html(JST['descriptions/show']({description: this.model,
        content: content, author: this.author}));
    };

    this.model.save(attrs, {
      success: riuscire.bind(this),
    });
  },

  showFormatting: function (event) {
    event.preventDefault();
    if (this.formatShown === false) {
      this.$el.find(".description-form").append(this.formatting());
      this.formatShown = true;
    } else {
      this.$el.find('.formatting-container').remove();
      this.formatShown = false;
    }

  },

  adjustTextArea: function (event) {
		event.preventDefault();
		Cicadas.TextParser.adjustTextArea(event);
	},


});
