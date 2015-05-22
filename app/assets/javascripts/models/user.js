Cicadas.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  toJSON: function(){
    var json = {user: _.clone(this.attributes)};

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  },


  parse: function (response) {

    if (response.uploaded_texts) {
      this.uploadedTexts().set(response.uploaded_texts, { parse: true });
      delete response.uploaded_texts;
    }
    return response;
  },

  uploadedTexts: function () {
    if (!this._uploadedTexts) {
      this._uploadedTexts= new Cicadas.Collections.Texts();
    }

    return this._uploadedTexts;
  },


});
