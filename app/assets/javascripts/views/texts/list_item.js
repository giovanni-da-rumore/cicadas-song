Cicadas.Views.TextListItem = Backbone.CompositeView.extend({


  template: JST["texts/list_item"],


  initialize: function (options) {
    this.authorPage = options.authorPage;
    this.collection = new Cicadas.Collections.Texts(this.model.id)
    this.model = this.collection.getOrFetch(this.model.id);
    this.listenTo(this.model, "sync",  this.render);
  },

  render: function () {
    this.$el.html(this.template({text: this.model, authorPage: this.authorPage}));
    return this;
  },

});
