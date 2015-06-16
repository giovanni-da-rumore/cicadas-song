Cicadas.Views.AuthorIndex = Backbone.CompositeView.extend({

  template: JST['authors/index'],



  initialize: function () {
    this
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.each(function (author) {
      view = new Cicadas.Views.AuthorListItem({model: author});
      this.$el.find('.authors').append(view.render().$el);
    }.bind(this));
    return this;
  },





});
