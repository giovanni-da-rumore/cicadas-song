Cicadas.Views.TextForm = Backbone.View.extend({

  template: JST['texts/form'],

  events: {
    "submit": "submitText",
    "keyup .text-textarea": "adjustTextArea",
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.collection = new Cicadas.Collections.Texts();
  },

  render: function () {
    this.$el.html(this.template({ date: Cicadas.DateParser, text: this.model }));
    return this;
  },

  submitText: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').serializeJSON();
    attrs["text"]["user_id"] = Cicadas.currentUser.get('id');

    var riuscire = function () {
      this.collection.add(this.model, {merge: true});
      Backbone.history.navigate("/texts/" + this.model.get('id'), {trigger: true})
    };

    var fallire = function (model, response) {
      this.$el.find('.errors').empty();
      response.responseJSON.forEach(function (error) {
        this.$el.find('.errors').append('<li>'+ error +'</li>')
      }.bind(this));
    }
    this.model.save(attrs, {
      success: riuscire.bind(this),
      error: fallire.bind(this)
    });
  },


  adjustTextArea: function (event) {
    Cicadas.TextParser.adjustTextAreaLarge(event);

  },

});
