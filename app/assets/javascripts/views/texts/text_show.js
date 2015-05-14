Cicadas.Views.TextShow = Backbone.View.extend({

  template: JST['texts/text_show'],


  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({text: this.model}));
    return this;
  },

});
