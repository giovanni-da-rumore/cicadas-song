Cicadas.Views.TextItem = Backbone.CompositeView.extend({

  template: JST['texts/item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function () {
    var body = Cicadas.TextParser.spaceParse(this.model.escape('body'));
    this.$el.html(this.template({text: this.model, body: body }));
    return this;
  },




});
