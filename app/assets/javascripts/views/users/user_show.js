Cicadas.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

	events: {
		// "click form .input-user-avatar": "fileInputChange"
		"change form .input-user-avatar": "fileInputChange",
	},


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },


  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  },

	fileInputChange: function(event){
		debugger;

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      this._updatePreview(reader.result);
      this.model._avatar = reader.result;
      console.log(this.model);
    }.bind(this)

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._avatar;
    }
  },

  _updatePreview: function(src){
    this.$el.find(".preview-user-avatar").attr("src", src);
  }

});
