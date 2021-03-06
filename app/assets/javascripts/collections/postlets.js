Cicadas.Collections.Postlets = Backbone.Collection.extend({

  url: "/api/postlets",

  model: Cicadas.Models.Postlet,

  // comparator: function (collection){
  //   return(collection.get('post_order'));
  // },

  comparator: "post_order",


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
