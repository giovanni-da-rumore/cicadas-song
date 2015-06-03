Cicadas.Collections.SearchResults = Backbone.Collection.extend({

	initialize: function () {
		this.searchInfo = {};
	},

	parse: function (response) {
		this.searchInfo.totalPages = response.total_pages;
		debugger;
		return response.search_results;
	},

	url: "/api/search",

	model: function (attrs) {
		var type = attrs._type;
		delete attrs._type;
		var newModel;
		newModel = new Cicadas.Models[type](attrs);
		debugger;
		return newModel;
	},

	// populate: function (attrs) {
	// 	var type = attrs._type
	// 	this.add(new Cicadas.Models[type](attrs));
	// }



});
