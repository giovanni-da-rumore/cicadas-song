Cicadas.Collections.Users = Backbone.Collection.extend({

  url: "/api/users",

  model: Cicadas.Models.User,


  getOrFetch: function(id) {
    var user = this.get(id)

    if (!user) {
      user = new Cicadas.Models.User({id: id})
      user.fetch({
        succcess: function () {
          this.add(user);
        }.bind(this)
      });
    } else {
      user.fetch();
    }
    return user;
  },


})
