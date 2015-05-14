Cicadas.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/text_index'],


  initialize: function () {

    this.collection = new Cicadas.Collections.Texts();
    this.collection.fetch();
    this.listenTo(this.collection, "sync", this.render);
  },


  render: function () {
    console.log("called");
    this.$el.html('ubi amor ibi oculus est');
    this.collection.each(function (text) {
      text = new Cicadas.Views.TextShow({model: text})
      this.$el.append(text.render().$el);
    }.bind(this));
    return this;
  },





});
