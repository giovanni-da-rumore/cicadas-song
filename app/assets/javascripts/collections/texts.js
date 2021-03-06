Cicadas.Collections.Texts = Backbone.Collection.extend({

  url: "/api/texts",

  model: Cicadas.Models.Text,

  comparator: function(text) {
    return -text.get('created_at');
  },


  getOrFetch: function(id) {
    var text = this.get(id)
    if (!text) {
      text = new Cicadas.Models.Text({id: id})
      text.fetch({
        succcess: function () {
          this.add(text);
        }.bind(this)
      });
    } else {
      text.fetch();
    }
    return text;
  },


})
