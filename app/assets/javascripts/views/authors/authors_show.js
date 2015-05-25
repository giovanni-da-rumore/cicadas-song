Cicadas.Views.AuthorShow = Backbone.CompositeView.extend({

  template: JST['authors/show'],

	events: {
	},


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },


  render: function () {

    // this.$el.html(this.template({user: this.model}));
    this.$el.html(this.model.escape("name"));
    return this;
  },



});
