Cicadas.Collections.Authors = Backbone.Model.extend({

  url: '/api/authors',

  model: Cicadas.Models.Author,

  getOrFetch: function(id) {
    var author = this.get(id)

    if (!author) {
      author = new Cicadas.Models.Author({id: id})
      author.fetch({
        succcess: function () {
          this.add(author);
        }.bind(this)
      });
    } else {
      author.fetch();
    }
    return author;
  },




})
