Cicadas.Views.PostletForm = Backbone.CompositeView.extend({

  template: JST['postlets/form'],

  events: {
    "submit form": "submit",
    "click .cancel": "cancel",
    "keyup textarea": "adjustTextArea",
  },

  initialize: function () {
    this.listenToOnce(this.model, 'sync', this.render);
    this.model.fetch();
    this.collection = new Cicadas.Collections.Postlets();
  },

  render: function () {
    if (Cicadas.currentUser.escape('moderator') !== true) {
      Backbone.history.navigate('/', {trigger: true})
      return;
    }
    this.$el.html(this.template({postlet: this.model}));
    this.$el.find("textarea").trigger('keyup');
    return this;
  },


  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').serializeJSON();
    if (this.parseUrl(attrs.postlet.text_url)) {
      attrs["postlet"]["text_id"] = this.parseUrl(attrs.postlet.text_url);
    }

    var riuscire = function () {
      this.collection.add(this.model, {merge: true})
      Backbone.history.navigate("/", {trigger: true});
    };

    this.model.save(attrs, {
      success: riuscire.bind(this),
    });
  },


  adjustTextArea: function (event) {
    event.preventDefault();
    Cicadas.TextParser.adjustTextArea(event);
  },


  parseUrl: function (url) {
    var id = url.match(/\/(\d+)$/);
    if (id) {
      return id[1];
    } else {
      return null;
    }
  },



});
