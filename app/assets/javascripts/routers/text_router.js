Cicadas.Routers.Text = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "welcome",
    "texts/new": "newText",
    "texts/:id": "showText",
    // "texts/:id/edit": "editText",
    "users/:id": "showUser",
    "search": "search"
  },


  welcome: function () {
    // this.$rootEl.html("ubi amor ibi oculus est")
    this._textsIndex = new Cicadas.Views.TextsIndex();
    this._swapViews(this._textsIndex);

  },

  showUser: function (id) {
    var users = new Cicadas.Collections.Users();
    var user = users.getOrFetch(id);
    this._showUser = new Cicadas.Views.UserShow({model: user});
    this._swapViews(this._showUser);
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


  showText: function (id) {
    var texts = new Cicadas.Collections.Texts();
    var text = texts.getOrFetch(id);
    this._showText = new Cicadas.Views.TextShow({model: text});
    this._swapViews(this._showText);
  },

  search: function () {
    this._Search = new Cicadas.Views.Search();
    this._swapViews(this._Search);

  },


  _swapViews: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
