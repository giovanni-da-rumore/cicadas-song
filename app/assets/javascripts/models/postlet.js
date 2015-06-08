Cicadas.Models.Postlet = Backbone.Model.extend({

  urlRoot: '/api/postlets',

  parse: function (response) {

    if (response.text) {
      this.text().set(response.text, { parse: true });
      delete response.text;
    }
    return response;
  },

  text: function () {
    if (!this._text) {
      this._text = new Cicadas.Collections.Texts();
    }

    return this._texts;
  },


});
