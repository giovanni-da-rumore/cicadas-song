Cicadas.Views.AuthorListItem = Backbone.CompositeView.extend({


  template: JST["authors/item"],


  initialize: function () {
    this.listenTo(this.model, "sync",  this.render);
  },

  render: function () {
    this.$el.html(this.template({author: this.model}));
    return this;
  },

});
