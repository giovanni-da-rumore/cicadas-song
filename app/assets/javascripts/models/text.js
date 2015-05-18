Cicadas.Models.Text = Backbone.Model.extend({

  urlRoot: '/api/texts',

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, { parse: true });
      delete response.author;
    }

    if (response.text_description) {
      this.textDescription().set(response.text_description, {parse: true});
      delete response.text_description;
    }

    if (response.annotations) {
      this.annotations().set(response.annotations, {parse: true});
      delete response.annotations;
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

  annotations: function () {
    if (!this._annotations) {
      this._annotations = new Cicadas.Collections.Annotations();
    }

    return this._annotations;
  },

  



});
