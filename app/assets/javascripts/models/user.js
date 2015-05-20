Cicadas.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {user: _.clone(this.attributes)};

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  }

})
