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
      that._updatePreview(reader.result);
      that.model._image = reader.result;
      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._image;
      console.log(that.model);
    }
  },

  _updatePreview: function(src){
    this.$el.find(".preview-user-avatar").attr("src", src);
  }

});
