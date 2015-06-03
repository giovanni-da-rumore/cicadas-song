Cicadas.Models.Author = Backbone.Model.extend({

  urlRoot: '/api/authors',


  toJSON: function(){
    var json = {author: _.clone(this.attributes)};

    if (this._picture) {
      json.author.picture = this._picture;
    }

    return json;
  },


  parse: function (response) {

    if (response.texts) {
      this.texts().set(response.texts, { parse: true });
      delete response.texts;
    }
    return response;
  },

  texts: function () {
    if (!this._texts) {
      this._texts= new Cicadas.Collections.Texts();
    }

    return this._texts;
  },





})
