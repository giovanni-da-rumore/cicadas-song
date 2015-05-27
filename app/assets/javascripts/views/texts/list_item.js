Cicadas.Views.TextListItem = Backbone.CompositeView.extend({


  template: JST["texts/list_item"],


  initialize: function (options) {
    this.author = new Cicadas.Models.Author({id: this.model.escape('author_id')})
    this.author.fetch();
    this.listenTo(this.author, "sync",  this.render);
  },

  render: function () {
    this.$el.html(this.template({text: this.model, author: this.author}));
    return this;
  },

});
