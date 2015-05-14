window.Cicadas = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    this.currentUser = this.getCurrentUser(options.cUserId);
    new Cicadas.Routers.Text({
      $rootEl: $('#main')
    });
    Backbone.history.start()
  },

  getCurrentUser: function(id) {
    user = new Cicadas.Models.User({id: id});
    user.fetch();
    return user
  }





};
