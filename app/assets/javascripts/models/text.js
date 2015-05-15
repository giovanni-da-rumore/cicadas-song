Cicadas.Models.Text = Backbone.Model.extend({

  urlRoot: '/api/texts',

  parse: function (response) {
    // debugger;
    if (response.author) {
      this.author().set(response.author, { parse: true });
      delete response.author;
    }

    if (response.text_description) {
      this.textDescription().set(response.text_description, {parse: true});
      delete response.text_description;
    }

    return response;
  },

  author: function () {
    if (!this._author) {
      this._author = new Cicadas.Models.Author();
    }
    return this._author;
  },

  textDescription: function () {
    if (!this._description) {
      this._description = new Cicadas.Models.Description();
    }
    return this._description;
  },

});
