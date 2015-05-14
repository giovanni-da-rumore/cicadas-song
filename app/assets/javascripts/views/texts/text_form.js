Cicadas.Views.TextForm = Backbone.View.extend({

  template: JST['texts/text_form'],


  events: {
    "submit": "submitText"
  },

  initialize: function () {
    this.model = new Cicadas.Models.Text();
    this.listenTo(this.model, "sync change", this.render);
  },


  render: function () {
    this.$el.html(this.template({ date: Cicadas.DateParser, text: this.model }));
    return this;
  },

  submitText: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').serializeJSON().text;

  }





})
