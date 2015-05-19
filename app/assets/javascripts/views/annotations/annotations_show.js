Cicadas.Views.AnnotationShow = Backbone.CompositeView.extend({

  template: JST['annotations/show'],


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },


  render: function () {
    var content = Cicadas.TextParser.spaceParse(this.model.escape('content'))
    this.$el.html(this.template({annotation: this.model, content: content}));
    return this;
  },

});
