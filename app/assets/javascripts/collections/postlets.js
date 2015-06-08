Cicadas.Collections.Postlets = Backbone.Collection.extend({

  url: "/api/postlets",

  model: Cicadas.Models.Postlet,


  getOrFetch: function(id) {
    var postlet = this.get(id)
    if (!postlet) {
      postlet = new Cicadas.Models.Postlet({id: id})
      postlet.fetch({
        succcess: function () {
          this.add(postlet);
        }.bind(this)
      });
    } else {
      postlet.fetch();
    }
    return postlet;
  },


})
