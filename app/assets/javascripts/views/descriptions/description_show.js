Cicadas.Views.DescriptionShow = Backbone.CompositeView.extend({

  template: JST['descriptions/show'],

  formatting: JST['formatting/show'],

  events: {

    "click .formatting": "showFormatting",
  },


  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
    this.formatShown = false;
    if (options.author) {
      this.author = options.author;
    } else {
      this.author = this.model.author();
    }
  },


  render: function () {
    // markdown
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      breaks: true,
      sanitize: true,
    });

    var content = marked(this.model.get('content'));
    this.$el.html(this.template({description: this.model, content: content, author: this.author}));
    return this;
  },


  showFormatting: function (event) {
    event.preventDefault();
    if (this.formatShown === false) {
      this.$el.find(".description-container").append(this.formatting());
      this.formatShown = true;
    } else {
      this.$el.find('.formatting-container').remove();
      this.formatShown = false;
    }

  },

});
