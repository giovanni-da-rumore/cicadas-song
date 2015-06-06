Cicadas.Models.Author = Backbone.Model.extend({
  idAttribute: "polyId",

  initialize: function () {
    if (!this.get('polyId')) {
      this.attributes.polyId = this.get("id");
      this.id = this.get('id');
    }


  },

  urlRoot: '/api/authors',


  toJSON: function(){
    var json = {author: _.clone(this.attributes)};

    if (this._image_url) {
      json.author.image_url = this._image_url;
    }

    debugger;

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
