Cicadas.Views.DescriptionForm = Backbone.CompositeView.extend({

  template: JST['descriptions/form'],

  events: {
    "click .description-submit": "submitDescription",
    "click .description-cancel": "cancel",
  },

  initialize: function (options) {
    this.textId = options.textId;
    this.parentText = options.parentText;

    //this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    this.$el.html(this.template({description: this.model}));
    return this;
  },



  cancel: function (event) {
    event.preventDefault();
    var content = Cicadas.TextParser.spaceParse(this.model.escape('content'))
    this.$el.html(JST['descriptions/show']({description: this.model, content: content}));
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
      this.$el.html(JST['descriptions/show']({description: this.model, content: content, author: this.author}));
    };

    this.model.save(attrs, {
      success: riuscire.bind(this),
    });
  },

});
