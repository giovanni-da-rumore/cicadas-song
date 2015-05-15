Cicadas.Views.TextForm = Backbone.View.extend({

  template: JST['texts/form'],


  events: {
    "submit": "submitText"
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    this.$el.html(this.template({ date: Cicadas.DateParser, text: this.model }));
    return this;
  },

  submitText: function (event) {
    event.preventDefault();
    console.log(Cicadas.currentUser)
    var attrs = this.$el.find('form').serializeJSON();
    attrs["text"]["user_id"] = Cicadas.currentUser.get('id');

    var riuscire = function () {
      this.collection.add(this.model, {merge: true});
      Backbone.history.navigate("", {trigger: true})
    };

    var fallire = function (model, response) {
      this.$el.find('.errors').empty();
      response.responseJSON.forEach(function (error) {
        this.$el.find('.errors').append('<li>'+ error +'</li>')
      }.bind(this));
    }

    var text = new Cicadas.Models.Text(attrs);
    this.model.save(attrs, {
      success: riuscire.bind(this),
      error: fallire.bind(this)
    });
  },

});
