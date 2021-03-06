Cicadas.Views.AuthorShow = Backbone.CompositeView.extend({

  template: JST['authors/show'],

  formTemplate: JST["authors/form"],

	events: {
    "submit .author-form": "updateAuthor",
    "click .edit-author": "showForm",
    "click .cancel": "render",
	},


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
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
    this.model._image_url = attrs.author.image_url;

    var riuscire = function () {
      this.model.fetch();
    };

    var fallire = function (model, response) {
      this.$el.find('.errors').empty();
    };

    this.model.save(attrs, {
      success: riuscire.bind(this),
      error: fallire.bind(this)
    });
  },

  showForm: function (event) {
    this.$el.find('ul li:last').remove();
    this.$el.find('.author-show-sidebar').append(this.formTemplate())
  },




});
