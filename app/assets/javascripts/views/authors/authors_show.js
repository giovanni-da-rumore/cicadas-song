Cicadas.Views.AuthorShow = Backbone.CompositeView.extend({

  template: JST['authors/show'],

	events: {
    "submit .author-form": "updateAuthor",
	},


  initialize: function () {
    this.listenToOnce(this.model, "sync", this.render);
    this.model.fetch();
    this.collection
  },

  render: function () {
    this.$el.html(this.template({author: this.model}));
    this.model.texts().each(function (text) {
      view = new Cicadas.Views.TextListItem({ model: text, authorPage: true });
      this.$el.find('.author-texts').append(view.render().$el);
    }.bind(this));
    return this;
  },

  updateAuthor: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').serializeJSON();

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




});
