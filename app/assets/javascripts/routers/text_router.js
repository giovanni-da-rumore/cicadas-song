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
    "users/:id": "showUser",
    "search/": "searchResults",
    "authors/:id": "showAuthor",
    "poidekaipothen/postlets/new": "newPostlet",
    "poidekaipothen/postlets/:id": "editPostlet",
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

  showAuthor: function (id) {
    var authors = new Cicadas.Collections.Authors();
    var author = authors.getOrFetch(id);
    this._showAuthor = new Cicadas.Views.AuthorShow({model: author});
    this._swapViews(this._showAuthor);
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
    this._inSearch = true;
    this._swapViews(this._SearchResults);

  },


  newPostlet: function () {
    var postlet = new Cicadas.Models.Postlet();
    this._newPostlet = new Cicadas.Views.PostletForm({
      model: postlet,
    });
    this._swapViews(this._newPostlet);

  },

  editPostlet: function (id) {
    var postlet = new Cicadas.Models.Postlet({id: id});
    postlet.fetch();
    this._editPostlet = new Cicadas.Views.PostletForm({
      model: postlet,
    });
    this._swapViews(this._editPostlet);

  },

  _swapViews: function (view) {
    if (!this._inSearch) {
      this._Search = new Cicadas.Views.SearchBar();
    }
    this.$searchBar.html(this._Search.render().$el);
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
    this._inSearch = false;
  }


});
