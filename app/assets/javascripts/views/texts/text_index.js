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
    console.log("called");
    //var $textList = this.$el.find("text-list-index-list")
    this.collection.each(function (text) {
      text = new Cicadas.Views.TextShow({model: text})
      this.$el.append(text.render().$el);
    }.bind(this));
    return this;
  },





});
