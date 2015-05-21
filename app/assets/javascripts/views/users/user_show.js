Cicadas.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

	events: {
		"submit .avatar-form": "updateAvatar",
		"change form #input-user-avatar": "fileInputChange",
	},


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },


  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  },



	updateAvatar: function(event){
		event.preventDefault()
		this.model.save({
			success: function(){
				this.collection.add(that.model);
				this.render();
			}.bind(this)
		})
	},

	fileInputChange: function(event){
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
  },

});
