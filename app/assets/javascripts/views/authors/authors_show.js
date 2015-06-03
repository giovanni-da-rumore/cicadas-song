Cicadas.Views.AuthorShow = Backbone.CompositeView.extend({

  template: JST['authors/show'],

	events: {
	},


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },


  render: function () {
    debugger;
    this.$el.html(this.template({author: this.model}));
    return this;
  },



});
