Cicadas.Views.AnnotationShow = Backbone.CompositeView.extend({

  template: JST['annotations/show'],


  events: {
    "click .annotation-edit": "editAnnotation",
    "click .delete": "deleteAnnotation",
  },


  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.author = this.model.author();
    this.listenTo(this.author, "sync", this.render);

  },


  render: function () {
    this.topPadding = $(window).scrollTop() - 200;
    if (this.topPadding < 200) { this.topPadding = 0};
    if (this.topPadding > $('a.active').position().top) {
			this.topPadding = $('a.active').position().top;
		}
    // var content = Cicadas.TextParser.imageParse(this.model.escape('content'));
    // var content = Cicadas.TextParser.spaceParse(content);
    //markdown
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      breaks: true,
      sanitize: true,
    });

    var content = marked(this.model.get('content'));
    
    this.$el.html(this.template({
      annotation: this.model,
      content: content,
      topPadding: this.topPadding,
      author: this.author
      }));

    if (Cicadas.currentUser.get('moderator')) {
      this.$el.find('.annotation-bottom-bar').append('<button class="delete">Delete</button>')
    }
    return this;
  },

  editAnnotation: function (event) {
    event.preventDefault();
    var text = new Cicadas.Models.Text({id: this.model.get('text_id')})
    text.fetch();
    var formView = new Cicadas.Views.AnnotationForm({
      model: this.model,
      text: text
    })
    this.$el.html(formView.$el);
    formView.render();
  },


  deleteAnnotation: function (event) {
    this.model.destroy({
      success: this.render()
    });

  }





});
