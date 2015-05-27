Cicadas.Routers.Text = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$searchBar = options.$searchBar;
    // this.searchVar = new Cicadas.Views.SearchBar({el: #search-bar});
  },

  routes: {
    "": "welcome",
    "texts/new": "newText",
    "texts/:id": "showText",
    // "texts/:id/edit": "editText",
    "users/:id": "showUser",
    "search/": "searchResults"
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

  searchResults: function (params) {
    var query = params.replace(/\+/gm, " ");
    this._SearchResults = new Cicadas.Views.SearchResults({query: query});
    this._Search = new Cicadas.Views.SearchBar({query: query});
    this._swapViews(this._SearchResults);

  },


  _swapViews: function (view) {
    if (!this._Search) {
      this._Search = new Cicadas.Views.SearchBar();
    }
    this.$searchBar.html(this._Search.render().$el);
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
