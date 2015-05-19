Cicadas.Views.TextItem = Backbone.CompositeView.extend({


  events: {
    "click .show-title": "toText",
  },


  template: JST['texts/item'],

  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.listenTo(this.model, "sync", this.render);
    var that = this;
    this.model.fetch();
    this.textId = this.model.escape('id');
  },

  render: function () {
    var body = Cicadas.TextParser.spaceParse(this.model.escape('body'));
    this.$el.html(this.template({text: this.model, body: body }));
    return this;
  },

  toText: function (event) {
    event.preventDefault();
    Backbone.history.navigate("#/texts/"+this.model.escape('id'), {trigger: true});
  },



});
