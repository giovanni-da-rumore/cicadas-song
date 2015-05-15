Cicadas.Views.DescriptionShow = Backbone.CompositeView.extend({

  template: JST['descriptions/show'],


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template({description: this.model}));
    return this;
  },

});
