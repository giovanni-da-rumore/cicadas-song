Cicadas.Views.DescriptionShow = Backbone.CompositeView.extend({

  template: JST['descriptions/show'],


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },


  render: function () {
    var content = Cicadas.TextParser.spaceParse(this.model.escape('content'))
    this.$el.html(this.template({description: this.model, content: content}));
    return this;
  },

});
