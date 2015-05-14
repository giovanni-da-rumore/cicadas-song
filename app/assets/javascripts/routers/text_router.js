Cicadas.Routers.Text = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "welcome",
    "texts/new": "newText",
    "texts/:id": "showText",
    "texts/:id/edit": "editText",
  },


  welcome: function () {
    this.$rootEl.html("ubi amor ibi oculus est")
    this._textsIndex = new Cicadas.Views.TextsIndex();
    this._swapViews(this._textsIndex);

  },

  showText: function (id) {
    var texts = new Cicadas.Collections.Texts();
    var text = texts.getOrFetch(id);
    this._showText = new Cicadas.Views.TextShow({model: text});
    this._swapViews(this._showText);
  },

  newText: function () {
    var text = new Cicadas.Models.Text();
    var texts = new Cicadas.Collections.Texts();
    this._newText = new Cicadas.Views.TextForm({
      model: text,
      collection: texts
    });
    this._swapViews(this._newText);

  },

  _swapViews: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
