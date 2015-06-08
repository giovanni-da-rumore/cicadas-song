Cicadas.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  aboutTemplate: JST['users/about_form'],

	events: {
		"submit .avatar-form": "updateAvatar",
    "click .about-save": "submitAbout",
		"change form #input-user-avatar": "fileInputChange",
    "click .about-edit": "aboutForm",
    "click .cancel": "cancelare",
	},


  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },


  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  },



	updateAvatar: function (event) {
		event.preventDefault()
		this.model.save({
			success: function(){
				this.collection.add(that.model);
				this.render();
			}.bind(this)
		})
	},

	fileInputChange: function (event) {
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

  _updatePreview: function (src) {
    this.$el.find(".preview-user-avatar").attr("src", src);
  },


  aboutForm: function (event) {
    event.preventDefault();
    this.$el.find(".about").html( this.aboutTemplate({user: this.model}) )
  },


  submitAbout: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('.about-form').serializeJSON();
    this.model.attributes.about = attrs.user.about;
    this.render();
    this.model.save();
  },


  cancelare: function (event) {
    event.preventDefault();
    this.render();
  }



});
