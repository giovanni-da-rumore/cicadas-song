Cicadas.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/index'],


  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.collection.fetch();
    this.promoted = new Cicadas.Collections.Postlets();
    this.promoted.fetch();
    this.listenTo(this.promoted, "sync", this.listenToAdd)
  },


  listenToAdd: function () {
    this.stopListening(this.promoted, "sync");
    this.listenTo(this.promoted, "add", this.listenToSync);
    this.render();
  },

  listenToSync: function () {
    this.stopListening(this.promoted, "add");
    this.listenTo(this.promoted, "sync", this.listenToadd);
    this.render();
  },



  render: function () {
    this.collection.each(function (text) {
      text = new Cicadas.Views.TextItem({model: text});
    }.bind(this));
    return this;
  },


  getPostlets: function () {
    this.promoted.each(function (text) {

      
    })

  }



});
