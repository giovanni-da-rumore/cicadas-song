Cicadas.Views.AnnotationShow = Backbone.CompositeView.extend({

  template: JST['annotations/show'],


  events: {
    "click .annotation-edit": "editAnnotation",
  },


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },


  render: function () {
    var content = Cicadas.TextParser.imageParse(this.model.escape('content'));
    var content = Cicadas.TextParser.spaceParse(content);
    this.$el.html(this.template({annotation: this.model, content: content}));
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
