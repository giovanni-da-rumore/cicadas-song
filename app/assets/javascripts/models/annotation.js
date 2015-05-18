Cicadas.Models.Annotation = Backbone.Model.extend({

	urlRoot: "/api/annotations",


	author: function () {
		var users = new Cicadas.Collections.Users()
		return users.getOrFetch(this.author_id);

	}




})
