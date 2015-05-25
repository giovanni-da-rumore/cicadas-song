Cicadas.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/index'],


  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.collection.fetch();
    this.listenTo(this.collection, "sync", this.listenToAdd)
  },


  listenToAdd: function () {
    this.stopListening(this.collection, "sync");
    this.listenTo(this.collection, "add", this.listenToSync);
    this.render();
  },

  listenToSync: function () {
    this.stopListening(this.collection, "add");
    this.listenTo(this.collection, "sync", this.listenToadd);
    this.render();
  },



  render: function () {
    this.collection.each(function (text) {
      text = new Cicadas.Views.TextItem({model: text});
      this.$el.append(text.render().$el);
    }.bind(this));
    return this;
  },



});
