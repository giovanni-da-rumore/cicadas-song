Cicadas.Views.DescriptionForm = Backbone.CompositeView.extend({

  template: JST['descriptions/form'],

  events: {
    "click .description-submit": "submitDescription",
    "click .description-cancel": "cancel",
    "keyup .description-textarea": "adjustTextArea",
  },

  initialize: function (options) {
    this.textId = options.textId;
    this.parentText = options.parentText;
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
      var content = Cicadas.TextParser.imageParse(this.model.escape('content'));
      var content = Cicadas.TextParser.spaceParse(content);
      debugger;
      this.$el.html(JST['descriptions/show']({description: this.model,
        content: content, author: this.author}));
    };

    this.model.save(attrs, {
      success: riuscire.bind(this),
    });
  },

  adjustTextArea: function (event) {
		event.preventDefault();
		Cicadas.TextParser.adjustTextArea(event);
	},


});
