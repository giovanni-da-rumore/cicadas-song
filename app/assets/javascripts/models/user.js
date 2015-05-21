Cicadas.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  toJSON: function(){
    var json = {user: _.clone(this.attributes)};

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  }

})
