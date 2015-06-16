Cicadas.Views.AnnotationShow = Backbone.CompositeView.extend({

  template: JST['annotations/show'],


  events: {
    "click .annotation-edit": "editAnnotation",
  },


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.author = this.model.author();
    // this.author.fetch();
    this.listenTo(this.author, "sync", this.render);

  },


  render: function () {
    debugger;
    this.topPadding = $(window).scrollTop() - 200;
    if (this.topPadding < 200) { this.topPadding = 0};
    if (this.topPadding > $('a.active').position().top) {
			this.topPadding = $('a.active').position().top;
		}
    var content = Cicadas.TextParser.imageParse(this.model.escape('content'));
    var content = Cicadas.TextParser.spaceParse(content);
    this.$el.html(this.template({
      annotation: this.model,
      content: content,
      topPadding: this.topPadding,
      author: this.author
      }));
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





});
