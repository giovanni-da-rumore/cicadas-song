Cicadas.Views.DescriptionShow = Backbone.CompositeView.extend({

  template: JST['descriptions/show'],


  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
    if (options.author) {
      this.author = options.author;
    } else {
      this.author = this.model.author();
    }
  },


  render: function () {
    // var content = Cicadas.TextParser.imageParse(this.model.escape('content'));
    // var content = marked(this.model.escape('content'));
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
    var content = marked(this.model.get('content'));

    // console.log(this.model.escape('content'))
    content = Cicadas.TextParser.spaceParse(content);
    console.log(content)
    this.$el.html(this.template({description: this.model, content: content, author: this.author}));
    return this;
  },

});
