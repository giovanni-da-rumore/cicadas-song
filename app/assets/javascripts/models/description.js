Cicadas.Models.Description = Backbone.Model.extend({

  urlRoot: '/api/descriptions',


  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, { parse: true });
      delete response.author;
    }
    return response;
  },

  author: function () {
      if (!this._author) {
        this._author = new Cicadas.Models.User();
      }
      return this._author;
    },


})
