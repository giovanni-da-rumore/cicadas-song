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
    alert("home works")

  },

  showText: function () {

  },

  newText: function () {
    //debugger;
    this._newText = new Cicadas.Views.TextForm();
    this._swapViews(this._newText);

  },

  _swapViews: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
